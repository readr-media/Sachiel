import {
  GetPublisherPolicyDocument,
  GetStoryDocument,
  GetStorySourceDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

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
