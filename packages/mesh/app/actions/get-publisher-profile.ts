'use server'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import { GetPublisherPodcastsDocument } from '@/graphql/__generated__/graphql'
import type { PublisherProfile } from '@/utils/data-schema'
import queryGraphQL from '@/utils/fetch-graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export const publisherStoriesFn = async (publisherCustomId: string) => {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return fetchStatic<PublisherProfile>(
    STATIC_FILE_ENDPOINTS.publisherStoriesFn(publisherCustomId),
    { next: { revalidate: 10 } },
    globalLogFields
  )
}

export type PublisherPodcasts = Awaited<ReturnType<typeof getPublisherPodcasts>>
export async function getPublisherPodcasts({
  customId,
  takes,
  start,
}: {
  customId: string
  takes: number
  start: number
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const result = await queryGraphQL(
    GetPublisherPodcastsDocument,
    {
      customId,
      take: takes,
      skip: start,
    },
    globalLogFields,
    'Failed to get publisher podcasts'
  )

  return result?.stories ?? []
}
