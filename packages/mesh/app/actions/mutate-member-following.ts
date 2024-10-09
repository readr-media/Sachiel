'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { fetchRestfulPost } from '@/utils/fetch-restful'

export async function addMemberFollowing(
  memberId: string,
  followingId: string
) {
  const payload = {
    action: 'add_follow',
    memberId,
    objective: 'member',
    targetId: followingId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    {
      cache: 'no-cache',
    },
    'Failed to add following via pub/sub'
  )
}

export async function removeMemberFollowing(
  memberId: string,
  followingId: string
) {
  const payload = {
    action: 'remove_follow',
    memberId,
    objective: 'member',
    targetId: followingId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    {
      cache: 'no-cache',
    },
    'Failed to remove following via pub/sub'
  )
}
