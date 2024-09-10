'use client'

import { useEffect, useState } from 'react'
import { useMemo } from 'react'

import getLatestStoriesInCategory, {
  type Story,
} from '@/app/actions/get-latest-stories-in-categroy'
import getMostPickedStoriesInCategory from '@/app/actions/get-most-picked-stories-in-category'
import getMostSponsorPublishers, {
  type Publisher,
} from '@/app/actions/get-most-sponsor-publishers'
import Spinner from '@/components/spinner'
import { useUser } from '@/context/user'

import type { Category } from '../page'
import CategorySelector from './category-selector'
import DesktopStories from './desktop-stories'
import NoStories from './no-stories'
import NonDesktopStories from './non-desktop-stories'

export { type Story } from '@/app/actions/get-latest-stories-in-categroy'
export type DisplayPublisher = Publisher & {
  stories: Story[]
}
export type LatestStoriesInfo = {
  stories: Story[]
  totalCount: number
}
type PageData = {
  [key: string]: {
    mostPickedStory: Story | null
    latestStoriesInfo: LatestStoriesInfo
    publishers: DisplayPublisher[]
  }
}

const latestStoryPageCount = 20
const displayPubliserCount = 5

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
    allCategories.reduce((acc, curr) => {
      const categroySlug = curr.slug
      if (categroySlug) {
        acc[categroySlug] = {
          mostPickedStory: null,
          latestStoriesInfo: {
            stories: [],
            totalCount: 0,
          },
          publishers: [],
        }
      }
      return acc
    }, {} as PageData)
  )

  const followingPublisherIds = useMemo(
    () => user.followingPublishers.map((publisher) => publisher.id),
    [user.followingPublishers]
  )
  const { mostPickedStory, latestStoriesInfo, publishers } =
    pageDataInCategories[currentCategory.slug ?? '']

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setIsLoading(true)
        const getLatestStoriesfetchBody = {
          publishers: followingPublisherIds,
          category: currentCategory?.id,
          index: 0,
          take: latestStoryPageCount,
        }

        const [
          mostPickedStoryResponse,
          latestStoriesResponse,
          publishersResponse,
        ] = await Promise.all([
          getMostPickedStoriesInCategory(currentCategory.slug ?? ''),
          getLatestStoriesInCategory(getLatestStoriesfetchBody),
          getMostSponsorPublishers(),
        ])

        // TODO: handle page display stories no repeated in mostPicked, latest, publisher stories
        const mostPickedStory = mostPickedStoryResponse?.[0] ?? null
        const latestStoriesInfo = {
          stories: latestStoriesResponse?.stories ?? [],
          totalCount: latestStoriesResponse?.num_stories ?? 0,
        }

        const publishers =
          publishersResponse
            ?.slice(0, displayPubliserCount)
            .map((publisher) => ({
              ...publisher,
              // TODO: wait getMostSponsorPublishers api to append stories
              stories: latestStoriesInfo.stories.slice(0, 3),
            })) ?? []

        setPageDataInCategories((oldPageData) => ({
          ...oldPageData,
          [currentCategory.slug ?? '']: {
            mostPickedStory,
            latestStoriesInfo,
            publishers,
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
  }, [currentCategory.id, currentCategory.slug, followingPublisherIds])

  let contentJsx: JSX.Element

  if (isLoading) {
    contentJsx = <Spinner />
  } else if (!latestStoriesInfo?.stories.length) {
    contentJsx = <NoStories />
  } else {
    contentJsx = (
      <>
        <DesktopStories
          latestStoriesInfo={latestStoriesInfo}
          mostPickedStory={mostPickedStory}
          publishers={publishers}
        />
        <NonDesktopStories
          latestStoriesInfo={latestStoriesInfo}
          mostPickedStory={mostPickedStory}
          publishers={publishers}
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
