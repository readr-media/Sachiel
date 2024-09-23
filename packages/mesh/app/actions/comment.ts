'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { GetLatestAddedCommentDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const getLatestAddComment = async ({
  memberId,
  storyId,
}: {
  memberId: string
  storyId: string
}) => {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await fetchGraphQL(
    GetLatestAddedCommentDocument,
    {
      memberId,
      storyId,
    },
    globalLogFields,
    'Failed to get latest comment ID'
  )
  const comments = data?.comments
  if (!comments?.length) return
  return comments[0].id
}

export async function addComment({
  memberId,
  storyId,
  content,
  latestCommentId,
}: {
  memberId: string
  storyId: string
  content: string
  latestCommentId: string
}): Promise<string | null> {
  const sleepTime = 200
  const retryTimes = 4

  const payload = {
    action: 'add_comment',
    memberId,
    objective: 'story',
    targetId: storyId,
    state: 'public',
    content,
  }

  await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to add comment state via pub/sub'
  )

  // 嘗試獲取新評論ID，最多重試3次
  for (let i = 0; i < retryTimes; i++) {
    const newCommentId = await getLatestAddComment({ memberId, storyId })
    if (newCommentId && latestCommentId !== newCommentId) {
      return newCommentId
    }
    // 如果沒有獲取到ID，稍等片刻再試
    await sleep(sleepTime)
  }

  console.error('Failed to retrieve new comment ID')
  return null
}

export async function editComment({
  memberId,
  commentId,
  content,
}: {
  memberId: string
  commentId: string
  content: string
}) {
  const payload = {
    action: 'edit_comment',
    memberId,
    commentId,
    content,
  }
  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to edit comment state via pub/sub'
  )
}

export async function deleteComment({
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
