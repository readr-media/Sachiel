'use client'
import React, { useState } from 'react'

import { addComment, deleteComment } from '@/app/actions/comment'
import Button from '@/components/button'
import CommentModal from '@/components/comment/client-comment-wrapper/comment-modal'
import StoryCommentBlock from '@/components/comment/client-comment-wrapper/story-comment-block'
import Dots from '@/components/dots'
import Avatar from '@/components/story-card/avatar'
import { useComment } from '@/context/comment-context'
import { useUser } from '@/context/user'
import type { Comment as CommentType } from '@/graphql/__generated__/graphql'
import { sleep } from '@/utils/sleep'

const Comment = ({ storyId }: { storyId?: string }) => {
  const [isAddingComment, setIsAddingComment] = useState(false)
  const { user } = useUser()
  const { state, dispatch } = useComment()
  const {
    commentList,
    comment,
    confirmDeleteCommentModalShow,
    commentEditState,
  } = state
  const latestCommentId =
    state.commentList.find(
      (comment) => comment.member?.customId === user?.customId
    )?.id || ''

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_COMMENT_TEXT', payload: e.target.value })
  }
  function sortAndFilterComments(comments: CommentType[]): CommentType[] {
    const validComments = comments.filter((comment) => !!comment.likeCount)

    // 如果沒有有效的 likeCount，返回空陣列
    if (validComments.length === 0) {
      return []
    }

    // 按 likeCount 從大到小排序
    const sortedComments = validComments.sort(
      (a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0)
    )

    // 只取前三個元素
    const topThreeComments = sortedComments.slice(0, 3)

    // 如果所有 likeCount 都是 0，返回空陣列
    if (topThreeComments.every((comment) => comment.likeCount === 0)) {
      return []
    }

    return topThreeComments
  }

  const sortAuthorComments = (comments: CommentType[]) => {
    const authorComments = comments.filter(
      (comment) => comment.member?.customId === user.customId
    )
    const otherComments = comments.filter(
      (comment) => comment.member?.customId !== user.customId
    )

    const getLatestDate = (comment: CommentType) => {
      const createdDate = comment.createdAt
        ? new Date(comment.createdAt).getTime()
        : 0
      const editedDate = comment.updatedAt
        ? new Date(comment.updatedAt).getTime()
        : 0
      return Math.max(createdDate, editedDate)
    }

    // 對 authorComments 按最新活動日期（createdAt 或 editedAt 中較晚的）從新到舊排序
    const sortedAuthorComments = authorComments.sort((a, b) => {
      return getLatestDate(b) - getLatestDate(a)
    })

    // 將排序後的 authorComments 和 otherComments 合併
    return [...sortedAuthorComments, ...otherComments]
  }

  const handlePublish = async () => {
    if (!user?.memberId) throw new Error('no user id')
    if (!storyId) throw new Error('no story id')
    setIsAddingComment(true)
    const dateTime = new Date().toString()
    const sleepTime = 3000
    let addedCommentId
    try {
      addedCommentId = await addComment({
        content: comment,
        storyId,
        memberId: user?.memberId,
        latestCommentId,
      })
    } catch (error) {
      setIsAddingComment(false)
      console.error({ error })
    }
    if (!addedCommentId) {
      // TODO: error toast
      setIsAddingComment(false)
      console.warn('please retry')
      return
    }
    await sleep(sleepTime)
    dispatch({ type: 'UPDATE_HIGHLIGHTED_COMMENT', payload: addedCommentId })
    dispatch({
      type: 'INSERT_COMMENT',
      payload: {
        id: addedCommentId,
        content: comment,
        createdAt: dateTime,
        member: {
          id: user.memberId,
          customId: user.customId,
          name: user.name,
          avatar: user.avatar,
        },
      },
    })
    dispatch({ type: 'UPDATE_COMMENT_TEXT', payload: '' })
    setIsAddingComment(false)
  }

  const handleDeleteCommentModalOnLeave = () => {
    deleteComment({
      memberId: user.memberId,
      commentId: commentEditState.commentId,
    })
    dispatch({ type: 'REMOVE_COMMENT' })
    dispatch({
      type: 'TOGGLE_DELETE_COMMENT_MODAL',
      payload: { isVisible: false },
    })
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
    dispatch({ type: 'RESET_EDIT_DRAWER' })
  }
  const handleDeleteCommentModalOnClose = () => {
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
    dispatch({ type: 'RESET_EDIT_DRAWER' })
    dispatch({
      type: 'TOGGLE_DELETE_COMMENT_MODAL',
      payload: { isVisible: false },
    })
  }

  const handleReportOnClose = () => {
    dispatch({ type: 'TOGGLE_REPORTING_MODAL', payload: { isVisible: false } })
  }
  // TODO: UI part
  return (
    <div className="flex grow flex-col">
      <p className="list-title mb-5 text-primary-700">留言區</p>
      <div className="flex grow flex-col gap-3 rounded-md bg-multi-layer-light p-5">
        <div className="flex grow gap-2">
          <Avatar src={user.avatar} size="l" />
          <textarea
            name="comment"
            id="comment"
            rows={4}
            placeholder="有什麼要補充的嗎..."
            onChange={handleTextChange}
            value={comment}
            className="grow rounded-md border border-primary-200 p-3"
          />
        </div>
        <div className="h-8 w-[52px] place-self-end *:size-full *:p-0">
          {isAddingComment ? (
            <div className="flex h-8 w-[52px] items-center justify-center rounded-md bg-primary-700">
              <Dots />
            </div>
          ) : (
            <Button
              onClick={handlePublish}
              size="md"
              color="primary"
              text="發布"
              disabled={comment.trim() === ''}
            />
          )}
        </div>
      </div>
      {!!sortAndFilterComments(commentList).length && (
        <StoryCommentBlock
          title="熱門留言"
          type="popular"
          comments={sortAndFilterComments(commentList)}
        />
      )}
      <StoryCommentBlock
        title="所有留言"
        type="all"
        comments={sortAuthorComments(commentList)}
      />
      <CommentModal
        onLeaveText="刪除留言"
        onCloseText="取消"
        isOpen={confirmDeleteCommentModalShow}
        onLeave={handleDeleteCommentModalOnLeave}
        onClose={handleDeleteCommentModalOnClose}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">確認要刪除留言？</p>
          <p className="body-3">系統仍會保留您的精選記錄</p>
        </section>
      </CommentModal>
      <CommentModal
        onLeaveText=""
        onCloseText="返回留言"
        isOpen={state.isReporting}
        onClose={handleReportOnClose}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">檢舉成功</p>
          <p className="body-3">我們已收到您的檢舉，感謝提供資訊</p>
        </section>
      </CommentModal>
    </div>
  )
}

export default Comment
