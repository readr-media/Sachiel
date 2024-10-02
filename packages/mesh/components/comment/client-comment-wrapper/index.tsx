'use client'

import React from 'react'

import { CommentProvider, useComment } from '@/context/comment-context'
import { useUser } from '@/context/user'
import { type GetStoryQuery } from '@/graphql/__generated__/graphql'
import { sortAndFilterComments, sortAuthorComments } from '@/utils/comment'

import CommentEditDrawer from './comment-edit-drawer'
import CommentModal from './comment-modal'
import StoryCommentBlock from './story-comment-block'
import StoryCommentEditor from './story-comment-editor'
import StoryCommentFooter from './story-comment-footer'
import StoryCommentHeader from './story-comment-header'
import StoryCommentMeta from './story-comment-meta'
type Story = NonNullable<GetStoryQuery>['story']

function CommentBlockContent({ storyData }: { storyData: Story }) {
  const {
    state,
    dispatch,
    handleDeleteCommentModalOnLeave,
    handleDeleteCommentModalOnClose,
    handleReportOnClose,
  } = useComment()
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
              comments={sortAuthorComments(commentList, user)}
            />
          </div>
          <StoryCommentFooter storyId={storyData?.id} comment={comment} />
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
