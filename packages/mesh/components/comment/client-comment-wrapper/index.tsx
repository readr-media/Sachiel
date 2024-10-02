'use client'

import React from 'react'

import { CommentProvider, useComment } from '@/context/comment-context'
import { useUser } from '@/context/user'
import type { Comment } from '@/graphql/__generated__/graphql'
import { type GetStoryQuery } from '@/graphql/__generated__/graphql'

import CommentEditDrawer from './comment-edit-drawer'
import CommentModal from './comment-modal'
import StoryCommentBlock from './story-comment-block'
import StoryCommentEditor from './story-comment-editor'
import StoryCommentFooter from './story-comment-footer'
import StoryCommentHeader from './story-comment-header'
import StoryCommentMeta from './story-comment-meta'
type Story = NonNullable<GetStoryQuery>['story']

function CommentBlockContent({ storyData }: { storyData: Story }) {
  const { state, dispatch } = useComment()
  const {
    comment,
    commentList,
    confirmModalShow,
    isModalOpen,
    isReporting,
    confirmDeleteCommentModalShow,
  } = state
  const { user } = useUser()
  const handleAddCommentModalOnLeave = () => {
    dispatch({ type: 'TOGGLE_CONFIRM_MODAL', payload: { isVisible: false } })
    dispatch({ type: 'TOGGLE_COMMENT_MODAL', payload: { isOpen: false } })
    document.body.classList.remove('overflow-hidden')
  }

  const handleAddCommentModalOnClose = () => {
    dispatch({ type: 'TOGGLE_CONFIRM_MODAL', payload: { isVisible: false } })
  }

  const handleDeleteCommentModalOnLeave = () => {
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

  function sortAndFilterComments(comments: Comment[]): Comment[] {
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

  const sortAuthorComments = (comments: Comment[]) => {
    const authorComments = comments.filter(
      (comment) => comment.member?.customId === user.customId
    )
    const otherComments = comments.filter(
      (comment) => comment.member?.customId !== user.customId
    )

    const getLatestDate = (comment: Comment) => {
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

  return (
    <div>
      {isModalOpen && (
        <div className="absolute left-0 top-0 z-30 size-full bg-white">
          <StoryCommentHeader />
          <div className="max-h-[calc(100dvh_-_60px)] overflow-y-auto py-4 pb-[69px]">
            <StoryCommentMeta
              title={storyData?.title || ''}
              publisher={storyData?.source?.title || 'publisher'}
              displayPicks={storyData?.picks}
              pickCount={storyData?.picksCount || 0}
            />
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
          </div>
          <StoryCommentFooter
            user={user}
            storyId={storyData?.id}
            comment={comment}
          />
          <CommentModal
            isOpen={confirmModalShow}
            onLeaveText="離開"
            onCloseText="繼續輸入"
            onLeave={handleAddCommentModalOnLeave}
            onClose={handleAddCommentModalOnClose}
          >
            <section className="flex flex-col justify-start">
              <p className="title-2">離開留言區？</p>
              <p className="body-3">系統將不會儲存您剛剛輸入的內容</p>
            </section>
          </CommentModal>
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
            isOpen={isReporting}
            onClose={handleReportOnClose}
          >
            <section className="flex flex-col justify-start">
              <p className="title-2">檢舉成功</p>
              <p className="body-3">我們已收到您的檢舉，感謝提供資訊</p>
            </section>
          </CommentModal>
          <CommentEditDrawer />
          <StoryCommentEditor />
        </div>
      )}
    </div>
  )
}

export default function ClientModalWrapper({
  children,
  storyData,
}: {
  children: Readonly<React.ReactNode>
  storyData: Story
}) {
  return (
    <CommentProvider initialComments={storyData?.comments || []}>
      <CommentBlockContent storyData={storyData} />
      {children}
    </CommentProvider>
  )
}

export const useCommentBlock = useComment
