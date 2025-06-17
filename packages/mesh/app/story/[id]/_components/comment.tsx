'use client'

import CommentBlocks from '@/components/comment/desktop-comment-section/comment-blocks'

const Comment = ({ targetId = '' }: { targetId: string }) => {
  return (
    <div className="hidden grow flex-col sm:flex" id="comment">
      <p className="list-title mb-5 text-primary-700">留言區</p>
      <CommentBlocks targetId={targetId} />
    </div>
  )
}

export default Comment
