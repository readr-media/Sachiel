'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import fetchStatic from '@/utils/fetch-static'
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

  return await fetchStatic(
    RESTFUL_ENDPOINTS.pubsub,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
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

  return await fetchStatic(
    RESTFUL_ENDPOINTS.pubsub,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
    globalLogFields,
    'Failed to remove pick state via pub/sub'
  )
}
