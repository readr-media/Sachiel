'use server'

import { type Abi } from '@alchemy/aa-core'

import { RESTFUL_ENDPOINTS, STATIC_FILE_ENDPOINTS } from '@/constants/config'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import fetchStatic from '@/utils/fetch-static'

export async function getMeshPointContract() {
  return await fetchStatic<{ abi: Abi }>(STATIC_FILE_ENDPOINTS.contract)
}

export async function unlockSingleStory({
  memberId,
  policyId,
  tid,
  storyId,
}: {
  memberId: string
  policyId: string
  tid: string
  storyId: string
}) {
  const payload = {
    action: 'unlock_story_single',
    memberId,
    policyId,
    tid,
    storyId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to unlock single story state via pub/sub'
  )
}

export async function sponsorPublisher({
  memberId,
  publisherId,
  tid,
  fee,
}: {
  memberId: string
  publisherId: string
  tid: string
  fee: string
}) {
  const payload = {
    action: 'sponsor_media',
    memberId,
    publisherId,
    tid,
    fee,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to sponsor media via pub/sub'
  )
}
