'use server'

import { z } from 'zod'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { GetLatestAddedCommentDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'
import { sleep } from '@/utils/sleep'

const ItemIdSchema = z.string().regex(/^\d+$/).min(1)
const ContentSchema = z.string().min(1)

const AddCommentSchema = z.object({
  memberId: ItemIdSchema,
  storyId: ItemIdSchema,
  content: ContentSchema,
  latestCommentId: ItemIdSchema,
})

const EditCommentSchema = z.object({
  memberId: ItemIdSchema,
  commentId: ItemIdSchema,
  content: ContentSchema,
})

const DeleteCommentSchema = z.object({
  memberId: ItemIdSchema,
  commentId: ItemIdSchema,
})

const LikeCommentSchema = DeleteCommentSchema

const GetLatestAddCommentSchema = z.object({
  memberId: ItemIdSchema,
  storyId: ItemIdSchema,
})

const getLatestAddComment = async (
  input: z.infer<typeof GetLatestAddCommentSchema>
) => {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const { memberId, storyId } = GetLatestAddCommentSchema.parse(input)
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

export async function addComment(
  input: z.infer<typeof AddCommentSchema>
): Promise<string | null> {
  const sleepTime = 500
  const retryTimes = 3
  const { memberId, storyId, content, latestCommentId } =
    AddCommentSchema.parse(input)
  const payload = {
    action: 'add_comment',
    memberId,
    objective: 'story',
    targetId: storyId,
    state: 'public',
    content,
  }

  try {
    await fetchRestfulPost(
      RESTFUL_ENDPOINTS.pubsub,
      payload,
      { cache: 'no-cache' },
      'Failed to add comment state via pub/sub'
    )
  } catch (error) {
    console.error('Error in fetchRestfulPost:', error)
    return null
  }

  await sleep(sleepTime)

  // 嘗試獲取新評論ID，最多重試3次
  for (let i = 0; i < retryTimes; i++) {
    const newCommentId = await getLatestAddComment({ memberId, storyId })

    if (newCommentId && latestCommentId !== newCommentId) {
      return newCommentId
    }
    // 如果沒有獲取到ID，稍等片刻再試
    await sleep(sleepTime)
  }

  console.error('Failed to retrieve new comment ID after all attempts')
  return null
}

export async function editComment(input: z.infer<typeof EditCommentSchema>) {
  const { memberId, commentId, content } = EditCommentSchema.parse(input)
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

export async function deleteComment(
  input: z.infer<typeof DeleteCommentSchema>
) {
  const { memberId, commentId } = DeleteCommentSchema.parse(input)
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

export async function likeComment(input: z.infer<typeof LikeCommentSchema>) {
  const { memberId, commentId } = LikeCommentSchema.parse(input)
  const payload = {
    action: 'add_like',
    memberId,
    commentId,
  }
  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to like comment via pub/sub'
  )
}
export async function unlikeComment(input: z.infer<typeof LikeCommentSchema>) {
  const { memberId, commentId } = LikeCommentSchema.parse(input)
  const payload = {
    action: 'remove_like',
    memberId,
    commentId,
  }
  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to unlike comment via pub/sub'
  )
}
