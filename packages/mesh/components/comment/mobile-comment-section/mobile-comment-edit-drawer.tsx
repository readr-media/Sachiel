'use client'
import React, { useRef } from 'react'

import Icon from '@/components/icon'
import { EditDrawerShowType, useComment } from '@/context/comment'
import useClickOutside from '@/hooks/use-click-outside'

const MobileCommentEditDrawer = () => {
  const {
    state,
    dispatch,
    handleDeleteComment,
    handleEditComment,
    handleReport,
  } = useComment()
  const { commentEditState } = state
  const editDrawerRef = useRef(null)

  useClickOutside(editDrawerRef, () => {
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
    dispatch({ type: 'RESET_EDIT_DRAWER' })
  })
  if (!commentEditState.isVisible) return null
  return (
    <ul
      ref={editDrawerRef}
      className="fixed inset-x-0 bottom-0 z-30 flex min-h-16 w-screen flex-col gap-6 bg-white p-5 shadow-[0_-8px_20px_0px_rgba(0,0,0,0.1)]"
    >
      {commentEditState.mode === EditDrawerShowType.Other ? (
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

export default MobileCommentEditDrawer
