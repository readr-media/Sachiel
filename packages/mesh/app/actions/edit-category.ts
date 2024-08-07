'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { fetchRestfulPost } from '@/utils/fetch-restful'

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

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    undefined,
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

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    undefined,
    'Failed to remove subscribed category via pub/sub'
  )
}
