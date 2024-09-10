import React, { useEffect, useRef, useState } from 'react'

import Avatar from '@/components/story-card/avatar'

const StoryCommentFooter = () => {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    adjustTextareaHeight()
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '24px'
      const singleLineHeight = 24 // Adjust this value based on your font size and line height
      const maxHeight = singleLineHeight * 4
      const scrollHeight = textarea.scrollHeight
      textarea.style.height = `${Math.min(
        Math.max(scrollHeight, singleLineHeight),
        maxHeight
      )}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  })

  const handlePublish = () => {
    console.log('Publishing:', text)
    // Add your publish logic here
    setText('') // Clear the textarea after publishing
    adjustTextareaHeight()
  }

  return (
    <footer className="absolute bottom-0 left-0 w-screen border-t border-gray-100 bg-white px-5 py-3">
      <div className="grid grid-cols-[auto_1fr_auto] items-center">
        <Avatar src="" size="l" />
        <textarea
          ref={textareaRef}
          className="body-2 grow resize-none pl-2 pr-3 text-primary-700 focus:outline-none"
          rows={4}
          placeholder="我有一些話想說..."
          value={text}
          onChange={handleTextChange}
          style={{
            maxHeight: '6rem',
            overflowY: 'auto',
          }}
        />
        <div className="flex h-11 items-center self-end">
          <button
            className="body-2 text-custom-blue transition-colors hover:bg-blue-600"
            onClick={handlePublish}
          >
            發布
          </button>
        </div>
      </div>
    </footer>
  )
}

export default StoryCommentFooter
