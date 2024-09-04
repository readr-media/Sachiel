import React from 'react'

import Avatar from '@/components/story-card/avatar'

const CommentBlock = () => {
  return (
    <div className="flex items-center">
      <Avatar src="" size="l" isRound />
      <textarea
        className="h-full grow"
        name="comment-editor"
        id="comment-editor"
        placeholder="請在這裡輸入留言..."
      />
      <p className="body-2 text-custom-blue">發布</p>
    </div>
  )
}

export default CommentBlock
