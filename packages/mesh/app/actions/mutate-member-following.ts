'use server'

import {
  AddFollowingDocument,
  RemoveFollowingDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export async function addMemberFollowing(
  memberId: string,
  followingId: string
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    AddFollowingDocument,
    { memberId, followingId },
    globalLogFields,
    'Failed to add members following'
  )
  return data?.updateMember
}

export async function removeMemberFollowing(
  memberId: string,
  followingId: string
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    RemoveFollowingDocument,
    { memberId, followingId },
    globalLogFields,
    'Failed to remove members following'
  )
  return data?.updateMember
}
