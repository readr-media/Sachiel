import React, { useRef } from 'react'

import { deleteComment } from '@/app/actions/comment'
import Icon from '@/components/icon'
import { useComment } from '@/context/comment-context'
import { useUser } from '@/context/user'
import useClickOutside from '@/hooks/use-click-outside'

const CommentEditDrawer = () => {
  const { state, dispatch } = useComment()
  const { editDrawerShow } = state
  const { user } = useUser()
  const editDrawerRef = useRef(null)

  useClickOutside(editDrawerRef, () => {
    dispatch({ type: 'HIDE_EDIT_DRAWER' })
    dispatch({ type: 'CLEAR_EDIT_DRAWER' })
  })

  const handleDeleteComment = () => {
    deleteComment({
      memberId: user.memberId,
      commentId: state.editDrawerShow.commentId,
    })
    dispatch({ type: 'SHOW_DELETE_COMMENT_MODAL' })
    dispatch({ type: 'HIDE_EDIT_DRAWER' })
  }
  const handleEditComment = () => {
    dispatch({ type: 'OPEN_COMMENT_EDITOR' })
    dispatch({ type: 'HIDE_EDIT_DRAWER' })
  }
  if (!editDrawerShow.show) return null
  return (
    <ul
      ref={editDrawerRef}
      className="fixed bottom-0 z-30 flex min-h-16 w-screen flex-col gap-6 bg-white p-5 shadow-[0_-8px_20px_0px_rgba(0,0,0,0.1)]"
    >
      {editDrawerShow.type === 'other' ? (
        <li className="button-large flex items-center gap-[6px]">
          <Icon iconName="icon-delete" size="l" />
          檢舉
        </li>
      ) : (
        <>
          {/* click show editor */}
          <li
            onClick={handleEditComment}
            className="button-large flex items-center gap-[6px]"
          >
            <Icon iconName="icon-edit" size="l" />
            編輯留言
          </li>
          <li
            onClick={handleDeleteComment}
            className="button-large flex items-center gap-[6px] text-custom-red-text"
          >
            <Icon iconName="icon-delete" size="l" />
            刪除留言
          </li>
        </>
      )}
    </ul>
  )
}

export default CommentEditDrawer
