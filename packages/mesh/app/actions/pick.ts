'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import fetchRestful from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export async function addPick({
  memberId,
  storyId,
}: {
  memberId: string
  storyId: string
}) {
  const payload = {
    action: 'add_pick',
    memberId,
    objective: 'story',
    targetId: storyId,
    state: 'public',
  }
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await fetchRestful(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    globalLogFields,
    'Failed to add pick state via pub/sub'
  )
}

export async function removePick({
  memberId,
  storyId,
}: {
  memberId: string
  storyId: string
}) {
  const payload = {
    action: 'remove_pick',
    memberId,
    objective: 'story',
    targetId: storyId,
  }
  const globalLogFields = getLogTraceObjectFromHeaders()

  return await fetchRestful(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    globalLogFields,
    'Failed to remove pick state via pub/sub'
  )
}
