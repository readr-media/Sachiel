'use client'

import Comment from './comment-compound'
import { type CommentProps } from './type'

const CommentContainer: React.FC<CommentProps> = (props) => {
  return (
    <Comment {...props}>
      <Comment.Header />
      <Comment.Content />
    </Comment>
  )
}
export default CommentContainer
