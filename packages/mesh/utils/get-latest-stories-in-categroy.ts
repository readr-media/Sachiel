import 'server-only'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { type LatestStoriesQuery } from '@/graphql/__generated__/graphql'
import fetchRestful, { RestfulMethod } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export type Story = NonNullable<LatestStoriesQuery['stories']>[number]
export type LatestStoriesResponse = {
  update_time: number
  expire_time: number
  num_stories: number
  stories: Story[]
}
export type GetLatestStoriesBody = {
  publishers: string[]
  category: string
  index: number
  take: number
}

export default async function getLatestStoriesInCategory(
  body: GetLatestStoriesBody
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return fetchRestful<LatestStoriesResponse>(
    {
      url: RESTFUL_ENDPOINTS.latestStories,
      body,
      init: { next: { revalidate: 10 } },
      method: RestfulMethod.Post,
    },
    { traceObject: globalLogFields }
  )
}
