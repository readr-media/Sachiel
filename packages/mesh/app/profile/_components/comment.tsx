'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { likeComment, unlikeComment } from '@/app/actions/comment'
import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { useUser } from '@/context/user'
import { useCommentClamp } from '@/hooks/use-comment-clamp'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { type CommentType } from '@/types/profile'
import { debounce } from '@/utils/performance'
import { displayTimeFromNow } from '@/utils/story-display'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

type CommentProps = {
  data: CommentType
  clampLineCount?: number
  avatar: string
  canToggle?: boolean
  storyId?: string
}

const Comment: React.FC<CommentProps> = ({
  data,
  clampLineCount = 3,
  avatar,
  canToggle = false,
  //TODO: 之後有文章再更改成slug或id傳入做跳轉功能。
  storyId = '',
}) => {
  const { width } = useWindowDimensions()
  const { user } = useUser()
  const router = useRouter()
  const { needClamp, commentRef, handleToggleClamp } = useCommentClamp(
    clampLineCount,
    canToggle
  )
  const [commentData, setCommentData] = useState(data)
  const isCommentLiked = !!commentData?.isMemberLiked?.length
  const handleCommentClick = () => {
    if (width > getTailwindConfigBreakpointNumber('md')) {
      router.push(`/story/${storyId}`)
    } else {
      handleToggleClamp()
    }
  }
  const handleLikeComment = debounce(async () => {
    const likeCommentArgs = {
      memberId: user.memberId,
      commentId: commentData.id,
    }
    if (isCommentLiked) {
      try {
        unlikeComment(likeCommentArgs)
      } catch (error) {
        console.error({ error })
      }
      setCommentData((prev) => {
        const prevLikeCount = prev.likeCount ?? 0
        return {
          ...prev,
          likeCount: prevLikeCount > 0 ? prevLikeCount - 1 : 0,
          isMemberLiked: prev.isMemberLiked?.filter(
            (item) => item.id !== user.memberId
          ),
        }
      })
      return
    }
    try {
      likeComment(likeCommentArgs)
    } catch (error) {
      console.error({ error })
    }
    // TODO: user got has list or article has state
    setCommentData((prev) => {
      return {
        ...prev,
        likeCount: (prev.likeCount ?? 0) + 1,
        isMemberLiked: [
          ...(prev.isMemberLiked ?? []),
          { __typename: 'Member' as const, id: user.memberId },
        ],
      }
    })
  })
  {
    /* mobile has no default comment UI; instead desktop has. */
  }
  if (width < getTailwindConfigBreakpointNumber('md') && !commentData.content)
    return <></>
  return (
    <section className="mt-4 flex w-full flex-col gap-2 rounded-md border border-primary-200 bg-primary-100 p-3">
      <div className="flex items-center justify-between md:hidden">
        <div className="flex items-center">
          <Avatar
            src={avatar || ''}
            size="m"
            extra="mr-2 min-w-[28px] min-h-[28px]"
          />
          <p className="caption-1 text-primary-500">
            {displayTimeFromNow(commentData.createdAt)}
          </p>
          <Icon iconName="icon-dot" size="s" />

          <button className="caption-1 text-primary-500">編輯留言</button>
        </div>
        <div className="flex items-center justify-end">
          <p className="caption-1 text-primary-600">{commentData.likeCount}</p>
          <button onClick={handleLikeComment}>
            <Icon
              iconName={isCommentLiked ? 'icon-liked' : 'icon-heart'}
              size="l"
            />
          </button>
        </div>
      </div>
      <div
        className={`relative md:flex md:items-start ${
          needClamp ? '' : 'after:opacity-0'
        } after:body-3 after:absolute after:bottom-0 after:right-1 after:bg-gradient-to-r after:from-transparent after:from-0% after:to-primary-100 after:to-25% after:pl-6 after:text-primary-400 after:content-['...繼續閱讀'] md:after:bottom-[6px]`}
        onClick={handleCommentClick}
      >
        {/* non-mobile comment avatar */}
        <Avatar
          src={avatar || ''}
          size="m"
          extra="mr-2 hidden md:flex min-w-[28px] min-h-[28px]"
        />
        <p
          className={`body-3 line-clamp-3 size-full ${
            commentData.content ? 'text-primary-600' : 'text-primary-400'
          } sm:line-clamp-1`}
          ref={commentRef}
        >
          {commentData.content || '沒有評論'}
        </p>
      </div>
    </section>
  )
}

export default Comment
