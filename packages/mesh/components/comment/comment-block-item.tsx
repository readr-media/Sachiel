'use client'
import Link from 'next/link'
import React from 'react'

import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import type { EditDrawerBlockType } from '@/context/comment'
import { EditDrawerShowType, useComment } from '@/context/comment'
import { useUser } from '@/context/user'
import type { Comment } from '@/graphql/__generated__/graphql'
import { useCommentClamp } from '@/hooks/use-comment-clamp'
import { useCommentLike } from '@/hooks/use-comment-like'
import { displayTimeFromNow } from '@/utils/story-display'

import CommentEditor from './comment-editor'
import DropdownMenu from './dropdown-menu'

const CommentBlockItem = ({
  comment,
  displayMode,
}: {
  comment: Comment
  displayMode: EditDrawerBlockType
}) => {
  const { state, dispatch } = useComment()
  const { user } = useUser()
  const { commentData, isCommentLiked, handleLikeComment } = useCommentLike({
    initialComment: comment,
  })
  const sameBlockComment = displayMode === state.commentEditState.displayMode
  const targetComment = state.commentEditState.commentId === commentData.id
  const clampLineCount = 2
  const canToggle = true
  const shouldShowDropdownMenu =
    state.commentEditState.isVisible && targetComment && sameBlockComment
  const { needClamp, commentRef, handleToggleClamp } = useCommentClamp(
    clampLineCount,
    canToggle
  )

  const initializeEditCommentDrawer = (
    mode: EditDrawerShowType,
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
    const editMode =
      commentAuthor === user.name
        ? EditDrawerShowType.Self
        : EditDrawerShowType.Other
    initializeEditCommentDrawer(editMode, commentId, commentContent)
  }

  return (
    <li
      key={commentData.id}
      className={`flex gap-2 border-b border-b-primary-200 p-5 transition-colors duration-500 first-of-type:pt-0 last-of-type:border-none md:px-0 ${
        commentData.id === state.highlightedId ? 'bg-highlight-red' : ''
      }`}
    >
      <Link
        href={`/profile/member/${comment.member?.customId}`}
        className="flex min-w-fit"
      >
        <Avatar src={commentData.member?.avatar || ''} size="l" />
      </Link>
      {state.isEditingComment &&
      state.commentEditState.commentId === commentData.id ? (
        <CommentEditor />
      ) : (
        <div className="flex max-w-full grow flex-col" id={commentData.id}>
          <section className="flex w-full max-w-full grow items-center justify-between gap-[2px]">
            {/* meta data */}
            <div className="flex max-w-full grow items-center justify-between">
              <div className="flex max-w-[calc(100%_-_50px)] flex-wrap">
                <p className="subtitle-2 max-w-full cursor-pointer truncate hover-or-active:underline">
                  <Link href={`/profile/member/${comment.member?.customId}`}>
                    {commentData.member?.name || '使用者'}
                  </Link>
                </p>
                <div className="flex items-center">
                  <span className="caption-1 mr-1 text-primary-500">
                    ·{displayTimeFromNow(commentData.createdAt)}
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
                        commentAuthor: commentData?.member?.name || '',
                        commentId: commentData.id,
                        commentContent: commentData.content || '',
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
                  {commentData.likeCount || 0}
                </p>
                <button
                  onClick={handleLikeComment}
                  className={`${
                    isCommentLiked ? '' : 'GTM-article_click_like_message'
                  }`}
                >
                  <Icon
                    iconName={isCommentLiked ? 'icon-liked' : 'icon-heart'}
                    size="l"
                  />
                </button>
              </div>
            </div>
          </section>
          {/* comment body */}
          <div className="max-w-full" ref={commentRef}>
            {needClamp ? (
              <p
                onClick={handleToggleClamp}
                className="body-3 relative max-h-[42px] overflow-y-hidden whitespace-pre text-wrap break-words text-primary-600 after:absolute after:bottom-0 after:right-0 after:cursor-pointer after:bg-gradient-to-r after:from-transparent after:from-0% after:to-white after:to-25% after:pl-6 after:text-primary-400 after:content-['...顯示更多']"
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
export default CommentBlockItem
