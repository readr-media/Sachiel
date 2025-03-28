'use server'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import { GetPublisherStoryTypeDocument } from '@/graphql/__generated__/graphql'
import {
  type ProfileJSONType,
  publisherProfileSchema,
} from '@/utils/data-schema'
import queryGraphQL from '@/utils/fetch-graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export async function getPublisherProfileJSON(publisherCustomId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const response = await fetchStatic<ProfileJSONType>(
      STATIC_FILE_ENDPOINTS.publisherProfileFn(publisherCustomId),
      {
        next: { revalidate: 600 },
      }
    )
    return publisherProfileSchema.parse(response)
  } catch (error) {
    logServerSideError(
      error,
      `Error: Fail to get ${publisherCustomId} profile json`,
      globalLogFields
    )
    return null
  }
}

export async function getPublisherStoryType(publisherCustomId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const response = await queryGraphQL(
      GetPublisherStoryTypeDocument,
      { publisherCustomId },
      globalLogFields,
      'Failed to get publisher story type'
    )

    const data =
      (response?.publisher?.story_type
        ?.map((data) => data.name)
        .filter(Boolean) as ('story' | 'podcast')[]) ?? []
    return data
  } catch (error) {
    logServerSideError(
      error,
      'Failed to get publisher story type',
      globalLogFields
    )
    return []
  }
}
