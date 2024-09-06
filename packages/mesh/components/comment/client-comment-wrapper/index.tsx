'use client'

import { useState } from 'react'

import StoryCommentBlock from './story-comment-block'
import StoryCommentHeader from './story-comment-header'
import StoryCommentMeta from './story-comment-meta'

export default function ClientModalWrapper({
  children,
}: {
  children: Readonly<React.ReactNode>
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
    <>
      {children}
      <button id="test" className="mb-7" onClick={openCommentBlock}>
        toggle
      </button>
      {isModalOpen && (
        <div
          onScroll={(e) => {
            e.stopPropagation()
          }}
          className="absolute left-0 top-0 z-30 size-full bg-white"
        >
          <StoryCommentHeader closeCommentBlock={closeCommentBlock} />
          <div className="max-h-[calc(100dvh_-_60px)] overflow-y-auto py-4">
            <StoryCommentMeta />
            <StoryCommentBlock
              title="熱門留言"
              commentCount={1}
              authorName="Author"
              commentBody="1"
              commentCreatedAt="2017-08-09"
              likeCount={999}
            />
            <StoryCommentBlock
              title="所有留言"
              commentCount={1}
              authorName="Author"
              commentBody="1"
              commentCreatedAt="2017-08-09"
              likeCount={999}
            />
          </div>
        </div>
      )}
    </>
  )
}
