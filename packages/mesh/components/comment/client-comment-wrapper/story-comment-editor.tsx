import React, { useRef } from 'react'

import { editComment } from '@/app/actions/comment'
import Avatar from '@/components/story-card/avatar'
import { useComment } from '@/context/comment-context'
import { useUser } from '@/context/user'
import useClickOutside from '@/hooks/use-click-outside'

const StoryCommentEditor = () => {
  const { state, dispatch } = useComment()
  const { isEditingComment } = state
  const { user } = useUser()
  const { name, avatar } = user
  const { editDrawerShow } = state
  const commentEditorRef = useRef(null)
  const handleCloseCommentEditor = () => {
    dispatch({ type: 'CLOSE_COMMENT_EDITOR' })
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_COMMENT_EDITOR', payload: e.target.value })
    // if none 取消編輯
  }
  const handleEdit = () => {
    if (!editDrawerShow.comment.trim()) {
      dispatch({ type: 'CLEAR_EDIT_DRAWER' })
      dispatch({ type: 'CLOSE_COMMENT_EDITOR' })
      return
    }
    dispatch({ type: 'EDIT_COMMENT' })
    dispatch({ type: 'CLEAR_EDIT_DRAWER' })
    dispatch({ type: 'CLOSE_COMMENT_EDITOR' })
    editComment({
      memberId: user.memberId,
      commentId: state.editDrawerShow.commentId,
      content: state.editDrawerShow.comment,
    })
  }
  useClickOutside(commentEditorRef, handleCloseCommentEditor)

  if (!isEditingComment) return null

  return (
    <div
      ref={commentEditorRef}
      className="fixed bottom-0 z-40 flex h-[216px] w-screen flex-col bg-white p-5 pt-3"
    >
      <section className="flex items-center justify-start gap-2">
        <Avatar src={avatar} size="l" />
        <p className="subtitle-2">{name}</p>
      </section>
      <textarea
        className="body-2 mt-3 flex max-h-24 grow overflow-y-scroll outline-none"
        name="editComment"
        id="editComment"
        onChange={handleTextChange}
        value={editDrawerShow.comment}
      />
      <section
        onClick={handleEdit}
        className="body-2 flex items-center justify-end text-custom-blue"
      >
        {editDrawerShow.comment.trim() ? '送出' : '取消編輯'}
      </section>
    </div>
  )
}

export default StoryCommentEditor
