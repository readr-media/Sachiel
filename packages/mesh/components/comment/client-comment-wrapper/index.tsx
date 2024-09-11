'use client'

import { createContext, useContext, useState } from 'react'

import { useUser } from '@/context/user'
import { type GetStoryQuery } from '@/graphql/__generated__/graphql'

import CommentModal from './comment-modal'
import StoryCommentBlock from './story-comment-block'
import StoryCommentFooter from './story-comment-footer'
import StoryCommentHeader from './story-comment-header'
import StoryCommentMeta from './story-comment-meta'

type Story = NonNullable<GetStoryQuery>['story']

const CommentBlockContext = createContext<(() => void) | undefined>(undefined)

export const useCommentBlock = () => {
  const context = useContext(CommentBlockContext)
  if (context === undefined) {
    throw new Error(
      'useCommentBlock must be used within a CommentBlockProvider'
    )
  }
  return context
}

export default function ClientModalWrapper({
  children,
  storyData,
}: {
  children: Readonly<React.ReactNode>
  storyData: Story
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmModalShow, setConfirmModalShow] = useState(false)
  const [comment, setComment] = useState('')
  const { user } = useUser()
  const openCommentBlock = () => {
    setIsModalOpen(true)
    scrollTo({ top: 0 })
    document.body.style.overflow = 'hidden'
  }
  const handleConfirmModalClose = () => setConfirmModalShow(false)

  const closeCommentBlock = () => {
    setIsModalOpen(false)
    setComment('')
    document.body.style.overflow = ''
  }
  const handleCloseComment = () => {
    if (comment) {
      setConfirmModalShow(true)
      return
    }
    closeCommentBlock()
  }
  return (
    <CommentBlockContext.Provider value={openCommentBlock}>
      {children}
      {isModalOpen && (
        <div className="absolute left-0 top-0 z-30 size-full bg-white">
          <StoryCommentHeader closeCommentBlock={handleCloseComment} />
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
              comments={storyData?.comments}
            />
            <StoryCommentBlock
              title="所有留言"
              type="all"
              comments={storyData?.comments}
            />
          </div>
          <StoryCommentFooter
            user={user}
            storyId={storyData?.id}
            comment={comment}
            setComment={setComment}
          />
          <CommentModal
            isOpen={confirmModalShow}
            onClose={handleConfirmModalClose}
            onLeave={() => {
              setConfirmModalShow(false)
              closeCommentBlock()
            }}
          >
            <section className="flex flex-col justify-start">
              <p className="title-2">離開留言區？</p>
              <p className="body-3">系統將不會儲存您剛剛輸入的內容</p>
            </section>
          </CommentModal>
        </div>
      )}
    </CommentBlockContext.Provider>
  )
}
