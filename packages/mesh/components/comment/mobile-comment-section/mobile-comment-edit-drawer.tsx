import React, { useRef } from 'react'

import { deleteComment } from '@/app/actions/comment'
import Icon from '@/components/icon'
import { useComment } from '@/context/comment-context'
import { useUser } from '@/context/user'
import useClickOutside from '@/hooks/use-click-outside'

export const MobileCommentEditDrawer = () => {
  const { state, dispatch } = useComment()
  const { commentEditState } = state
  const { user } = useUser()
  const editDrawerRef = useRef(null)

  useClickOutside(editDrawerRef, () => {
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
    dispatch({ type: 'RESET_EDIT_DRAWER' })
  })

  const handleDeleteComment = () => {
    if (!state.commentEditState.commentId) {
      console.warn('no id')
      dispatch({
        type: 'UPDATE_EDIT_DRAWER',
        payload: { ...state.commentEditState, isVisible: false },
      })
      return
    }
    deleteComment({
      memberId: user.memberId,
      commentId: state.commentEditState.commentId,
    })
    dispatch({
      type: 'TOGGLE_DELETE_COMMENT_MODAL',
      payload: { isVisible: true },
    })
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
  }
  const handleEditComment = () => {
    dispatch({ type: 'TOGGLE_COMMENT_EDITOR', payload: { isEditing: true } })
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
  }
  const handleReport = () => {
    dispatch({ type: 'TOGGLE_REPORTING_MODAL', payload: { isVisible: true } })
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
  }

  if (!commentEditState.isVisible) return null
  return (
    <ul
      ref={editDrawerRef}
      className="fixed bottom-0 z-30 flex min-h-16 w-screen flex-col gap-6 bg-white p-5 shadow-[0_-8px_20px_0px_rgba(0,0,0,0.1)]"
    >
      {commentEditState.mode === 'other' ? (
        <li
          onClick={handleReport}
          className="button-large flex items-center gap-[6px]"
        >
          <Icon iconName="icon-flag" size="l" />
          檢舉留言
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
