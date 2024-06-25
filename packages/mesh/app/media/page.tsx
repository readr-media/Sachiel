import { notFound } from 'next/navigation'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import {
  type PublishersQuery,
  GetMemberDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

import CategorySelector from './_components/category-selector'
import DesktopStories from './_components/desktop-stories'
import NonDesktopStories from './_components/non-desktop-stories'
import getLatestStoriesInCategory, {
  type GetLatestStoriesBody,
  type LatestStoriesResponse,
  type Story,
} from './actions'

export const revalidate = 60000
export type Publisher = NonNullable<PublishersQuery['publishers']>[number]
export type LatestStoriesInfo = {
  stories: Story[]
  totalCount: number
  fetchBody: GetLatestStoriesBody
  fetchListInPage: (pageIndex: number) => Promise<Story[]>
}
export { type Story } from './actions'

export default async function Page() {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const memberId = '19'

  const data = await fetchGraphQL(
    GetMemberDocument,
    {
      memberId,
    },
    globalLogFields
  )

  if (!data) {
    return notFound()
  }

  const followingPublishers =
    data.member?.followPublishers?.map((publiser) => publiser.id) ?? []
  const firstCategory = data.member?.followingCategories?.[0]
  const followingMemberIds = new Set(
    data.member?.followingMembers?.map((member) => member.id ?? '')
  )

  if (!firstCategory || !firstCategory.id || !firstCategory.slug) {
    // TODO: user has no category to render, show empty category UI
    return <div>Empty Caegory UI</div>
  }

  const mediaCount = 5
  const latestStoryPageCount = 20
  let mostPickedStory: Story | null | undefined
  let publishers: Publisher[] = []
  const fetchBody = {
    publishers: followingPublishers,
    category: firstCategory?.id,
    index: 0,
    take: latestStoryPageCount,
  }

  let responses: [
    Story[] | null,
    LatestStoriesResponse | null,
    Publisher[] | null
  ]
  try {
    responses = await Promise.all([
      fetchStatic<Story[]>(
        STATIC_FILE_ENDPOINTS.mostPickStoriesInCategoryFn(firstCategory?.slug),
        {
          next: { revalidate: 10 },
        },
        globalLogFields
      ),
      getLatestStoriesInCategory(fetchBody),
      fetchStatic<Publisher[]>(
        STATIC_FILE_ENDPOINTS.mostSponsorPublishers,
        {
          next: { revalidate: 10 },
        },
        globalLogFields
      ),
    ])
  } catch (error) {
    logServerSideError(error, 'Unhandled error in media page', globalLogFields)
    responses = [null, null, null]
  }

  mostPickedStory = responses[0]?.[0]
  const latestStoriesInfo: LatestStoriesInfo = {
    stories:
      responses[1]?.stories?.filter(
        (story) => story.id !== mostPickedStory?.id
      ) ?? [],
    totalCount: responses[1]?.num_stories ?? 0,
    fetchBody,
    fetchListInPage: async (pageIndex) => {
      'use server'
      const response = await getLatestStoriesInCategory({
        ...fetchBody,
        index: (pageIndex - 1) * fetchBody.take,
      })
      // TODO: filter out stories existed in mostPickStory, publisher stories
      return response?.stories ?? []
    },
  }

  publishers = responses[2]?.slice(0, mediaCount) ?? []

  // TODO: fetch real publiser stories
  const displayPublishers = publishers.map((publisher) => ({
    ...publisher,
    stories: latestStoriesInfo.stories?.slice(0, 3) ?? [],
  }))

  return (
    <main className="bg-white">
      <CategorySelector />
      <DesktopStories
        latestStoriesInfo={latestStoriesInfo}
        mostPickedStory={mostPickedStory}
        displayPublishers={displayPublishers}
        followingMemberIds={followingMemberIds}
      />
      <NonDesktopStories
        latestStoriesInfo={latestStoriesInfo}
        mostPickedStory={mostPickedStory}
        displayPublishers={displayPublishers}
        followingMemberIds={followingMemberIds}
      />
    </main>
  )
}
