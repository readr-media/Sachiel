import { notFound, redirect } from 'next/navigation'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import {
  type GetAllCategoriesQuery,
  type PublishersQuery,
  GetAllCategoriesDocument,
  GetMemberDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import fetchStatic from '@/utils/fetch-static'
import getLatestStoriesInCategory, {
  type GetLatestStoriesBody,
  type LatestStoriesResponse,
  type Story,
} from '@/utils/get-latest-stories-in-categroy'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

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
export { type Story } from '@/utils/get-latest-stories-in-categroy'

export default async function Page({
  params,
}: {
  params: { categorySlug: string }
}) {
  const currentCategorySlug = params.categorySlug
  const globalLogFields = getLogTraceObjectFromHeaders()

  // TODO: get user id or redirect to login page
  const memberId = '19'

  const data = await fetchGraphQL(
    GetMemberDocument,
    {
      memberId,
    },
    globalLogFields
  )

  if (!data) {
    notFound()
  }

  const followingPublishers =
    data.member?.followPublishers?.map((publiser) => publiser.id) ?? []
  const followingCategories = data.member?.followingCategories ?? []
  const currentCategory = followingCategories.find(
    (category) => category.slug === currentCategorySlug
  )
  const followingMemberIds = new Set(
    data.member?.followingMembers?.map((member) => member.id ?? '')
  )

  if (!currentCategory || !currentCategory.id || !currentCategory.slug) {
    redirect(`${followingCategories[0].slug}`)
  }

  const mediaCount = 5
  const latestStoryPageCount = 20
  let mostPickedStory: Story | null | undefined
  let publishers: Publisher[] = []
  let allCategories: Category[] = []
  const getLatestStoriesfetchBody = {
    publishers: followingPublishers,
    category: currentCategory?.id,
    index: 0,
    take: latestStoryPageCount,
  }

  let responses: [
    Story[] | null,
    LatestStoriesResponse | null,
    Publisher[] | null,
    GetAllCategoriesQuery | null
  ]

  try {
    responses = await Promise.all([
      fetchStatic<Story[]>(
        STATIC_FILE_ENDPOINTS.mostPickStoriesInCategoryFn(
          currentCategory?.slug
        ),
        {
          next: { revalidate: 10 },
        },
        globalLogFields
      ),
      getLatestStoriesInCategory(getLatestStoriesfetchBody),
      fetchStatic<Publisher[]>(
        STATIC_FILE_ENDPOINTS.mostSponsorPublishers,
        {
          next: { revalidate: 10 },
        },
        globalLogFields
      ),
      // TODO: fetch json instead
      fetchGraphQL(GetAllCategoriesDocument, undefined, globalLogFields),
    ])
  } catch (error) {
    logServerSideError(error, 'Unhandled error in media page', globalLogFields)
    responses = [null, null, null, null]
  }

  const [
    mostPickedStoryResponse,
    latestStoriesResponse,
    publishersResponse,
    allCategoriesResponse,
  ] = responses

  mostPickedStory = mostPickedStoryResponse?.[0]

  if (latestStoriesResponse?.stories?.length === 0) {
    return (
      <NoStories
        allCategories={allCategories}
        followingCategories={followingCategories}
        activeCategorySlug={currentCategorySlug}
        memberId={memberId}
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

  allCategories = allCategoriesResponse?.categories ?? []

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
        activeCategorySlug={currentCategorySlug}
        memberId={memberId}
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
