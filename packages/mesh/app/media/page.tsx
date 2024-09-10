import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import getLatestStoriesInCategory, {
  type GetLatestStoriesBody,
  type LatestStoriesResponse,
  type Story,
} from '@/app/actions/get-latest-stories-in-categroy'
import {
  type GetAllCategoriesQuery,
  type PublishersQuery,
  GetAllCategoriesDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

import getMostPickedStoriesInCategory from '../actions/get-most-picked-stories-in-category'
import getMostSponsorPublishers from '../actions/get-most-sponsor-publishers'
import CategorySelector from './_components/category-selector'
import DesktopStories from './_components/desktop-stories'
import NoStories from './_components/no-stories'
import NonDesktopStories from './_components/non-desktop-stories'

//TODO: cache setting
export const revalidate = 0

export type Publisher = NonNullable<PublishersQuery['publishers']>[number]
export type Category = NonNullable<GetAllCategoriesQuery['categories']>[number]
export type LatestStoriesInfo = {
  stories: Story[]
  totalCount: number
  fetchBody: GetLatestStoriesBody
  fetchListInPage: (pageIndex: number) => Promise<Story[]>
}
export { type Story } from '@/app/actions/get-latest-stories-in-categroy'

export default async function Page() {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const user = await getCurrentUser()

  if (!user) redirect('/login')

  const followingPublishers = user.followingPublishers.map(
    (publisher) => publisher.id
  )
  const followingCategories = user.followingCategories
  const currentCategory = followingCategories[0]
  const followingMemberIds = user?.followingMemberIds

  if (!currentCategory || !currentCategory.id || !currentCategory.slug) {
    redirect(`${followingCategories[0].slug}`)
  }

  const mediaCount = 5
  const latestStoryPageCount = 20
  let allCategories: Category[] = []
  let mostPickedStory: Story | null | undefined = undefined
  let publishers: Publisher[] = []
  const getLatestStoriesfetchBody = {
    publishers: followingPublishers,
    category: currentCategory?.id,
    index: 0,
    take: latestStoryPageCount,
  }

  let responses: [
    GetAllCategoriesQuery | null,
    Story[] | null,
    LatestStoriesResponse | null,
    Publisher[] | null
  ]

  try {
    responses = await Promise.all([
      // TODO: fetch json instead
      queryGraphQL(GetAllCategoriesDocument, undefined, globalLogFields),
      getMostPickedStoriesInCategory(currentCategory.slug),
      getLatestStoriesInCategory(getLatestStoriesfetchBody),
      getMostSponsorPublishers(),
    ])
  } catch (error) {
    logServerSideError(error, 'Unhandled error in media page', globalLogFields)
    responses = [null, null, null, null]
  }

  const [
    allCategoriesResponse,
    mostPickedStoryResponse,
    latestStoriesResponse,
    publishersResponse,
  ] = responses

  mostPickedStory = mostPickedStoryResponse?.[0]
  allCategories = allCategoriesResponse?.categories ?? []

  if (latestStoriesResponse?.stories?.length === 0) {
    return (
      <NoStories
        allCategories={allCategories}
        followingCategories={followingCategories}
        activeCategorySlug={currentCategory.slug}
      />
    )
  }
  const latestStoriesInfo: LatestStoriesInfo = {
    stories:
      latestStoriesResponse?.stories?.filter(
        (story) => story.id !== mostPickedStory?.id
      ) ?? [],
    totalCount: latestStoriesResponse?.num_stories ?? 0,
    fetchBody: getLatestStoriesfetchBody,
    fetchListInPage: async (pageIndex) => {
      'use server'
      const response = await getLatestStoriesInCategory({
        ...getLatestStoriesfetchBody,
        index: (pageIndex - 1) * getLatestStoriesfetchBody.take,
      })
      // TODO: filter out stories existed in mostPickStory, publisher stories
      return response?.stories ?? []
    },
  }

  publishers = publishersResponse?.slice(0, mediaCount) ?? []

  // TODO: fetch real publiser stories
  const displayPublishers = publishers.map((publisher) => ({
    ...publisher,
    stories: latestStoriesInfo.stories?.slice(0, 3) ?? [],
  }))

  return (
    <main className="bg-white">
      <CategorySelector
        allCategories={allCategories}
        followingCategories={followingCategories}
        activeCategorySlug={currentCategory.slug}
      />
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
