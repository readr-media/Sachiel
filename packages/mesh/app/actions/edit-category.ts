'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import fetchRestful from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export async function addCategory({
  memberId,
  categoryIds,
}: {
  memberId: string
  categoryIds: string[]
}) {
  const payload = {
    action: 'add_category',
    memberId,
    categoryIds,
  }
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await fetchRestful(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    globalLogFields,
    'Failed to add subscribed category via pub/sub'
  )
}

export async function removeCategory({
  memberId,
  categoryIds,
}: {
  memberId: string
  categoryIds: string[]
}) {
  const payload = {
    action: 'remove_category',
    memberId,
    categoryIds,
  }
  const globalLogFields = getLogTraceObjectFromHeaders()

  return await fetchRestful(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    globalLogFields,
    'Failed to remove subscribed category via pub/sub'
  )
}
