'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { fetchRestfulPost } from '@/utils/fetch-restful'

export async function addComment({
  memberId,
  storyId,
  content,
}: {
  memberId: string
  storyId: string
  content: string
}) {
  const payload = {
    action: 'add_comment',
    memberId,
    objective: 'story',
    targetId: storyId,
    state: 'public',
    content,
  }
  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to add comment state via pub/sub'
  )
}
