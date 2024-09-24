'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import {
  GetPublisherPolicyDocument,
  GetStoriesDocument,
  GetStoryDocument,
  GetStorySourceDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulGet } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

type RelatedStory = {
  title: string
  summary: string
  content: string
  source: string
  id: number
  og_image: string
  type: string
  lastUpdated: string
}

export async function getStory({
  storyId,
  picksTake,
  commentsTake,
}: {
  storyId: string
  picksTake: number
  commentsTake: number
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await queryGraphQL(
    GetStoryDocument,
    { storyId, picksTake, commentsTake },
    globalLogFields
  )

  return response
}

export async function getRelatedStories({
  storyTitle,
  picksTake,
  commentsTake,
}: {
  storyTitle: string
  picksTake: number
  commentsTake: number
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const relatedRawStories =
    (
      await fetchRestfulGet<RelatedStory[]>(
        RESTFUL_ENDPOINTS.relatedStories + storyTitle
      )
    )?.slice(0, 4) ?? []

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
