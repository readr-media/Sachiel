'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import fetchRestful, { RestfulMethod } from '@/utils/fetch-restful'
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
    {
      url: RESTFUL_ENDPOINTS.pubsub,
      body: payload,
      init: { cache: 'no-cache' },
      method: RestfulMethod.Post,
    },
    {
      traceObject: globalLogFields,
      errorMessage: 'Failed to add subscribed category via pub/sub',
    }
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
    {
      url: RESTFUL_ENDPOINTS.pubsub,
      body: payload,
      init: { cache: 'no-cache' },
      method: RestfulMethod.Post,
    },
    {
      traceObject: globalLogFields,
      errorMessage: 'Failed to remove subscribed category via pub/sub',
    }
  )
}
