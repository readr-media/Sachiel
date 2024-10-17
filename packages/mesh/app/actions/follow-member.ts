import { z } from 'zod'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { fetchRestfulPost } from '@/utils/fetch-restful'

const FollowPayloadSchema = z.object({
  action: z.enum(['add_follow', 'remove_follow']),
  memberId: z.string(),
  objective: z.literal('member'),
  targetId: z.string(),
})

type FollowPayload = z.infer<typeof FollowPayloadSchema>

async function updateFollowStatus(
  action: 'add_follow' | 'remove_follow',
  memberId: string,
  targetId: string
) {
  const payload: FollowPayload = {
    action,
    memberId,
    objective: 'member',
    targetId,
  }

  // Validate payload
  FollowPayloadSchema.parse(payload)

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    `Failed to ${
      action === 'add_follow' ? 'add' : 'remove'
    } follow member state via pub/sub`
  )
}

export const addFollowMember = (params: {
  memberId: string
  targetId: string
}) => updateFollowStatus('add_follow', params.memberId, params.targetId)

export const removeFollowMember = (params: {
  memberId: string
  targetId: string
}) => updateFollowStatus('remove_follow', params.memberId, params.targetId)
