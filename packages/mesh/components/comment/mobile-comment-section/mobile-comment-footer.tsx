'use client'
import React, { useEffect, useRef } from 'react'

import Dots from '@/components/dots'
import Avatar from '@/components/story-card/avatar'
import { useComment } from '@/context/comment'
import { useUser } from '@/context/user'
import { createAdjustTextareaHeight } from '@/utils/adjust-textarea-height'

const MobileCommentFooter = ({
  targetId = '',
  comment,
}: {
  targetId?: string
  comment: string
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { user } = useUser()
  const { state, dispatch, handleCommentPublish } = useComment()
  const adjustTextareaHeight = createAdjustTextareaHeight()
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_COMMENT_TEXT', payload: e.target.value })
    if (!textareaRef.current) return
    adjustTextareaHeight(textareaRef.current)
  }

  useEffect(() => {
    if (!textareaRef.current) return
    adjustTextareaHeight(textareaRef.current)
  })

  return (
    <footer className="absolute bottom-0 left-0 w-screen border-t border-gray-100 bg-white px-5 py-3">
      <div className="grid grid-cols-[auto_1fr_auto] items-center">
        <Avatar src={user?.avatar || ''} size="l" />
        <textarea
          ref={textareaRef}
          className="body-2 grow resize-none pl-2 pr-3 text-primary-700 focus:outline-none"
          rows={4}
          placeholder="在這裡輸入留言..."
          value={comment}
          onChange={handleTextChange}
          style={{
            maxHeight: '6rem',
            overflowY: 'auto',
          }}
        />
        <div className="flex h-11 items-center self-end">
          <button
            className="body-2 text-custom-blue transition-colors hover:bg-blue-600"
            onClick={() => handleCommentPublish({ user, targetId })}
          >
            {state.isAddingComment ? <Dots /> : '發布'}
          </button>
        </div>
      </div>
    </footer>
  )
}

export default MobileCommentFooter
