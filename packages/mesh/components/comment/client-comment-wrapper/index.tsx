'use client'

import { createContext, useContext, useState } from 'react'

import { type GetStoryQuery } from '@/graphql/__generated__/graphql'

import StoryCommentBlock from './story-comment-block'
import StoryCommentFooter from './story-comment-footer'
import StoryCommentHeader from './story-comment-header'
import StoryCommentMeta from './story-comment-meta'

type Story = NonNullable<GetStoryQuery>['story']

// Create a context for the openCommentBlock function
const CommentBlockContext = createContext<(() => void) | undefined>(undefined)

// Custom hook to use the context
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
  const openCommentBlock = () => {
    setIsModalOpen(true)
    scrollTo({ top: 0 })
    document.body.style.overflow = 'hidden'
  }

  const closeCommentBlock = () => {
    setIsModalOpen(false)
    document.body.style.overflow = ''
  }
  return (
    <CommentBlockContext.Provider value={openCommentBlock}>
      {children}
      {isModalOpen && (
        <div
          onScroll={(e) => {
            e.stopPropagation()
          }}
          className="absolute left-0 top-0 z-30 size-full bg-white"
        >
          <StoryCommentHeader closeCommentBlock={closeCommentBlock} />
          <div className="max-h-[calc(100dvh_-_60px)] overflow-y-auto py-4">
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
          <StoryCommentFooter />
        </div>
      )}
    </CommentBlockContext.Provider>
  )
}
