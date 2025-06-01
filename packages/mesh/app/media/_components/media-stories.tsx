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
const MEDIA_STORIES_CACHE_KEY = 'mediaStoriesPageDataCache'

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
  const [pageDataInCategories, setPageDataInCategories] =
    useState<PageData | null>(null)
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
  const currentCategoryData =
    pageDataInCategories && currentCategorySlug
      ? pageDataInCategories[currentCategorySlug]
      : null
  const { mostPickedStory, latestStoriesInfo, publishersAndStories } =
    currentCategoryData || {
      mostPickedStory: null,
      latestStoriesInfo: { stories: [], totalCount: 0, shouldLoadmore: true },
      publishersAndStories: [],
      timestamp: 0, // Ensure timestamp is part of default
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
    const categorySlug = currentCategory.slug! // currentCategory is checked at the beginning

    setPageDataInCategories((oldPageData) => {
      // If oldPageData is null, initialize it with the default structure for all categories.
      const basePageData = oldPageData ?? getInitialPageData(allCategories)

      // Get the specific data for the current category from this base.
      // If categorySlug somehow wasn't in basePageData provide a default structure.
      const categoryDataToUpdate = basePageData[categorySlug] ?? {
        mostPickedStory: null,
        latestStoriesInfo: { stories: [], totalCount: 0, shouldLoadmore: true },
        publishersAndStories: [],
        timestamp: 0,
      }

      const newLatestStoriesInfo: LatestStoriesInfo = {
        stories: categoryDataToUpdate.latestStoriesInfo.stories.concat(
          latestStoriesResponse.stories
        ),
        totalCount:
          latestStoriesResponse.num_stories ??
          categoryDataToUpdate.latestStoriesInfo.totalCount,
        shouldLoadmore:
          latestStoriesResponse.stories.length >= latestStoryPageCount,
      }

      return {
        ...basePageData, // Spread all other categories from the base
        [categorySlug]: {
          // Update the specific category
          ...categoryDataToUpdate, // Preserve its other fields (mostPickedStory, publishersAndStories, timestamp)
          latestStoriesInfo: newLatestStoriesInfo, // Set the new stories info
        },
      }
    })
  }, [
    currentCategory,
    followingPublisherIds,
    latestStoriesInfo?.stories, // Use optional chaining for safety if latestStoriesInfo can be undefined
    latestStoriesInfo?.totalCount,
    allCategories, // Added allCategories to dependency array
  ])

  useEffect(() => {
    if (
      !searchParams.get(categorySearchParamName) &&
      initialActiveCategory?.slug
    ) {
      replaceSearchParams(categorySearchParamName, initialActiveCategory.slug)
    }
  }, [searchParams, initialActiveCategory])

  // Effect 0: Load initial pageDataInCategories from localStorage or defaults
  useEffect(() => {
    let initialData: PageData = getInitialPageData(allCategories) // Start with default structure
    try {
      const cachedItem = localStorage.getItem(MEDIA_STORIES_CACHE_KEY)
      if (cachedItem) {
        const cachedPageData = JSON.parse(cachedItem) as PageData
        if (cachedPageData) {
          console.log(
            '[MediaStories] Successfully loaded PageData from localStorage.'
          )
          const freshDefaultData = getInitialPageData(allCategories)
          const mergedData = { ...freshDefaultData } // Start with defaults for all current categories
          for (const slug in cachedPageData) {
            if (
              Object.prototype.hasOwnProperty.call(cachedPageData, slug) &&
              mergedData[slug]
            ) {
              // If slug is valid in current allCategories
              mergedData[slug] = cachedPageData[slug] // Overwrite with cached value
            }
          }
          initialData = mergedData
        } else {
          console.log(
            '[MediaStories] localStorage item found but parsed to null/undefined. Using default.'
          )
        }
      } else {
        console.log(
          '[MediaStories] No PageData found in localStorage. Using default.'
        )
      }
    } catch (error) {
      console.error(
        '[MediaStories] Error reading PageData from localStorage:',
        error
      )
      // initialData is already getInitialPageData(allCategories) in this case
    }
    setPageDataInCategories(initialData)
  }, [allCategories]) // Dependency on allCategories

  // Effect 1: Initial Active Category Load
  useEffect(() => {
    // Ensure pageDataInCategories is populated before this effect runs critical logic
    if (!pageDataInCategories) {
      console.log(
        '[Effect 1] Waiting for pageDataInCategories to be initialized.'
      )
      return
    }
    const loadInitialCategoryData = async () => {
      if (!initialActiveCategory?.slug) {
        if (followingCategoriesCount === 0) {
          setIsLoading(false)
        }
        setInitialLoadComplete(true)
        return
      }

      const slug = initialActiveCategory.slug
      const existingData = pageDataInCategories[slug] // Get existing data directly
      let shouldFetchInBackground = false

      if (existingData) {
        // If any data object exists for this slug
        console.log(
          '[Effect 1] Initial category data exists in state. Rendering from cache first.',
          existingData
        )
        setIsLoading(false) // <<< IMPORTANT: Allow rendering of this cached data immediately

        // Decide if a background fetch is needed for this existing data
        if (
          !existingData.timestamp ||
          Date.now() - existingData.timestamp > TEN_MINUTES_MS ||
          existingData.latestStoriesInfo.stories.length === 0
        ) {
          // Fetch if no timestamp, or stale, or has no stories (even if not stale, maybe prefetch was empty)
          console.log(
            '[Effect 1] Cached data is stale, empty, or untimestamped. Scheduling background fetch.'
          )
          shouldFetchInBackground = true
        } else {
          // Data exists and is fresh enough, no immediate background fetch needed from Effect 1
          console.log(
            '[Effect 1] Cached data is fresh. No immediate background fetch.'
          )
        }
        setInitialLoadComplete(true) // Mark initial load as "complete" as we've decided what to do.
        // The background fetch will happen without blocking this.
      } else {
        // No data whatsoever for this slug
        console.log(
          '[Effect 1] No data found for initial category. Fetching with loading screen.'
        )
        setIsLoading(true) // Show loading screen as there's nothing to display
        shouldFetchInBackground = true // We must fetch
      }

      if (shouldFetchInBackground) {
        console.log('[Effect 1] Initiating fetch for initial category:', slug)
        try {
          const result = await fetchCategoryData(initialActiveCategory)
          if (result) {
            setPageDataInCategories((prev) => ({ ...prev, [slug]: result }))
            console.log(
              '[Effect 1] Background fetch complete, data updated for',
              slug
            )
          }
        } catch (error) {
          console.error(
            `[Effect 1] Error fetching initial category ${slug} in background:`,
            error
          )
        } finally {
          if (!existingData) {
            // If there was no initial data, we were in a loading state
            setIsLoading(false)
          }
          // If there was existing data, isLoading was already false. The update will just re-render.
          setInitialLoadComplete(true) // Ensure this is set after the fetch attempt too
        }
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
    if (!initialLoadComplete || !pageDataInCategories) {
      // Primary guard
      return
    }

    const prefetchAllOtherCategoriesData = async () => {
      const categoriesToPrefetch = user.followingCategories.filter(
        (category) => {
          if (!category.slug || category.slug === initialActiveCategory?.slug) {
            return false
          }
          // pageDataInCategories is guaranteed to be non-null here
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
            // console.log(`Prefetching stale data for background category: ${category.slug}`); // Optional: for debugging
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
          console.error(`Failed to prefetch a category:`, result.reason)
        }
      })

      if (Object.keys(successfullyFetchedData).length > 0) {
        setPageDataInCategories((prevData) => ({
          ...prevData,
          ...successfullyFetchedData,
        }))
      }
    }

    // The original condition for running prefetch:
    if (user.followingCategories.length > 0) {
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
          pageDataInCategories && // <<< Ensure pageDataInCategories is not null
          isCategoryDataLoaded(pageDataInCategories[categorySlug]) &&
          isLoading
        ) {
          setIsLoading(false)
        }
        return
      }

      // Cache-First Logic for Navigated Category
      // Ensure pageDataInCategories is not null before accessing it.
      // This should be guaranteed by the initialLoadComplete check, which depends on Effect 1,
      // which in turn waits for pageDataInCategories from Effect 0.
      // However, being extremely defensive for direct access patterns:
      if (!pageDataInCategories) {
        console.error(
          '[Effect 3] pageDataInCategories is unexpectedly null after initialActiveCategory check.'
        )
        // Potentially set an error state or isLoading true and return
        setIsLoading(true) // Fallback to loading state
        return
      }
      const existingData = pageDataInCategories[categorySlug]
      let shouldFetchInBackground = false

      // Keeping the detailed log for existingData as per previous subtask
      console.log(
        '[Effect 3] Existing categoryData - stories.length:',
        existingData?.latestStoriesInfo?.stories?.length,
        'timestamp:',
        existingData?.timestamp,
        'shouldLoadmore:',
        existingData?.latestStoriesInfo?.shouldLoadmore,
        'totalCount:',
        existingData?.latestStoriesInfo?.totalCount,
        'mostPickedStory:',
        existingData?.mostPickedStory !== null
      )

      if (existingData) {
        console.log(
          '[Effect 3] Category data exists in state for navigated category. Rendering from cache first.',
          categorySlug
        )
        setIsLoading(false) // Show cached data immediately

        // Decide if a background fetch is needed
        if (
          !existingData.timestamp ||
          Date.now() - existingData.timestamp > TEN_MINUTES_MS ||
          existingData.latestStoriesInfo.stories.length === 0
        ) {
          console.log(
            '[Effect 3] Cached data for navigated category is stale, empty, or untimestamped. Scheduling background fetch.',
            categorySlug
          )
          shouldFetchInBackground = true
        } else {
          console.log(
            '[Effect 3] Cached data for navigated category is fresh. No background fetch.',
            categorySlug
          )
        }
      } else {
        // No data for this navigated category
        console.log(
          '[Effect 3] No data found for navigated category. Fetching with loading screen.',
          categorySlug
        )
        setIsLoading(true) // Show loading screen
        shouldFetchInBackground = true // Must fetch
      }

      if (shouldFetchInBackground) {
        console.log(
          '[Effect 3] Initiating fetch for navigated category:',
          categorySlug
        )

        // Revised isLoading management for fetch block:
        if (!existingData) {
          // This condition ensures setIsLoading(true) was called if no cache.
          // If existingData was present, setIsLoading(false) was called, so this fetch is background.
        } else {
          // If existingData was present and we are fetching in background,
          // ensure isLoading is false.
          if (isLoading) setIsLoading(false)
        }

        try {
          const result = await fetchCategoryData(currentCategory)
          if (result) {
            setPageDataInCategories((prev) => ({
              ...prev,
              [categorySlug]: result,
            }))
            console.log(
              '[Effect 3] Background fetch complete, data updated for navigated category:',
              categorySlug
            )
          }
        } catch (error) {
          console.error(
            `[Effect 3] Error fetching navigated category ${categorySlug}:`,
            error
          )
        } finally {
          // Only set isLoading to false if we actually set it to true for this fetch (i.e., !existingData).
          if (!existingData) {
            console.log(
              `[Effect 3] Fetch attempt finished for ${categorySlug} (was loading). Setting isLoading to false.`
            )
            setIsLoading(false)
          } else {
            console.log(
              `[Effect 3] Background fetch attempt finished for ${categorySlug} (was not loading). isLoading remains false.`
            )
          }
        }
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
        // console.log(`Refreshing data for active category: ${categorySlug}`); // Optional: for debugging
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
          console.error(`Error refreshing category ${categorySlug}:`, error)
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

  // Effect 5: Save pageDataInCategories to localStorage whenever it changes
  useEffect(() => {
    if (pageDataInCategories !== null) {
      try {
        console.log('[MediaStories] Saving updated PageData to localStorage.')
        localStorage.setItem(
          MEDIA_STORIES_CACHE_KEY,
          JSON.stringify(pageDataInCategories)
        )
      } catch (error) {
        console.error(
          '[MediaStories] Error saving PageData to localStorage:',
          error
        )
      }
    }
  }, [pageDataInCategories])

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
