import React from 'react'

import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { useComment } from '@/context/comment-context'
import { useUser } from '@/context/user'
import type { Comment } from '@/graphql/__generated__/graphql'
import { useCommentClamp } from '@/hooks/use-comment-clamp'
import { displayTimeFromNow } from '@/utils/story-display'

const StoryCommentBlockItem = ({ comment }: { comment: Comment }) => {
  const { state, dispatch } = useComment()
  const { user } = useUser()
  const clampLineCount = 2
  const canToggle = true
  const { needClamp, commentRef, handleToggleClamp } = useCommentClamp(
    clampLineCount,
    canToggle
  )
  const handleEditComment = ({
    commentAuthor,
    commentId,
    comment,
  }: {
    commentAuthor: string
    commentId: string
    comment: string
  }) => {
    if (commentAuthor === user.name) {
      dispatch({
        type: 'SHOW_EDIT_DRAWER',
        payload: { type: 'self', commentId, comment },
      })
    } else {
      dispatch({
        type: 'SHOW_EDIT_DRAWER',
        payload: { type: 'other', commentId, comment },
      })
    }
  }
  return (
    <li
      key={comment.id}
      className={`mx-5 flex gap-2 border-b border-b-primary-200 py-5 transition-colors duration-500 first-of-type:pt-0 last-of-type:border-none ${
        comment.id === state.highlightedId && 'bg-highlight-red'
      }`}
    >
      <Avatar src={comment.member?.avatar || ''} size="l" />
      <div className="flex max-w-full grow flex-col">
        <section className="flex max-w-[283px] grow items-center justify-between gap-[2px]">
          {/* meta data */}
          <div className="flex max-w-full grow items-center justify-between">
            <div className="flex max-w-[calc(100%_-_50px)] flex-wrap">
              <p className="subtitle-2 max-w-full truncate">
                {comment.member?.name || '使用者'}
              </p>
              <div className="flex items-center">
                <span className="caption-1 mr-1 text-primary-500">
                  ·{displayTimeFromNow(comment.createdAt)}
                </span>
                {comment.is_edited && <Icon iconName="icon-edited" size="m" />}
                <button
                  onClick={() =>
                    handleEditComment({
                      commentAuthor: comment?.member?.name || '',
                      commentId: comment.id,
                      comment: comment.content || '',
                    })
                  }
                >
                  <Icon iconName="icon-more-horiz" size="m" />
                </button>
              </div>
            </div>
            <div className="flex min-w-fit items-center justify-end">
              <p className="caption-1 text-primary-600">
                {comment.likeCount || 0}
              </p>
              <button>
                <Icon iconName="icon-heart" size="l" />
              </button>
            </div>
          </div>
        </section>
        {/* comment body */}
        <div className="max-w-[283px]" ref={commentRef}>
          {needClamp ? (
            <p
              onClick={handleToggleClamp}
              className="body-3 after:body-3 relative max-h-10 overflow-y-hidden whitespace-pre text-wrap break-words text-primary-600 after:absolute after:bottom-0 after:right-1 after:bg-white after:pl-6 after:text-primary-400 after:content-['...顯示更多'] md:after:bottom-[6px]"
            >
              {comment.content}
            </p>
          ) : (
            <p className="body-3 whitespace-pre text-wrap break-words text-primary-600">
              {comment.content}
            </p>
          )}
        </div>
      </div>
    </li>
  )
}

export default StoryCommentBlockItem
