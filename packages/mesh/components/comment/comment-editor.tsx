import React from 'react'

import Button from '@/components/button'
import { useComment } from '@/context/comment'
import { useUser } from '@/context/user'

const CommentEditor = () => {
  const { state, dispatch, handleCommentEdit } = useComment()
  const { user } = useUser()

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_COMMENT_DRAFT', payload: e.target.value })
  }
  const handleAddCommentModalOnLeave = () => {
    dispatch({ type: 'TOGGLE_COMMENT_EDITOR', payload: { isEditing: false } })
  }
  const notChange =
    state.commentEditState.originalContent === state.commentEditState.content

  return (
    <div className="flex grow flex-col gap-y-3">
      <textarea
        className="body-2 flex grow rounded-md border border-primary-200 p-3"
        rows={4}
        onChange={handleTextChange}
        value={state.commentEditState.content}
      />
      <div className="flex items-center justify-end gap-1 focus-visible:outline-none">
        <Button
          onClick={handleAddCommentModalOnLeave}
          text="取消"
          size="md"
          color="white"
        />
        <Button
          onClick={() => handleCommentEdit(user)}
          disabled={notChange}
          text="儲存"
          size="md"
          color="white"
        />
      </div>
    </div>
  )
}

export default CommentEditor
