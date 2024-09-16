'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { type LatestStoriesQuery } from '@/graphql/__generated__/graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'

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
  return fetchRestfulPost<LatestStoriesResponse>(
    RESTFUL_ENDPOINTS.latestStories,
    body,
    { next: { revalidate: 10 } }
  )
}
