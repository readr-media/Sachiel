import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import type { Story } from '@/graphql/__generated__/graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

type PublisherStoriesFnType = {
  source: { id: string; title: string; official_site: string }
  stories: Story[]
}

export const publisherStoriesFn = async (publisherCustomId: string) => {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return fetchStatic<PublisherStoriesFnType>(
    STATIC_FILE_ENDPOINTS.publisherStoriesFn(publisherCustomId),
    { next: { revalidate: 10 } },
    globalLogFields
  )
}
