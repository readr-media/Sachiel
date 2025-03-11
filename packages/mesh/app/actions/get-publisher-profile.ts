'use server'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import type { PublisherProfile } from '@/utils/data-schema'
import { type PodcastJSONType, PodcastJSONSchema } from '@/utils/data-schema'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export const publisherStoriesFn = async (publisherCustomId: string) => {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return fetchStatic<PublisherProfile>(
    STATIC_FILE_ENDPOINTS.publisherStoriesFn(publisherCustomId),
    { next: { revalidate: 10 } },
    globalLogFields
  )
}

export async function getPublisherPodcastJSON(publisherCustomId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const response = await fetchStatic<PodcastJSONType>(
      STATIC_FILE_ENDPOINTS.publisherPodcastFn(publisherCustomId)
    )
    return PodcastJSONSchema.parse(response)
  } catch (error) {
    logServerSideError(
      error,
      `Error: Fail to get ${publisherCustomId} PodcastJSON`,
      globalLogFields
    )
    return null
  }
}
