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
  }
}

const latestStoryPageCount = 20
const displayPublisherCount = 5
const displayPublisherStoriesCount = 3

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
    getInitialPageData(allCategories)
  )
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
  
  // currentCategory is the category currently reflected in the URL/selected by user
  const currentCategory = useMemo(() => {
    const slugFromParams = searchParams.get(categorySearchParamName)
    if (slugFromParams) {
      return user.followingCategories.find(
        (category) => category.slug === slugFromParams
      )
    }
    // Fallback to initialActiveCategory if no slug, so UI doesn't break
    // If initialActiveCategory is also null (no followed categories), currentCategory will be null.
    return initialActiveCategory 
  }, [searchParams, user.followingCategories, initialActiveCategory])

  const currentCategorySlug = currentCategory?.slug // Used for rendering, derived from currentCategory

  const followingPublisherIds = useMemo(
    () => user.followingPublishers.map((publisher) => publisher.id),
    [user.followingPublishers]
  )
  const { mostPickedStory, latestStoriesInfo, publishersAndStories } =
    pageDataInCategories[currentCategorySlug ?? ''] || {
      mostPickedStory: null,
      latestStoriesInfo: { stories: [], totalCount: 0, shouldLoadmore: true },
      publishersAndStories: [],
    }

  // Define a generic fetch function for a single category's data
  const fetchCategoryData = useCallback(
    async (categoryToFetch: Category) => {
      if (!categoryToFetch?.slug || !categoryToFetch?.id) return null

      const categorySlug = categoryToFetch.slug
      const categoryId = categoryToFetch.id

      const categoryLatestStoriesfetchBody = {
        publishers: followingPublisherIds,
        category: categoryId,
        index: 0,
        take: latestStoryPageCount,
      }

      const [
        mostPickedStoryResponse,
        latestStoriesResponse,
        publishersAndStoriesResponse,
      ] = await Promise.all([
        getMostPickedStoriesInCategory(categorySlug),
        getLatestStoriesInCategory(categoryLatestStoriesfetchBody),
        getMostSponsorPublishersAndStories(categorySlug),
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
          .map((publisherAndStory) => ({
            publisher: publisherAndStory.publisher,
            stories: publisherAndStory.stories.slice(
              0,
              displayPublisherStoriesCount
            ),
          })) ?? []

      return {
        slug: categorySlug,
        data: {
          mostPickedStory: loadedMostPickedStory,
          latestStoriesInfo: loadedLatestStoriesInfo,
          publishersAndStories: loadedPublishersAndStories,
        },
      }
    },
    [followingPublisherIds]
  )

  const loadMoreLatestStories = useCallback(async () => {
    if (!currentCategory || !currentCategory.id) return;

    const currentCategoryLatestStoriesfetchBody = {
      publishers: followingPublisherIds,
      category: currentCategory.id,
      index: latestStoriesInfo.stories.length, // Use current length for pagination
      take: latestStoryPageCount,
    };

    const latestStoriesResponse = await getLatestStoriesInCategory(currentCategoryLatestStoriesfetchBody)

    if (!latestStoriesResponse?.stories) return

    const newLatestStoriesInfo: LatestStoriesInfo = {
      stories: latestStoriesInfo.stories.concat(latestStoriesResponse.stories),
      totalCount: latestStoriesResponse.num_stories ?? latestStoriesInfo.totalCount,
      shouldLoadmore: latestStoriesResponse.stories.length >= latestStoryPageCount,
    }
    
    if (currentCategory.slug) {
      setPageDataInCategories((oldPageData) => ({
        ...oldPageData,
        [currentCategory.slug!]: { // currentCategory.slug known to be defined here
          ...(oldPageData[currentCategory.slug!] || {}), // Spread existing data for the category
          latestStoriesInfo: newLatestStoriesInfo,
        },
      }))
    }
  }, [
    currentCategory,
    followingPublisherIds,
    latestStoriesInfo.stories, // Ensure it reacts to changes in story length
    latestStoriesInfo.totalCount, // Ensure it reacts to changes in totalCount
    pageDataInCategories, // To access existing data if needed, though direct set is better
  ])

  // Effect to set initial URL slug if not present
  useEffect(() => {
    if (!searchParams.get(categorySearchParamName) && initialActiveCategory?.slug) {
      replaceSearchParams(categorySearchParamName, initialActiveCategory.slug)
    }
  }, [searchParams, initialActiveCategory])


  // 1. Effect for Initial Active Category Load
  useEffect(() => {
    const loadInitialCategory = async () => {
      if (!initialActiveCategory?.slug) {
        if (user.followingCategories.length === 0) {
          setIsLoading(false)
        }
        setInitialLoadComplete(true)
        return
      }

      const slug = initialActiveCategory.slug
      const existingData = pageDataInCategories[slug]
      if (existingData && !(existingData.mostPickedStory === null &&
                           existingData.latestStoriesInfo.stories.length === 0 &&
                           existingData.latestStoriesInfo.totalCount === 0 &&
                           existingData.latestStoriesInfo.shouldLoadmore === true)) {
        setIsLoading(false)
        setInitialLoadComplete(true)
        return
      }
      
      setIsLoading(true)
      try {
        const result = await fetchCategoryData(initialActiveCategory)
        if (result) {
          setPageDataInCategories((prev) => ({ ...prev, [result.slug]: result.data }))
        }
      } catch (error) {
        console.error(`Error fetching initial category ${initialActiveCategory.slug}:`, error)
      } finally {
        setIsLoading(false)
        setInitialLoadComplete(true)
      }
    }

    if (!initialLoadComplete) {
      loadInitialCategory()
    }
  }, [
    initialActiveCategory, 
    fetchCategoryData, 
    pageDataInCategories, 
    initialLoadComplete, 
    user.followingCategories.length
  ])


  // 2. Effect for Background Prefetching Other Categories
  useEffect(() => {
    const prefetchAllOtherCategories = async () => {
      const categoriesToFetch = user.followingCategories.filter(
        (category) => category.slug !== initialActiveCategory?.slug
      )

      if (categoriesToFetch.length === 0) return

      try {
        const results = await Promise.all(
          categoriesToFetch.map(category => {
            // Avoid re-fetching if data already seems loaded (e.g. by quick user navigation)
            const existingData = pageDataInCategories[category.slug];
            if (existingData && !(existingData.mostPickedStory === null &&
                                 existingData.latestStoriesInfo.stories.length === 0 &&
                                 existingData.latestStoriesInfo.totalCount === 0 &&
                                 existingData.latestStoriesInfo.shouldLoadmore === true)) {
              return Promise.resolve(null); // Already loaded or being loaded, skip prefetch
            }
            return fetchCategoryData(category);
          })
        )
        
        const newPageData = results.reduce((acc, result) => {
          if (result?.slug) {
            acc[result.slug] = result.data
          }
          return acc
        }, {} as PageData)

        if (Object.keys(newPageData).length > 0) {
          setPageDataInCategories((prevData) => ({ ...prevData, ...newPageData }))
        }
      } catch (error) {
        console.error('Error prefetching other categories data:', error)
      }
    }

    if (initialLoadComplete && user.followingCategories.length > 0) {
      prefetchAllOtherCategories()
    }
  }, [
    initialLoadComplete, 
    user.followingCategories, 
    fetchCategoryData, 
    initialActiveCategory,
    pageDataInCategories // Dependency to re-evaluate if specific categories need fetching
  ])


  // 3. Effect for Handling Subsequent currentCategory (URL-driven) Changes
  useEffect(() => {
    const loadCurrentCategoryData = async () => {
      if (!currentCategory?.slug || !initialLoadComplete) {
        // If no current category or initial load isn't done, do nothing.
        // If initial load isn't complete, the initial load effect handles its category.
        // If no current category (e.g. no followed cats), ensure loading is false.
        if (!currentCategory && user.followingCategories.length === 0) {
            setIsLoading(false);
        }
        return;
      }
      
      // If currentCategory is the one that was initially loaded, its data should be there.
      // No need to re-fetch unless specific conditions arise (e.g. stale data, not handled here)
      if (currentCategory.slug === initialActiveCategory?.slug) {
        setIsLoading(false); // Data was handled by initial load effect
        return;
      }

      const categoryData = pageDataInCategories[currentCategory.slug]
      // Check if data is in initial (unfetched) state
      if (categoryData && !(categoryData.mostPickedStory === null &&
                             categoryData.latestStoriesInfo.stories.length === 0 &&
                             categoryData.latestStoriesInfo.totalCount === 0 &&
                             categoryData.latestStoriesInfo.shouldLoadmore === true)) {
        setIsLoading(false) // Data is already loaded (e.g., by background prefetch)
        return
      }

      setIsLoading(true)
      try {
        const result = await fetchCategoryData(currentCategory)
        if (result) {
          setPageDataInCategories((prev) => ({ ...prev, [result.slug]: result.data }))
        }
      } catch (error) {
        console.error(`Error fetching current category ${currentCategory.slug}:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    // Only run this effect if the initial load sequence has completed.
    // The initial load effect handles the very first category.
    if (initialLoadComplete) {
      loadCurrentCategoryData()
    }
  }, [
    currentCategory, 
    fetchCategoryData, 
    pageDataInCategories, 
    initialLoadComplete, 
    initialActiveCategory, // To compare with currentCategory
    user.followingCategories.length // For the no-categories case
  ])

  let contentJsx: JSX.Element

  if (isLoading || !currentCategory) { // currentCategory check for no-followed-categories scenario
    contentJsx = <Loading withCategory={false} />
  } else if (!latestStoriesInfo?.stories.length && !mostPickedStory) { // Check both
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
          key={latestStoriesInfo.stories.length}
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
// No changes to the rendering logic (contentJsx, return statement) from the previous correct version.
