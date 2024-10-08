import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import type { Story } from '@/graphql/__generated__/graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

type GetPublisherStoriesType = {
  source: { id: string; title: string; official_site: string }
  stories: Story[]
}

export const getPublisherStories = async (publisherCustomId: string) => {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return fetchStatic<GetPublisherStoriesType>(
    STATIC_FILE_ENDPOINTS.getPublisherStories(publisherCustomId),
    { next: { revalidate: 10 } },
    globalLogFields
  )
}
