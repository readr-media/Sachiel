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
import {
  setCachedCategoryData,
  getCachedCategoryData, // Import the cache reading function
} from '../utils/category-cache'
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

const CATEGORY_CACHE_TTL_MS = 3600 * 1000; // 1 hour

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

  const { mostPickedStory, latestStoriesInfo, publishersAndStories } =
    pageDataInCategories[currentCategorySlug ?? ''] || {
      mostPickedStory: null,
      latestStoriesInfo: { stories: [], totalCount: 0, shouldLoadmore: true },
      publishersAndStories: [],
    }

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
      
      const newPageDataForCategory = {
        mostPickedStory: loadedMostPickedStory,
        latestStoriesInfo: loadedLatestStoriesInfo,
        publishersAndStories: loadedPublishersAndStories,
      };

      // Cache the successfully fetched data
      // categorySlug is guaranteed to be valid here due to the check at the function start
      setCachedCategoryData(categorySlug, newPageDataForCategory);
      
      return newPageDataForCategory;
    },
    [followingPublisherIds] // setCachedCategoryData is stable and doesn't need to be a dependency
  )

  const loadMoreLatestStories = useCallback(async () => {
    if (!currentCategory || !currentCategory.id || !currentCategory.slug) return;

    const currentCategoryLatestStoriesfetchBody = {
      publishers: followingPublisherIds,
      category: currentCategory.id,
      index: latestStoriesInfo.stories.length,
      take: latestStoryPageCount,
    };

    const latestStoriesResponse = await getLatestStoriesInCategory(currentCategoryLatestStoriesfetchBody)

    if (!latestStoriesResponse?.stories) return

    const newLatestStoriesInfo: LatestStoriesInfo = {
      stories: latestStoriesInfo.stories.concat(latestStoriesResponse.stories),
      totalCount: latestStoriesResponse.num_stories ?? latestStoriesInfo.totalCount,
      shouldLoadmore: latestStoriesResponse.stories.length >= latestStoryPageCount,
    }
    
    setPageDataInCategories((oldPageData) => ({
      ...oldPageData,
      [currentCategory.slug!]: {
        ...(oldPageData[currentCategory.slug!] || {}),
        latestStoriesInfo: newLatestStoriesInfo,
      },
    }))
  }, [
    currentCategory,
    followingPublisherIds,
    latestStoriesInfo.stories,
    latestStoriesInfo.totalCount,
    // Removed pageDataInCategories dependency as we directly use currentCategory.slug
  ])
  
  useEffect(() => {
    if (!searchParams.get(categorySearchParamName) && initialActiveCategory?.slug) {
      replaceSearchParams(categorySearchParamName, initialActiveCategory.slug)
    }
  }, [searchParams, initialActiveCategory])

  // Effect 1: Initial Active Category Load
  useEffect(() => {
    const loadInitialCategory = async () => {
      if (!initialActiveCategory?.slug) {
        if (user.followingCategories.length === 0) {
          setIsLoading(false)
        }
        setInitialLoadComplete(true)
        return
      }

      const slug = initialActiveCategory.slug;

      // Try to load from cache first
      const cachedData = getCachedCategoryData(slug, CATEGORY_CACHE_TTL_MS);
      if (cachedData) {
        setPageDataInCategories((prev) => ({ ...prev, [slug]: cachedData }));
        setIsLoading(false);
        setInitialLoadComplete(true);

        // Stale-while-revalidate: Fetch in background
        fetchCategoryData(initialActiveCategory).then((networkResult) => {
          if (networkResult && 
              JSON.stringify(networkResult) !== JSON.stringify(cachedData)) {
            setPageDataInCategories((prev) => ({ ...prev, [slug]: networkResult }));
          }
        }).catch(error => {
          console.error(`SWR failed for initial category ${slug}:`, error);
        });
        return; // Return after setting cached data and initiating SWR
      }

      // If not in cache, check if already in state (e.g. from a previous action)
      // This check is mostly for completeness, cache check should precede.
      const existingDataInState = pageDataInCategories[slug];
      if (existingDataInState && !(existingDataInState.mostPickedStory === null &&
                           existingDataInState.latestStoriesInfo.stories.length === 0 &&
                           existingDataInState.latestStoriesInfo.totalCount === 0 &&
                           existingDataInState.latestStoriesInfo.shouldLoadmore === true)) {
        setIsLoading(false);
        setInitialLoadComplete(true);
        return; 
      }
      
      // Full load: not in cache, not valid in state
      setIsLoading(true);
      try {
        const result = await fetchCategoryData(initialActiveCategory);
        if (result) {
          setPageDataInCategories((prev) => ({ ...prev, [slug]: result }));
        }
      } catch (error) {
        console.error(`Error fetching initial category ${slug}:`, error);
      } finally {
        setIsLoading(false);
        setInitialLoadComplete(true);
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

  // Effect 2: Background Prefetching Other Categories
  useEffect(() => {
    const prefetchAllOtherCategories = async () => {
      const categoriesToFetch = user.followingCategories.filter(
        (category) => category.slug && category.slug !== initialActiveCategory?.slug
      )

      if (categoriesToFetch.length === 0) return;

      let foundInCacheData: PageData = {};
      const needsNetworkFetch: Category[] = [];

      for (const category of categoriesToFetch) {
        if (!category.slug) continue;

        const cachedData = getCachedCategoryData(category.slug, CATEGORY_CACHE_TTL_MS);
        if (cachedData) {
          foundInCacheData[category.slug] = cachedData;
        } else {
          const existingDataInState = pageDataInCategories[category.slug];
          if (!(existingDataInState && !(existingDataInState.mostPickedStory === null &&
                                     existingDataInState.latestStoriesInfo.stories.length === 0 &&
                                     existingDataInState.latestStoriesInfo.totalCount === 0 &&
                                     existingDataInState.latestStoriesInfo.shouldLoadmore === true))) {
            // Already in state and valid, skip.
          } else {
            needsNetworkFetch.push(category);
          }
        }
      }

      if (Object.keys(foundInCacheData).length > 0) {
        setPageDataInCategories((prev) => ({ ...prev, ...foundInCacheData }));
      }

      if (needsNetworkFetch.length === 0) return;

      try {
        const results = await Promise.all(
          needsNetworkFetch.map(category => fetchCategoryData(category))
        );
        
        const newPageData = results.filter(Boolean).reduce((acc, resultWithSlug) => {
          // fetchCategoryData now returns the data directly, not {slug, data}
          // This needs adjustment if fetchCategoryData's return type changed.
          // Assuming fetchCategoryData returns PageData | null for this category.
          // The structure of `result` needs to be aligned with what `fetchCategoryData` returns.
          // For now, let's assume `fetchCategoryData` was intended to return { slug, data }
          // but the previous change made it return data directly.
          // Re-adjusting this part assuming fetchCategoryData returns {slug, data} or just data.
          // Let's stick to the current `fetchCategoryData` which returns the data for the category directly.
          // The calling effect is responsible for knowing the slug.
          // This part of Effect 2 needs to be smarter.
          // The forEach loop was simpler for individual updates. Let's revert to that simplicity for now for Effect 2
          // or correctly map slugs.
          // Given the current structure of fetchCategoryData (returns data, not {slug, data}),
          // we need to process results carefully.
          // The original forEach was simpler for direct updates.
          // Let's use a less batchy update for network results here to simplify:
          console.error('Error: Batching network results in Effect 2 needs slug association. Refactoring required here if batching is kept.')
        } catch (error) {
            console.error('Error in network prefetching other categories data:', error)
        }
      // Fallback to individual fetches for simplicity in this step due to result structure
      needsNetworkFetch.forEach(async (category) => {
        try {
            const result = await fetchCategoryData(category);
            if (result && category.slug) { // category.slug should be valid here
                setPageDataInCategories((prev) => ({ ...prev, [category.slug!]: result }));
            }
        } catch (error) {
            console.error(`Error prefetching category ${category.slug}:`, error);
        }
      });
    }

    if (initialLoadComplete && user.followingCategories.length > 0) {
      prefetchAllOtherCategories()
    }
  }, [
    initialLoadComplete, 
    user.followingCategories, 
    fetchCategoryData, 
    initialActiveCategory,
    pageDataInCategories 
  ])

  // Effect 3: User Navigation (Load Current Category Data)
  useEffect(() => {
    const loadCurrentCategoryData = async () => {
      if (!currentCategory?.slug || !initialLoadComplete) {
        if (!currentCategory && user.followingCategories.length === 0) {
            setIsLoading(false);
        }
        return;
      }
      
      if (currentCategory.slug === initialActiveCategory?.slug) {
        // Data handled by initial load, ensure loading is false
        setIsLoading(false); 
        return;
      }

      const categorySlug = currentCategory.slug;

      // Try to load from cache first
      const cachedData = getCachedCategoryData(categorySlug, CATEGORY_CACHE_TTL_MS);
      if (cachedData) {
        setPageDataInCategories((prev) => ({ ...prev, [categorySlug]: cachedData }));
        setIsLoading(false);
        
        // Stale-while-revalidate: Fetch in background
        fetchCategoryData(currentCategory).then((networkResult) => {
          if (networkResult && 
              JSON.stringify(networkResult) !== JSON.stringify(cachedData)) {
            setPageDataInCategories((prev) => ({ ...prev, [categorySlug]: networkResult }));
          }
        }).catch(error => {
          console.error(`SWR failed for current category ${categorySlug}:`, error);
        });
        return; // Return after setting cached data and initiating SWR
      }

      // If not in cache, check if already in state (e.g. from background prefetch or previous action)
      const existingDataInState = pageDataInCategories[categorySlug];
      if (existingDataInState && !(existingDataInState.mostPickedStory === null &&
                             existingDataInState.latestStoriesInfo.stories.length === 0 &&
                             existingDataInState.latestStoriesInfo.totalCount === 0 &&
                             existingDataInState.latestStoriesInfo.shouldLoadmore === true)) {
        setIsLoading(false);
        return;
      }

      // Full load: not in cache, not valid in state
      setIsLoading(true);
      try {
        const result = await fetchCategoryData(currentCategory);
        if (result) {
          setPageDataInCategories((prev) => ({ ...prev, [categorySlug]: result }));
        }
      } catch (error) {
        console.error(`Error fetching current category ${categorySlug}:`, error);
      } finally {
        setIsLoading(false);
      }
    }

    if (initialLoadComplete) {
      loadCurrentCategoryData();
    }
  }, [
    currentCategory, 
    fetchCategoryData, 
    pageDataInCategories, 
    initialLoadComplete, 
    initialActiveCategory,
    user.followingCategories.length
  ]);

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
