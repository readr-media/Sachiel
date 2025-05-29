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
  const [pageDataInCategories, setPageDataInCategories] = useState<PageData>(
    getInitialPageData(allCategories)
  )
  const searchParams = useSearchParams()
  const currentCategorySlug = searchParams.get(categorySearchParamName)
  const currentCategory = user.followingCategories.find(
    (category) => category.slug === currentCategorySlug
  )

  const followingPublisherIds = useMemo(
    () => user.followingPublishers.map((publisher) => publisher.id),
    [user.followingPublishers]
  )
  const { mostPickedStory, latestStoriesInfo, publishersAndStories } =
    pageDataInCategories[
      (currentCategory?.slug || user.followingCategories[0].slug) ?? ''
    ]
  const getLatestStoriesfetchBody = useMemo(
    () => ({
      publishers: followingPublisherIds,
      category: currentCategory?.id ?? '',
      index: 0,
      take: latestStoryPageCount,
    }),
    [currentCategory?.id, followingPublisherIds]
  )

  const loadMoreLatestStories = useCallback(async () => {
    const latestStoriesResponse = await getLatestStoriesInCategory({
      ...getLatestStoriesfetchBody,
      index: latestStoriesInfo.stories.length,
    })

    // do nothing to error response
    if (!latestStoriesResponse) return

    const newLatestStoriesInfo: LatestStoriesInfo = {
      stories: latestStoriesInfo.stories.concat(
        latestStoriesResponse.stories ?? []
      ),
      totalCount: latestStoriesResponse.num_stories ?? 0,
      // only stop infinite scroll when response return empty array
      shouldLoadmore: latestStoriesResponse.stories.length !== 0 ? true : false,
    }

    const currentPageData = pageDataInCategories[currentCategory?.slug ?? '']
    setPageDataInCategories((oldPageData) => {
      return {
        ...oldPageData,
        [currentCategory?.slug ?? '']: {
          ...currentPageData,
          latestStoriesInfo: newLatestStoriesInfo,
        },
      }
    })
  }, [
    currentCategory?.slug,
    getLatestStoriesfetchBody,
    latestStoriesInfo.stories,
    pageDataInCategories,
  ])

  useEffect(() => {
    if (!currentCategorySlug) {
      replaceSearchParams(
        categorySearchParamName,
        user.followingCategories[0].slug ?? ''
      )
    }
  }, [currentCategorySlug, user.followingCategories])

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
      }
    }

    if (currentCategory?.slug) {
      const categoryData = pageDataInCategories[currentCategory.slug]

      // Fetch if:
      // 1. categoryData doesn't exist (slug not in pageDataInCategories yet - defensive)
      // 2. OR Data is in its initial, unfetched state, indicated by:
      //    - mostPickedStory is null
      //    - latestStoriesInfo.stories is empty
      //    - latestStoriesInfo.totalCount is 0
      //    - latestStoriesInfo.shouldLoadmore is true (this is key to differentiate from a fetched-empty state)
      if (
        !categoryData ||
        (categoryData.mostPickedStory === null &&
          categoryData.latestStoriesInfo.stories.length === 0 &&
          categoryData.latestStoriesInfo.totalCount === 0 &&
          categoryData.latestStoriesInfo.shouldLoadmore === true)
      ) {
        fetchCurrentCategoryData()
      } else {
        // Data is already loaded/fetched (or confirmed empty and fetched)
        setIsLoading(false)
      }
    } else if (user.followingCategories.length === 0) {
		setIsLoading(false) // No categories to load anything for
	}
  }, [
    currentCategory,
    followingPublisherIds, // Added as it's used in fetchCurrentCategoryData
    pageDataInCategories, // Added to re-evaluate if data becomes available
  ])

  let contentJsx: JSX.Element

  if (isLoading || !currentCategory) {
    contentJsx = <Loading withCategory={false} />
  } else if (!latestStoriesInfo?.stories.length) {
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
