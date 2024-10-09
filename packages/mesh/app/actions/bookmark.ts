'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { fetchRestfulPost } from '@/utils/fetch-restful'

export async function addBookmark({
  memberId,
  storyId,
}: {
  memberId: string
  storyId: string
}) {
  const payload = {
    action: 'add_bookmark',
    memberId,
    storyId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to add bookmark state via pub/sub'
  )
}

export async function removeBookmark({
  memberId,
  storyId,
}: {
  memberId: string
  storyId: string
}) {
  const payload = {
    action: 'remove_bookmark',
    memberId,
    storyId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to remove bookmark state via pub/sub'
  )
}
