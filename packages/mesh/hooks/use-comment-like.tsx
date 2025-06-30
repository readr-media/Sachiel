import { useEffect, useMemo, useState } from 'react'

import { likeComment, unlikeComment } from '@/app/actions/comment'
import { useToastMessages } from '@/constants/toast'
import { useComment } from '@/context/comment'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import type { GetStoryInteractionsQuery } from '@/graphql/__generated__/graphql'
import { type CommentType } from '@/types/profile'
import { debounce } from '@/utils/performance'

import useRedirectLogin from './use-redirect-login'

// 從 Story Query 中提取 Comment 型別
type CommentTypeFromStory = NonNullable<
  NonNullable<GetStoryInteractionsQuery['story']>['comments']
>[0]

// 定義共同的 Member 型別
type MemberType = {
  __typename?: 'Member'
  id: string
}

type UseCommentLikeProps = {
  initialComment: CommentType | CommentTypeFromStory
}

type UseCommentLikeReturn = {
  commentData: CommentType | CommentTypeFromStory
  isCommentLiked: boolean
  handleLikeComment: () => void
}

// Type guard functions
function isCommentType(
  comment: CommentType | CommentTypeFromStory
): comment is CommentType {
  return 'isMemberLiked' in comment
}

function isCommentTypeFromStory(
  comment: CommentType | CommentTypeFromStory
): comment is CommentTypeFromStory {
  return 'like' in comment
}

export const useCommentLike = ({
  initialComment,
}: UseCommentLikeProps): UseCommentLikeReturn => {
  const [commentData, setCommentData] = useState<
    CommentType | CommentTypeFromStory
  >(initialComment)
  const { user } = useUser()
  const { addToast } = useToast()
  const { updateCommentLikeStatus } = useComment()
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()
  const toastMessages = useToastMessages()

  const memberLikedList = useMemo(() => {
    if (isCommentType(commentData)) {
      return commentData.isMemberLiked || []
    }
    if (isCommentTypeFromStory(commentData)) {
      return commentData.like || []
    }
    return []
  }, [commentData])

  const isCommentLiked = !!memberLikedList.find(
    (memberLiked) => memberLiked.id === user.memberId
  )

  const handleLikeComment = debounce(async () => {
    if (detectIfShouldRedirectToLogin()) return

    const likeCommentArgs = {
      memberId: user.memberId,
      commentId: commentData.id,
    }

    if (isCommentLiked) {
      try {
        const response = await unlikeComment(likeCommentArgs)
        if (!response) {
          addToast({ status: 'fail', text: toastMessages.unlikeCommentFailed })
          throw new Error('Failed to unlike comment')
        }
        setCommentData((prev) => {
          const prevLikeCount = Math.max(0, (prev.likeCount ?? 0) - 1)

          // 根據不同型別更新相應的欄位
          if (isCommentType(prev)) {
            return {
              ...prev,
              likeCount: prevLikeCount > 0 ? prevLikeCount - 1 : 0,
              isMemberLiked: prev.isMemberLiked?.filter(
                (item) => item.id !== user.memberId
              ),
            }
          } else {
            return {
              ...prev,
              likeCount: prevLikeCount > 0 ? prevLikeCount - 1 : 0,
              like: prev.like?.filter((item) => item.id !== user.memberId),
            }
          }
        })
        updateCommentLikeStatus(commentData.id, user.memberId, false)
      } catch (error) {
        console.error({ error })
      }
      return
    }

    try {
      const response = await likeComment(likeCommentArgs)
      if (!response) {
        addToast({ status: 'fail', text: toastMessages.likeCommentFailed })
        throw new Error('Failed to like comment')
      }
      setCommentData((prev) => {
        const newMember: MemberType = {
          __typename: 'Member',
          id: user.memberId,
        }

        // 根據不同型別更新相應的欄位
        if (isCommentType(prev)) {
          return {
            ...prev,
            likeCount: (prev.likeCount ?? 0) + 1,
            isMemberLiked: [...(prev.isMemberLiked ?? []), newMember],
          }
        } else {
          return {
            ...prev,
            likeCount: (prev.likeCount ?? 0) + 1,
            like: [...(prev.like ?? []), newMember],
          }
        }
      })
      updateCommentLikeStatus(commentData.id, user.memberId, true)
    } catch (error) {
      console.error({ error })
    }
  })

  useEffect(() => {
    /**
     * sync like state when the prop change
     * ex: same comment display in two section (`所有留言` and `熱門留言`)
     */
    setCommentData(initialComment)
  }, [initialComment])

  return {
    commentData,
    isCommentLiked,
    handleLikeComment,
  }
}
