import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import type { PublisherProfile } from '@/utils/data-schema'
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
