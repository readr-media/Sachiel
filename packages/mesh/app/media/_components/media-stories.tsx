'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useMemo } from 'react'

import getLatestStoriesInCategory, {
  type Story,
} from '@/app/actions/get-latest-stories-in-category'
import getMostPickedStoriesInCategory from '@/app/actions/get-most-picked-stories-in-category'
import getMostSponsorPublishersAndStories from '@/app/actions/get-most-sponsor-publishers-and-stories'
import { type AllPublisherData } from '@/app/actions/publisher'
import { categorySearchParamName } from '@/constants/search-param-names'
import { useUser } from '@/context/user'
import type { MostSponsorPublisher } from '@/utils/data-schema'
import { replaceSearchParams } from '@/utils/search-params'

import type { Category } from '../page'
import CategorySelector from './category-selector'
import DesktopStories from './desktop-stories'
import Loading from './loading'
import NoStories from './no-stories'
import NonDesktopStories from './non-desktop-stories'

export { type Story } from '@/app/actions/get-latest-stories-in-category'

export type LatestStoriesInfo = {
  stories: Story[]
  totalCount: number
  shouldLoadmore: boolean
}
type PageData = {
  [key: string]: {
    mostPickedStory: Story | null
    latestStoriesInfo: LatestStoriesInfo
    publishersAndStories: MostSponsorPublisher[]
    timestamp: number // New field
  }
}

const latestStoryPageCount = 20
const displayPublisherCount = 5
const displayPublisherStoriesCount = 3

const TEN_MINUTES_MS = 10 * 60 * 1000
const REFRESH_CHECK_INTERVAL_MS = 1 * 60 * 1000

const getInitialPageData = (allCategories: Category[]) => {
  return allCategories.reduce((acc, curr) => {
    const categorySlug = curr.slug
    if (categorySlug) {
      acc[categorySlug] = {
        mostPickedStory: null,
        latestStoriesInfo: {
          stories: [],
          totalCount: 0,
          shouldLoadmore: true,
        },
        publishersAndStories: [],
        timestamp: 0, // Initialize timestamp
      }
    }
    return acc
  }, {} as PageData)
}

export default function MediaStories({
  allCategories,
  publisherList,
}: {
  allCategories: Category[]
  publisherList: AllPublisherData
}) {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [pageDataInCategories, setPageDataInCategories] = useState<PageData>(
    getInitialPageData(allCategories) // Use allCategories for initial map structure
  )
  const followingCategoriesCount = user.followingCategories.length

  const isCategoryDataLoaded = (
    data: PageData[string] | undefined
  ): boolean => {
    if (!data) return false
    return !(
      data.mostPickedStory === null &&
      data.latestStoriesInfo.stories.length === 0 &&
      data.latestStoriesInfo.totalCount === 0 &&
      data.latestStoriesInfo.shouldLoadmore === true
    )
  }

  const searchParams = useSearchParams()

  const initialActiveCategory = useMemo(() => {
    const slugFromParams = searchParams.get(categorySearchParamName)
    if (slugFromParams) {
      const categoryFromSlug = user.followingCategories.find(
        (category) => category.slug === slugFromParams
      )
      if (categoryFromSlug) return categoryFromSlug
    }
    return user.followingCategories[0] || null
  }, [searchParams, user.followingCategories])

  const currentCategory = useMemo(() => {
    const slugFromParams = searchParams.get(categorySearchParamName)
    if (slugFromParams) {
      return user.followingCategories.find(
        (category) => category.slug === slugFromParams
      )
    }
    return initialActiveCategory
  }, [searchParams, user.followingCategories, initialActiveCategory])

  const currentCategorySlug = currentCategory?.slug

  const followingPublisherIds = useMemo(
    () => user.followingPublishers.map((publisher) => publisher.id),
    [user.followingPublishers]
  )

  // Data for rendering is derived from currentCategorySlug and pageDataInCategories
  const { mostPickedStory, latestStoriesInfo, publishersAndStories } =
    pageDataInCategories[currentCategorySlug ?? ''] || {
      mostPickedStory: null,
      latestStoriesInfo: { stories: [], totalCount: 0, shouldLoadmore: true },
      publishersAndStories: [],
    }

  const fetchCategoryData = useCallback(
    async (categoryToFetch: Category) => {
      if (!categoryToFetch?.slug || !categoryToFetch?.id) return null

      const categorySlugVal = categoryToFetch.slug // Ensure it's a value not a function call
      const categoryIdVal = categoryToFetch.id

      const categoryLatestStoriesfetchBody = {
        publishers: followingPublisherIds,
        category: categoryIdVal,
        index: 0,
        take: latestStoryPageCount,
      }

      const [
        mostPickedStoryResponse,
        latestStoriesResponse,
        publishersAndStoriesResponse,
      ] = await Promise.all([
        getMostPickedStoriesInCategory(categorySlugVal),
        getLatestStoriesInCategory(categoryLatestStoriesfetchBody),
        getMostSponsorPublishersAndStories(categorySlugVal),
      ])

      const loadedMostPickedStory = mostPickedStoryResponse?.[0] ?? null
      const loadedLatestStoriesInfo: LatestStoriesInfo = {
        stories: latestStoriesResponse?.stories ?? [],
        totalCount: latestStoriesResponse?.num_stories ?? 0,
        shouldLoadmore:
          (latestStoriesResponse?.stories?.length ?? 0) >= latestStoryPageCount,
      }
      const loadedPublishersAndStories =
        publishersAndStoriesResponse
          ?.slice(0, displayPublisherCount)
          .map((ps) => ({
            publisher: ps.publisher,
            stories: (ps.stories ?? []).slice(0, displayPublisherStoriesCount),
          })) ?? []

      return {
        mostPickedStory: loadedMostPickedStory,
        latestStoriesInfo: loadedLatestStoriesInfo,
        publishersAndStories: loadedPublishersAndStories,
        timestamp: Date.now(), // Add current timestamp here
      }
    },
    [followingPublisherIds]
  )

  const loadMoreLatestStories = useCallback(async () => {
    if (!currentCategory || !currentCategory.id || !currentCategory.slug) return

    const currentCategoryLatestStoriesfetchBody = {
      publishers: followingPublisherIds,
      category: currentCategory.id,
      index: latestStoriesInfo.stories.length,
      take: latestStoryPageCount,
    }

    const latestStoriesResponse = await getLatestStoriesInCategory(
      currentCategoryLatestStoriesfetchBody
    )

    if (!latestStoriesResponse?.stories) return

    const newLatestStoriesInfo: LatestStoriesInfo = {
      stories: latestStoriesInfo.stories.concat(latestStoriesResponse.stories),
      totalCount:
        latestStoriesResponse.num_stories ?? latestStoriesInfo.totalCount,
      shouldLoadmore:
        latestStoriesResponse.stories.length >= latestStoryPageCount,
    }

    setPageDataInCategories((oldPageData) => ({
      ...oldPageData,
      [currentCategory.slug!]: {
        ...(oldPageData[currentCategory.slug!] || {
          // Ensure existing data for other fields is not lost
          mostPickedStory: null, // Provide default if not present
          publishersAndStories: [], // Provide default if not present
        }),
        latestStoriesInfo: newLatestStoriesInfo,
      },
    }))
  }, [
    currentCategory,
    followingPublisherIds,
    latestStoriesInfo?.stories, // Use optional chaining for safety if latestStoriesInfo can be undefined
    latestStoriesInfo?.totalCount,
  ])

  useEffect(() => {
    if (
      !searchParams.get(categorySearchParamName) &&
      initialActiveCategory?.slug
    ) {
      replaceSearchParams(categorySearchParamName, initialActiveCategory.slug)
    }
  }, [searchParams, initialActiveCategory])

  // Effect 1: Initial Active Category Load
  useEffect(() => {
    const loadInitialCategoryData = async () => {
      if (!initialActiveCategory?.slug) {
        if (followingCategoriesCount === 0) {
          setIsLoading(false)
        }
        setInitialLoadComplete(true)
        return
      }

      const slug = initialActiveCategory.slug
      if (isCategoryDataLoaded(pageDataInCategories[slug])) {
        setIsLoading(false)
        setInitialLoadComplete(true)
        return
      }

      setIsLoading(true)
      try {
        const result = await fetchCategoryData(initialActiveCategory)
        if (result) {
          setPageDataInCategories((prev) => ({ ...prev, [slug]: result }))
        }
      } catch (error) {
        console.error("Error fetching initial category ${slug}:", error)
      } finally {
        setIsLoading(false)
        setInitialLoadComplete(true)
      }
    }

    if (!initialLoadComplete) {
      loadInitialCategoryData()
    }
  }, [
    initialActiveCategory,
    fetchCategoryData,
    pageDataInCategories,
    initialLoadComplete,
    followingCategoriesCount,
    isCategoryDataLoaded,
  ])

  // Effect 2: Background Prefetching Other Categories
  useEffect(() => {
    const prefetchAllOtherCategoriesData = async () => {
      const categoriesToPrefetch = user.followingCategories.filter(
        (category) => {
          if (!category.slug || category.slug === initialActiveCategory?.slug) {
            return false
          }
          const categoryData = pageDataInCategories[category.slug]
          const isDataCurrentlyLoaded = isCategoryDataLoaded(categoryData)
          // Prefetch if not loaded OR if loaded but stale
          if (!isDataCurrentlyLoaded) {
            return true // Needs prefetching because it's not loaded
          }
          // If loaded, check for staleness
          if (
            categoryData.timestamp &&
            Date.now() - categoryData.timestamp > TEN_MINUTES_MS
          ) {
            return true // Needs prefetching because it's stale
          }
          return false // Already loaded and not stale
        }
      )

      if (categoriesToPrefetch.length === 0) return

      const prefetchPromises = categoriesToPrefetch.map((category) =>
        fetchCategoryData(category).then((data) => ({
          slug: category.slug,
          data,
        }))
      )

      const results = await Promise.allSettled(prefetchPromises)

      const successfullyFetchedData: PageData = {}
      results.forEach((result) => {
        if (
          result.status === 'fulfilled' &&
          result.value?.data &&
          result.value.slug
        ) {
          successfullyFetchedData[result.value.slug] = result.value.data
        } else if (result.status === 'rejected') {
          console.error("Failed to prefetch a category:", result.reason)
        }
      })

      if (Object.keys(successfullyFetchedData).length > 0) {
        setPageDataInCategories((prevData) => ({
          ...prevData,
          ...successfullyFetchedData,
        }))
      }
    }

    if (initialLoadComplete && user.followingCategories.length > 0) {
      prefetchAllOtherCategoriesData()
    }
  }, [
    initialLoadComplete,
    user.followingCategories,
    fetchCategoryData,
    initialActiveCategory,
    pageDataInCategories,
    isCategoryDataLoaded,
  ])

  // Effect 3: User Navigation (Load Current Category Data if not loaded by Effect 1 or 2)
  useEffect(() => {
    console.log(
      '[Effect 3 Hook Start] initialLoadComplete:',
      initialLoadComplete,
      'currentCategory:',
      currentCategory?.slug,
      'initialActiveCategory:',
      initialActiveCategory?.slug
    )
    const loadCurrentCategoryDataIfNeeded = async () => {
      if (!currentCategory?.slug || !initialLoadComplete) {
        console.log(
          '[Effect 3] loadCurrentCategoryDataIfNeeded: Early exit because !currentCategory?.slug or !initialLoadComplete. currentCategory?.slug:',
          currentCategory?.slug,
          'initialLoadComplete:',
          initialLoadComplete
        )
        if (!currentCategory && followingCategoriesCount === 0 && !isLoading) {
          // Prevent multiple setIsLoading(false)
          setIsLoading(false)
        }
        return
      }

      const categorySlug = currentCategory.slug
      console.log(`[Effect 3] Processing category: ${categorySlug}`)

      // If it's the initial category, Effect 1 handles it.
      // isLoading will be set by Effect 1.
      if (categorySlug === initialActiveCategory?.slug) {
        console.log(
          '[Effect 3] loadCurrentCategoryDataIfNeeded: Early exit because categorySlug === initialActiveCategory?.slug. categorySlug:',
          categorySlug
        )
        if (
          isCategoryDataLoaded(pageDataInCategories[categorySlug]) &&
          isLoading
        ) {
          setIsLoading(false)
        }
        return
      }

      // If data is already loaded (e.g., by Effect 2 or previous navigation)
      const categoryData = pageDataInCategories[categorySlug]
      console.log(
        '[Effect 3] Existing categoryData - stories.length:',
        categoryData?.latestStoriesInfo?.stories?.length,
        'timestamp:',
        categoryData?.timestamp,
        'shouldLoadmore:',
        categoryData?.latestStoriesInfo?.shouldLoadmore,
        'totalCount:',
        categoryData?.latestStoriesInfo?.totalCount,
        'mostPickedStory:',
        categoryData?.mostPickedStory !== null
      )
      const isLoaded = isCategoryDataLoaded(categoryData)
      console.log('[Effect 3] isCategoryDataLoaded result:', isLoaded)
      if (isLoaded) {
        // Check if the data is stale
        const isStale =
          categoryData.timestamp &&
          Date.now() - categoryData.timestamp > TEN_MINUTES_MS
        console.log('[Effect 3] Is data stale?', isStale)
        if (isStale) {
          console.log(
            '[Effect 3] Decision: Data is loaded but stale. Proceeding to fetch.'
          )
          // Data is stale, proceed to fetch
          // The existing logic below this 'if' block (setIsLoading(true), fetchCategoryData) will handle the fetch.
          // So, we effectively "fall through" to the fetching logic if data is stale.
        } else {
          console.log(
            '[Effect 3] Decision: Data is loaded and not stale. Using cached data.'
          )
          // Data is not stale, use cached data
          if (isLoading) setIsLoading(false)
          return // Return only if data is loaded AND not stale
        }
      } else {
        console.log(
          '[Effect 3] Decision: Data is not loaded. Proceeding to fetch.'
        )
      }
      // If we reach here, it means:
      // 1. Data was not loaded OR
      // 2. Data was loaded but found to be stale.
      // So, proceed to fetch:
      console.log(
        '[Effect 3] Action: Calling setIsLoading(true) and preparing to fetch.'
      )
      setIsLoading(true)
      try {
        const result = await fetchCategoryData(currentCategory)
        if (result) {
          setPageDataInCategories((prev) => ({
            ...prev,
            [categorySlug]: result,
          }))
        }
      } catch (error) {
        console.error(
          `[Effect 3] Error fetching navigated category ${categorySlug}:`,
          error
        )
      } finally {
        console.log(
          `[Effect 3] Fetch attempt finished for ${categorySlug}. Setting isLoading to false.`
        )
        setIsLoading(false)
      }
    }

    if (initialLoadComplete) {
      // Only run this logic after initial load attempt
      loadCurrentCategoryDataIfNeeded()
    }
  }, [
    currentCategory,
    initialLoadComplete,
    initialActiveCategory,
    fetchCategoryData,
    pageDataInCategories,
    followingCategoriesCount,
    isCategoryDataLoaded,
    isLoading, // Added isLoading to dependencies as it's checked
  ])

  // This separate effect handles the case where there are no followed categories from the start.
  useEffect(() => {
    if (user.followingCategories.length === 0 && initialLoadComplete) {
      setIsLoading(false)
    }
  }, [user.followingCategories.length, initialLoadComplete])

  // Effect 4: Periodic Refresh of Active Category Data
  useEffect(() => {
    if (!initialLoadComplete || !currentCategory?.slug) {
      return
    }

    const intervalId = setInterval(async () => {
      const categorySlug = currentCategory.slug
      if (!categorySlug) return

      const currentCategoryData = pageDataInCategories[categorySlug]

      if (
        currentCategoryData &&
        Date.now() - currentCategoryData.timestamp > TEN_MINUTES_MS
      ) {
        try {
          // Consider setting a loading state if there's a global or per-category loading indicator
          const result = await fetchCategoryData(currentCategory)
          if (result) {
            setPageDataInCategories((prev) => ({
              ...prev,
              [categorySlug]: result, // result already includes the new timestamp
            }))
          }
        } catch (error) {
          console.error("Error refreshing category ${categorySlug}:", error)
        } finally {
          // Consider unsetting loading state
        }
      }
    }, REFRESH_CHECK_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [
    currentCategory,
    fetchCategoryData,
    pageDataInCategories,
    initialLoadComplete,
  ])

  let contentJsx: JSX.Element

  if (isLoading || !currentCategory) {
    contentJsx = <Loading withCategory={false} />
  } else if (!latestStoriesInfo?.stories.length && !mostPickedStory) {
    contentJsx = <NoStories />
  } else {
    contentJsx = (
      <>
        <DesktopStories
          latestStoriesInfo={latestStoriesInfo}
          mostPickedStory={mostPickedStory}
          publishersAndStories={publishersAndStories}
          publisherList={publisherList}
          loadMoreLatestStories={loadMoreLatestStories}
          slug={currentCategorySlug ?? ''}
        />
        <NonDesktopStories
          key={latestStoriesInfo?.stories.length}
          latestStoriesInfo={latestStoriesInfo}
          mostPickedStory={mostPickedStory}
          publishersAndStories={publishersAndStories}
          publisherList={publisherList}
          loadMoreLatestStories={loadMoreLatestStories}
        />
      </>
    )
  }

  return (
    <main className="flex grow flex-col">
      <CategorySelector
        allCategories={allCategories}
        currentCategory={currentCategory}
      />
      {contentJsx}
    </main>
  )
}
