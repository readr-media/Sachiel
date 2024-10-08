import React from 'react'

import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { useComment } from '@/context/comment-context'
import { useUser } from '@/context/user'
import type { Comment } from '@/graphql/__generated__/graphql'
import { useCommentClamp } from '@/hooks/use-comment-clamp'
import { displayTimeFromNow } from '@/utils/story-display'

import { CommentEditor } from './comment-editor'
import { DropdownMenu } from './dropdown-menu'

export const CommentBlockItem = ({
  comment,
  displayMode,
}: {
  comment: Comment
  displayMode: 'popular' | 'all'
}) => {
  const { state, dispatch } = useComment()
  const { user } = useUser()
  const sameBlockComment = displayMode === state.commentEditState.displayMode
  const targetComment = state.commentEditState.commentId === comment.id
  const clampLineCount = 2
  const canToggle = true
  const shouldShowDropdownMenu =
    state.commentEditState.isVisible && targetComment && sameBlockComment
  const { needClamp, commentRef, handleToggleClamp } = useCommentClamp(
    clampLineCount,
    canToggle
  )

  const initializeEditCommentDrawer = (
    mode: 'self' | 'other',
    commentId: string,
    commentContent: string
  ) => {
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: {
        mode,
        isVisible: true,
        commentId,
        content: commentContent,
        originalContent: commentContent,
        displayMode,
      },
    })
  }

  const handleDropdownOnClick = ({
    commentAuthor,
    commentId,
    commentContent,
  }: {
    commentAuthor: string
    commentId: string
    commentContent: string
  }) => {
    // 根據評論使用者來決定編輯模式
    const editMode = commentAuthor === user.name ? 'self' : 'other'
    initializeEditCommentDrawer(editMode, commentId, commentContent)
  }

  return (
    <li
      key={comment.id}
      className={`mx-5 flex gap-2 border-b border-b-primary-200 py-5 transition-colors duration-500 first-of-type:pt-0 last-of-type:border-none ${
        comment.id === state.highlightedId ? 'bg-highlight-red' : ''
      }`}
    >
      <Avatar src={comment.member?.avatar || ''} size="l" />
      {state.isEditingComment &&
      state.commentEditState.commentId === comment.id ? (
        <CommentEditor />
      ) : (
        <div className="flex max-w-full grow flex-col">
          <section className="flex w-full max-w-full grow items-center justify-between gap-[2px]">
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
                  {comment.is_edited && (
                    <>
                      <span className="md:hidden">
                        <Icon iconName="icon-edited" size="m" />
                      </span>
                      <p className="caption-1 hidden text-primary-500 md:block">
                        ·編輯留言
                      </p>
                    </>
                  )}
                  <button
                    className="relative"
                    onClick={() => {
                      handleDropdownOnClick({
                        commentAuthor: comment?.member?.name || '',
                        commentId: comment.id,
                        commentContent: comment.content || '',
                      })
                    }}
                  >
                    <Icon iconName="icon-more-horiz" size="m" />
                    {shouldShowDropdownMenu && <DropdownMenu />}
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
          <div className="max-w-full" ref={commentRef}>
            {needClamp ? (
              <p
                onClick={handleToggleClamp}
                className="body-3 after:body-3 relative max-h-10 overflow-y-hidden whitespace-pre text-wrap break-words text-primary-600 after:absolute after:bottom-0 after:right-1 after:bg-gradient-to-r after:from-transparent after:from-0% after:to-white after:to-25% after:pl-6 after:text-primary-400 after:content-['...顯示更多']"
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
      )}
    </li>
  )
}
