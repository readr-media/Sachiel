'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { fetchRestfulPost } from '@/utils/fetch-restful'

export async function addFollowPublisher({
  memberId,
  publisherId,
}: {
  memberId: string
  publisherId: string
}) {
  const payload = {
    action: 'add_bookmark',
    memberId,
    objective: 'publisher',
    targetId: publisherId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to add follow publisher state via pub/sub'
  )
}

export async function removeFollowPublisher({
  memberId,
  publisherId,
}: {
  memberId: string
  publisherId: string
}) {
  const payload = {
    action: 'remove_follow',
    memberId,
    objective: 'publisher',
    targetId: publisherId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to remove follow publisher state via pub/sub'
  )
}
