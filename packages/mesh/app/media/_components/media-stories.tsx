'use client'

import { useCallback, useEffect, useState } from 'react'
import { useMemo } from 'react'

import getLatestStoriesInCategory, {
  type Story,
} from '@/app/actions/get-latest-stories-in-category'
import getMostPickedStoriesInCategory from '@/app/actions/get-most-picked-stories-in-category'
import getMostSponsorPublishersAndStories from '@/app/actions/get-most-sponsor-publishers-and-stories'
import { useUser } from '@/context/user'
import type { MostSponsorPublisher } from '@/utils/data-schema'

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
}: {
  allCategories: Category[]
}) {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [currentCategory, setCurrentCategory] = useState(
    user.followingCategories[0]
  )
  const [pageDataInCategories, setPageDataInCategories] = useState<PageData>(
    getInitialPageData(allCategories)
  )

  const followingPublisherIds = useMemo(
    () => user.followingPublishers.map((publisher) => publisher.id),
    [user.followingPublishers]
  )
  const { mostPickedStory, latestStoriesInfo, publishersAndStories } =
    pageDataInCategories[currentCategory.slug ?? '']
  const getLatestStoriesfetchBody = useMemo(
    () => ({
      publishers: followingPublisherIds,
      category: currentCategory.id,
      index: 0,
      take: latestStoryPageCount,
    }),
    [currentCategory.id, followingPublisherIds]
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

    const currentPageData = pageDataInCategories[currentCategory.slug ?? '']
    setPageDataInCategories((oldPageData) => {
      return {
        ...oldPageData,
        [currentCategory.slug ?? '']: {
          ...currentPageData,
          latestStoriesInfo: newLatestStoriesInfo,
        },
      }
    })
  }, [
    currentCategory.slug,
    getLatestStoriesfetchBody,
    latestStoriesInfo.stories,
    pageDataInCategories,
  ])

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setIsLoading(true)

        const [
          mostPickedStoryResponse,
          latestStoriesResponse,
          publishersAndStoriesResponse,
        ] = await Promise.all([
          getMostPickedStoriesInCategory(currentCategory.slug ?? ''),
          getLatestStoriesInCategory(getLatestStoriesfetchBody),
          getMostSponsorPublishersAndStories(),
        ])

        // TODO: handle page display stories no repeated in mostPicked, latest, publisher stories
        const mostPickedStory = mostPickedStoryResponse?.[0] ?? null
        const latestStoriesInfo: LatestStoriesInfo = {
          stories: latestStoriesResponse?.stories ?? [],
          totalCount: latestStoriesResponse?.num_stories ?? 0,
          shouldLoadmore: true,
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
        setIsLoading(false)
      } catch (error) {
        console.error('fetchPageData error', error)
      }
    }

    if (!mostPickedStory) {
      fetchPageData()
    }
  }, [currentCategory.slug, getLatestStoriesfetchBody, mostPickedStory])

  useEffect(() => {
    setPageDataInCategories(getInitialPageData(allCategories))
  }, [allCategories, user.followingPublishers])

  let contentJsx: JSX.Element

  if (isLoading) {
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
          loadMoreLatestStories={loadMoreLatestStories}
        />
        <NonDesktopStories
          key={latestStoriesInfo.stories.length}
          latestStoriesInfo={latestStoriesInfo}
          mostPickedStory={mostPickedStory}
          publishersAndStories={publishersAndStories}
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
        setCurrentCategory={setCurrentCategory}
      />
      {contentJsx}
    </main>
  )
}
