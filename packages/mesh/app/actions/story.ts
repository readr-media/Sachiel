'use server'

import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import {
  GetFullStoryDocument,
  GetPublisherPolicyDocument,
  GetStoriesCommentCountsDocument,
  GetStoriesDocument,
  GetStoryDocument,
  GetStoryInteractionsDocument,
  GetStoryPickersDocument,
  GetStorySourceDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

type RelatedStory = {
  id: string
  title: string
  og_image: string
  og_description: string
  published_date: string
  full_screen_ad: string
  isMember: boolean
  source: {
    id: string
    customId: string
    title: string
    is_active: boolean
  }
}

type SearchedResult = {
  story: RelatedStory[]
}

export async function getStory({ storyId }: { storyId: string }) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await queryGraphQL(
    GetStoryDocument,
    { storyId },
    globalLogFields
  )

  return response?.story
}

export async function getRelatedStories({
  storyTitle,
}: {
  storyTitle: string
}) {
  const picksTake = 5
  const commentsTake = 3

  const globalLogFields = getLogTraceObjectFromHeaders()
  const response = await fetchRestfulPost<SearchedResult>(
    RESTFUL_ENDPOINTS.search,
    {
      text: storyTitle,
      objectives: ['story'],
    }
  )

  const relatedRawStories =
    response?.story
      ?.filter((story) => story.title !== storyTitle)
      .slice(0, 4) ?? []

  // TODO: use new api to get story pick list according to user.followingIds
  const relatedStories =
    (
      await queryGraphQL(
        GetStoriesDocument,
        {
          storyIds: relatedRawStories.map((story) => String(story.id)),
          picksTake,
          commentsTake,
        },
        globalLogFields
      )
    )?.stories ?? []

  return relatedStories
}

export async function getPublisherPolicy(customId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await queryGraphQL(
    GetPublisherPolicyDocument,
    {
      customId,
    },
    globalLogFields,
    'Failed to getPublisherPolicy'
  )

  return response?.policies ?? []
}

export async function getStoryUnlockPolicy(storyId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const getStorySourceResponse = await queryGraphQL(
    GetStorySourceDocument,
    { storyId },
    globalLogFields,
    'Failed to getStorySource'
  )

  const storySourceCustomId =
    getStorySourceResponse?.story?.source?.customId ?? ''

  return getPublisherPolicy(storySourceCustomId)
}

export async function getStoryPickers(
  storyId: string,
  picksTake: number,
  picksSkip: number
) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const getStoryPickersResponse = await queryGraphQL(
    GetStoryPickersDocument,
    { storyId, picksTake, picksSkip },
    globalLogFields,
    'Failed to getStoryPickers'
  )
  return getStoryPickersResponse?.story
}

async function getFullStory(storyId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await queryGraphQL(
    GetFullStoryDocument,
    { storyId },
    globalLogFields
  )

  return response?.story ?? null
}

type UnlockStory = [string, number]
export async function tryToGetFullStory(storyId: string) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('token')?.value ?? ''

  if (!accessToken) return null

  const decodedAccessToken = jwt.decode(accessToken, { json: true })
  if (!decodedAccessToken?.story) return null

  const unlockStories: UnlockStory[] = decodedAccessToken?.story ?? []
  const canGetFullStory = unlockStories.some(([id]) => id === storyId)

  if (!canGetFullStory) return null

  return await getFullStory(storyId)
}

export async function getStoryInteractions(storyId: string) {
  const picksTake = 5
  const commentsTake = 30
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await queryGraphQL(
    GetStoryInteractionsDocument,
    { storyId, picksTake, commentsTake },
    globalLogFields
  )

  return response?.story
}

export async function getStoriesCommentCounts({
  storyIds,
}: {
  storyIds: string[]
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const response = await queryGraphQL(
      GetStoriesCommentCountsDocument,
      {
        storyIds,
      },
      globalLogFields
    )
    return response?.stories || []
  } catch (error) {
    console.error('Failed to get stories comment counts:', error)
    return []
  }
}
