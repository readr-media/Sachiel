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
    getInitialPageData(allCategories) // Use allCategories for initial map structure
  )
  const followingCategoriesCount = user.followingCategories.length;

  const isCategoryDataLoaded = (data: PageData[string] | undefined): boolean => {
    if (!data) return false;
    return !(data.mostPickedStory === null &&
             data.latestStoriesInfo.stories.length === 0 &&
             data.latestStoriesInfo.totalCount === 0 &&
             data.latestStoriesInfo.shouldLoadmore === true);
  };

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
      if (!categoryToFetch?.slug || !categoryToFetch?.id) return null;

      const categorySlugVal = categoryToFetch.slug; // Ensure it's a value not a function call
      const categoryIdVal = categoryToFetch.id;

      const categoryLatestStoriesfetchBody = {
        publishers: followingPublisherIds,
        category: categoryIdVal,
        index: 0,
        take: latestStoryPageCount,
      };

      const [
        mostPickedStoryResponse,
        latestStoriesResponse,
        publishersAndStoriesResponse,
      ] = await Promise.all([
        getMostPickedStoriesInCategory(categorySlugVal),
        getLatestStoriesInCategory(categoryLatestStoriesfetchBody),
        getMostSponsorPublishersAndStories(categorySlugVal),
      ]);

      const loadedMostPickedStory = mostPickedStoryResponse?.[0] ?? null;
      const loadedLatestStoriesInfo: LatestStoriesInfo = {
        stories: latestStoriesResponse?.stories ?? [],
        totalCount: latestStoriesResponse?.num_stories ?? 0,
        shouldLoadmore: (latestStoriesResponse?.stories?.length ?? 0) >= latestStoryPageCount,
      };
      const loadedPublishersAndStories =
        publishersAndStoriesResponse
          ?.slice(0, displayPublisherCount)
          .map((ps) => ({
            publisher: ps.publisher,
            stories: ps.stories.slice(0, displayPublisherStoriesCount),
          })) ?? [];
      
      return {
        mostPickedStory: loadedMostPickedStory,
        latestStoriesInfo: loadedLatestStoriesInfo,
        publishersAndStories: loadedPublishersAndStories,
      };
    },
    [followingPublisherIds]
  );

  const loadMoreLatestStories = useCallback(async () => {
    if (!currentCategory || !currentCategory.id || !currentCategory.slug) return;

    const currentCategoryLatestStoriesfetchBody = {
      publishers: followingPublisherIds,
      category: currentCategory.id,
      index: latestStoriesInfo.stories.length, 
      take: latestStoryPageCount,
    };

    const latestStoriesResponse = await getLatestStoriesInCategory(currentCategoryLatestStoriesfetchBody);

    if (!latestStoriesResponse?.stories) return;

    const newLatestStoriesInfo: LatestStoriesInfo = {
      stories: latestStoriesInfo.stories.concat(latestStoriesResponse.stories),
      totalCount: latestStoriesResponse.num_stories ?? latestStoriesInfo.totalCount,
      shouldLoadmore: latestStoriesResponse.stories.length >= latestStoryPageCount,
    };
    
    setPageDataInCategories((oldPageData) => ({
      ...oldPageData,
      [currentCategory.slug!]: {
        ...(oldPageData[currentCategory.slug!] || { // Ensure existing data for other fields is not lost
            mostPickedStory: null, // Provide default if not present
            publishersAndStories: [] // Provide default if not present
        }), 
        latestStoriesInfo: newLatestStoriesInfo,
      },
    }));
  }, [
    currentCategory,
    followingPublisherIds,
    latestStoriesInfo?.stories, // Use optional chaining for safety if latestStoriesInfo can be undefined
    latestStoriesInfo?.totalCount,
  ]);
  
  useEffect(() => {
    if (!searchParams.get(categorySearchParamName) && initialActiveCategory?.slug) {
      replaceSearchParams(categorySearchParamName, initialActiveCategory.slug);
    }
  }, [searchParams, initialActiveCategory]);

  // Effect 1: Initial Active Category Load
  useEffect(() => {
    const loadInitialCategoryData = async () => {
      if (!initialActiveCategory?.slug) {
        if (followingCategoriesCount === 0) {
          setIsLoading(false);
        }
        setInitialLoadComplete(true);
        return;
      }

      const slug = initialActiveCategory.slug;
      if (isCategoryDataLoaded(pageDataInCategories[slug])) {
        setIsLoading(false);
        setInitialLoadComplete(true);
        return;
      }
      
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
    };

    if (!initialLoadComplete) {
      loadInitialCategoryData();
    }
  }, [
    initialActiveCategory, 
    fetchCategoryData, 
    pageDataInCategories, // To re-check if data got populated by other means (though unlikely for initial)
    initialLoadComplete, 
    followingCategoriesCount,
    isCategoryDataLoaded // Added as it's used
  ]);

  // Effect 2: Background Prefetching Other Categories
  useEffect(() => {
    const prefetchAllOtherCategoriesData = async () => {
      const categoriesToPrefetch = user.followingCategories.filter(
        (category) => category.slug && category.slug !== initialActiveCategory?.slug && !isCategoryDataLoaded(pageDataInCategories[category.slug])
      );

      if (categoriesToPrefetch.length === 0) return;

      const prefetchPromises = categoriesToPrefetch.map(category => 
        fetchCategoryData(category).then(data => ({ slug: category.slug, data }))
      );
      
      const results = await Promise.allSettled(prefetchPromises);
      
      const successfullyFetchedData: PageData = {};
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value?.data && result.value.slug) {
          successfullyFetchedData[result.value.slug] = result.value.data;
        } else if (result.status === 'rejected') {
          // Find which category failed for better logging, if possible, or log generic error
          console.error(`Failed to prefetch a category:`, result.reason);
        }
      });

      if (Object.keys(successfullyFetchedData).length > 0) {
        setPageDataInCategories(prevData => ({ ...prevData, ...successfullyFetchedData }));
      }
    };

    if (initialLoadComplete && user.followingCategories.length > 0) {
      prefetchAllOtherCategoriesData();
    }
  }, [
    initialLoadComplete, 
    user.followingCategories, 
    fetchCategoryData, 
    initialActiveCategory,
    pageDataInCategories,
    isCategoryDataLoaded // Added as it's used
  ]);

  // Effect 3: User Navigation (Load Current Category Data)
  useEffect(() => {
    const loadCurrentCategoryDataInternal = async () => {
      if (!currentCategory?.slug || !initialLoadComplete) {
        if (!currentCategory && followingCategoriesCount === 0) {
          setIsLoading(false);
        }
        return;
      }
      
      const categorySlug = currentCategory.slug;

      if (categorySlug === initialActiveCategory?.slug) {
        // Data handled by initial load effect. Ensure isLoading is false if data is loaded.
        if(isCategoryDataLoaded(pageDataInCategories[categorySlug])) {
          setIsLoading(false);
        }
        return;
      }

      if (isCategoryDataLoaded(pageDataInCategories[categorySlug])) {
        setIsLoading(false); // Data already loaded
        return;
      }

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
=======
  // Effect for proactive data fetching for all followed categories on mount
  useEffect(() => {
    const prefetchAllCategoriesData = async () => {
      // setIsLoading(true) // No longer setting global loading for prefetch
      try {
        const allCategoryDataPromises = user.followingCategories.map(
          async (category) => {
            if (!category.slug) return null // Should not happen with valid data

            const categoryLatestStoriesfetchBody = {
              publishers: followingPublisherIds,
              category: category.id ?? '',
              index: 0,
              take: latestStoryPageCount,
            }

            const [
              mostPickedStoryResponse,
              latestStoriesResponse,
              publishersAndStoriesResponse,
            ] = await Promise.all([
              getMostPickedStoriesInCategory(category.slug),
              getLatestStoriesInCategory(categoryLatestStoriesfetchBody),
              getMostSponsorPublishersAndStories(category.slug),
            ])

            const mostPickedStory = mostPickedStoryResponse?.[0] ?? null
            const latestStoriesInfo: LatestStoriesInfo = {
              stories: latestStoriesResponse?.stories ?? [],
              totalCount: latestStoriesResponse?.num_stories ?? 0,
              shouldLoadmore: (latestStoriesResponse?.stories?.length ?? 0) >= latestStoryPageCount,
            }
            const publishersAndStories =
              publishersAndStoriesResponse
                ?.slice(0, displayPublisherCount)
                .map((publisherAndStories) => ({
                  publisher: publisherAndStories.publisher,
                  stories: publisherAndStories.stories.slice(
                    0,
                    displayPublisherStoriesCount
                  ),
                })) ?? []

            return {
              slug: category.slug,
              data: {
                mostPickedStory,
                latestStoriesInfo,
                publishersAndStories,
              },
            }
          }
        )

        const results = await Promise.all(allCategoryDataPromises)
        const newPageData = results.reduce((acc, result) => {
          if (result?.slug) {
            acc[result.slug] = result.data
          }
          return acc
        }, {} as PageData)

        setPageDataInCategories((prevData) => ({ ...prevData, ...newPageData }))
      } catch (error) {
        console.error('Error prefetching all categories data:', error)
        // Even if some categories fail, we might have partial data.
        // Consider how to handle errors more gracefully, e.g., per-category error states.
      } finally {
        // setIsLoading(false) // No longer setting global loading for prefetch
      }
    }

    if (user.followingCategories.length > 0) {
      prefetchAllCategoriesData()
    }
    // else if there are no categories to follow, isLoading is handled by the other effect
    // or by its initial state if currentCategory also doesn't resolve.
    // The second effect has a condition:
    // } else if (user.followingCategories.length === 0) {
	  //   setIsLoading(false) 
	  // }
    // This will correctly set isLoading to false if there's nothing to load at all.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.followingCategories, followingPublisherIds]) // Removed getLatestStoriesfetchBody as it's category specific

  // Effect for fetching data for the current category if not already loaded
  useEffect(() => {
    const fetchCurrentCategoryData = async () => {
      if (!currentCategory || !currentCategory.slug) return

      // Check if data for the current category is already present
      if (
        pageDataInCategories[currentCategory.slug]?.mostPickedStory ||
        pageDataInCategories[currentCategory.slug]?.latestStoriesInfo?.stories?.length > 0
      ) {
        setIsLoading(false) // Data likely pre-fetched or already loaded
        return
      }

      setIsLoading(true)
      try {
        const currentCategoryLatestStoriesfetchBody = {
          publishers: followingPublisherIds,
          category: currentCategory.id ?? '',
          index: 0,
          take: latestStoryPageCount,
        }
        const [
          mostPickedStoryResponse,
          latestStoriesResponse,
          publishersAndStoriesResponse,
        ] = await Promise.all([
          getMostPickedStoriesInCategory(currentCategory.slug),
          getLatestStoriesInCategory(currentCategoryLatestStoriesfetchBody),
          getMostSponsorPublishersAndStories(currentCategory.slug),
        ])

        const mostPickedStory = mostPickedStoryResponse?.[0] ?? null
        const latestStoriesInfo: LatestStoriesInfo = {
          stories: latestStoriesResponse?.stories ?? [],
          totalCount: latestStoriesResponse?.num_stories ?? 0,
          shouldLoadmore: (latestStoriesResponse?.stories?.length ?? 0) >= latestStoryPageCount,
        }
        const publishersAndStories =
          publishersAndStoriesResponse
            ?.slice(0, displayPublisherCount)
            .map((publisherAndStories) => ({
              publisher: publisherAndStories.publisher,
              stories: publisherAndStories.stories.slice(
                0,
                displayPublisherStoriesCount
              ),
            })) ?? []

        setPageDataInCategories((oldPageData) => ({
          ...oldPageData,
          [currentCategory.slug ?? '']: {
            mostPickedStory,
            latestStoriesInfo,
            publishersAndStories,
          },
        }))
      } catch (error) {
        console.error('fetchCurrentCategoryData error', error)
      } finally {
        setIsLoading(false)

    if (initialLoadComplete) {
      loadCurrentCategoryDataInternal();
    }
  }, [
    currentCategory, 
    initialLoadComplete, 
    initialActiveCategory, 
    fetchCategoryData, 
    pageDataInCategories,
    followingCategoriesCount,
    isCategoryDataLoaded // Added as it's used
  ]);

  let contentJsx: JSX.Element;

  if (isLoading || !currentCategory) {
    contentJsx = <Loading withCategory={false} />;
  } else if (!latestStoriesInfo?.stories.length && !mostPickedStory) { 
    contentJsx = <NoStories />;
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
          key={latestStoriesInfo?.stories.length} // Added optional chaining
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
