import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export const getPublisherStories = async (publisherCustomId: string) => {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return fetchStatic<unknown[]>(
    STATIC_FILE_ENDPOINTS.getPublisherStories(publisherCustomId),
    { next: { revalidate: 10 } },
    globalLogFields
  )
}
