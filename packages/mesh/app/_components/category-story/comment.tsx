'use client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { likeComment, unlikeComment } from '@/app/actions/comment'
import { fetchCommentLikes } from '@/app/actions/get-homepage'
import Icon from '@/components/icon'
import Spinner from '@/components/spinner'
import Avatar from '@/components/story-card/avatar'
import { DisplayTimeFromNow } from '@/components/story-time-display'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import { useCommentClamp } from '@/hooks/use-comment-clamp'
import useRedirectLogin from '@/hooks/use-redirect-login'
import type { CategoryStory } from '@/types/homepage'
import { debounce } from '@/utils/performance'

type NonEmptyObject<T> = T extends Record<string, never> ? never : T
type Props = {
  comment: NonEmptyObject<Exclude<CategoryStory['comment'], undefined>>
}

export default function Comment({ comment }: Props) {
  const toastT = useTranslations('Others.toast')
  const [isLikedBySelf, setIsLikedBySelf] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { user } = useUser()
  const { addToast } = useToast()
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()
  const memberId = user.memberId
  const commentId = comment.id
  useEffect(() => {
    const fetchData = async () => {
      if (!commentId || !memberId) return

      setIsLoading(true)
      const data = await fetchCommentLikes(commentId, memberId)
      if (data) {
        setLikeCount(data.likeCount || 0)
        if (data.isLikedBySelf && data.isLikedBySelf.length !== 0) {
          setIsLikedBySelf(true)
        }
        setIsLoading(false)
      }
    }
    fetchData()
  }, [commentId, memberId])

  const handleCommentLiked = debounce(async () => {
    if (detectIfShouldRedirectToLogin()) return

    if (isLikedBySelf) {
      try {
        const response = await unlikeComment({ memberId, commentId })
        if (!response) {
          addToast({
            status: 'fail',
            text: toastT(TOAST_MESSAGE.unlikeCommentFailed),
          })
          throw new Error(`Failed to unlike comment, comment id:${commentId}`)
        }
        setLikeCount((prev) => prev - 1)
        setIsLikedBySelf(false)
        return
      } catch (error) {
        console.error(error)
      }
    }

    try {
      const response = await likeComment({ memberId, commentId })
      if (!response) {
        addToast({
          status: 'fail',
          text: toastT(TOAST_MESSAGE.likeCommentFailed),
        })
        throw new Error(`Failed to like comment, comment id:${commentId}`)
      }
      setLikeCount((prev) => prev + 1)
      setIsLikedBySelf(true)
    } catch (error) {
      console.error(error)
    }
  })

  const canToggle = true
  const clampLineCount = 2
  const { needClamp, commentRef, handleToggleClamp } = useCommentClamp(
    clampLineCount,
    canToggle
  )

  return (
    <div className="cursor-pointer rounded-md border-[0.5px] border-primary-200 bg-primary-100 p-3">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center">
          <Link
            href={`/profile/member/${comment.member?.customId}` || '/'}
            className="flex items-center"
          >
            <Avatar
              src={comment.member.avatar}
              size="m"
              ringColor="primary-100"
            />
            <p className="subtitle-2 ml-2 text-primary-700">
              {comment.member.name}
            </p>
          </Link>

          <Icon iconName="icon-dot" size="xxs" />
          <p className="caption-1 text-primary-500">
            <DisplayTimeFromNow date={comment.createdAt} />
          </p>
        </div>

        <div className="flex items-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <p className="caption-1 text-primary-600">{likeCount}</p>
              <button onClick={handleCommentLiked}>
                <Icon
                  iconName={isLikedBySelf ? 'icon-liked' : 'icon-heart'}
                  size="l"
                />
              </button>
            </>
          )}
          {/* <p className="caption-1 text-primary-600">{likeCount}</p>
          <button onClick={handleCommentLiked}>
            <Icon
              iconName={isLikedBySelf ? 'icon-liked' : 'icon-heart'}
              size="l"
            />
          </button> */}
        </div>
      </div>

      <div className="relative" onClick={handleToggleClamp}>
        <p className="body-3 line-clamp-2 text-primary-600" ref={commentRef}>
          {comment.content}
          {needClamp && (
            <span className="body-3 absolute bottom-0 right-0 bg-gradient-to-r from-transparent from-0% to-primary-100 to-10% pl-4">
              <span className="text-primary-600">... </span>
              <span className="text-primary-400">顯示更多</span>
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
