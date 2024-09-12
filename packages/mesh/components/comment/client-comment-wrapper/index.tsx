'use client'

import React from 'react'

import { CommentProvider, useComment } from '@/context/comment-context'
import { useUser } from '@/context/user'
import { type GetStoryQuery } from '@/graphql/__generated__/graphql'

import CommentEditDrawer from './comment-edit-drawer'
import CommentModal from './comment-modal'
import StoryCommentBlock from './story-comment-block'
import StoryCommentFooter from './story-comment-footer'
import StoryCommentHeader from './story-comment-header'
import StoryCommentMeta from './story-comment-meta'

type Story = NonNullable<GetStoryQuery>['story']

function CommentBlockContent({ storyData }: { storyData: Story }) {
  const { state } = useComment()
  const { comment, commentList, confirmModalShow, isModalOpen } = state
  const { user } = useUser()

  return (
    <>
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
            <StoryCommentBlock
              title="熱門留言"
              type="popular"
              comments={commentList}
            />
            <StoryCommentBlock
              title="所有留言"
              type="all"
              comments={commentList}
            />
          </div>
          <StoryCommentFooter
            user={user}
            storyId={storyData?.id}
            comment={comment}
          />
          <CommentModal isOpen={confirmModalShow}>
            <section className="flex flex-col justify-start">
              <p className="title-2">離開留言區？</p>
              <p className="body-3">系統將不會儲存您剛剛輸入的內容</p>
            </section>
          </CommentModal>
          <CommentEditDrawer />
        </div>
      )}
    </>
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
