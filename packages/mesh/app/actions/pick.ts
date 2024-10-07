'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { GetMemberPickCommentDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
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

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
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

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to remove pick state via pub/sub'
  )
}

export async function addPickAndComment({
  memberId,
  storyId,
  comment,
}: {
  memberId: string
  storyId: string
  comment: string
}) {
  const payload = {
    action: 'add_pick_and_comment',
    memberId,
    objective: 'story',
    targetId: storyId,
    state: 'public',
    content: comment,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to add pick and comment via pub/sub'
  )
}

export async function getPickComment({
  memberId,
  storyId,
}: {
  memberId: string
  storyId: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    GetMemberPickCommentDocument,
    { memberId, storyId },
    globalLogFields,
    'Failed to get pick comment'
  )

  const pickCommentId = data?.members?.[0].pick?.[0].pick_comment?.[0]?.id ?? ''

  return pickCommentId
}

export async function removeComment({
  memberId,
  commentId,
}: {
  memberId: string
  commentId: string
}) {
  const payload = {
    action: 'remove_comment',
    memberId,
    commentId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to remove comment state via pub/sub'
  )
}
