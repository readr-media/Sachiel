'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import {
  GetPublisherPolicyDocument,
  GetStoriesDocument,
  GetStoryDocument,
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
  const picksTake = 5
  const commentsTake = 30
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await queryGraphQL(
    GetStoryDocument,
    { storyId, picksTake, commentsTake },
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
