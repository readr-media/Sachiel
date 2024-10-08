import React, { useRef } from 'react'

import Icon from '@/components/icon'
import { useComment } from '@/context/comment-context'
import useClickOutside from '@/hooks/use-click-outside'
import useWindowDimensions from '@/hooks/use-window-dimension'

export const DropdownMenu = () => {
  const { width } = useWindowDimensions()
  const isMobileWidth = width < 768
  const { dispatch, state } = useComment()
  const editDrawerRef = useRef<null | HTMLUListElement>(null)

  useClickOutside(editDrawerRef, () => {
    if (isMobileWidth) return
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
    dispatch({ type: 'RESET_EDIT_DRAWER' })
  })

  const handleEditComment = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    dispatch({ type: 'TOGGLE_COMMENT_EDITOR', payload: { isEditing: true } })
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
  }

  const handleDeleteComment = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })

    if (!state.commentEditState.commentId) {
      console.warn('no id')
      return
    }

    dispatch({
      type: 'TOGGLE_DELETE_COMMENT_MODAL',
      payload: { isVisible: true },
    })
  }
  const handleReport = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch({ type: 'TOGGLE_REPORTING_MODAL', payload: { isVisible: true } })
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
  }
  return (
    <ul
      ref={editDrawerRef}
      className="absolute left-0 top-0 z-10 hidden w-[180px] flex-col bg-white py-2 shadow-[0px_0px_24px_0px_rgba(0,9,40,0.10),0px_2px_40px_0px_rgba(0,9,40,0.10)] sm:flex"
    >
      {state.commentEditState.mode === 'other' ? (
        <li
          onClick={(e) => handleReport(e)}
          className="button-large flex items-center gap-1 px-5 py-2 hover:bg-primary-100"
        >
          <Icon iconName="icon-edit" size="m" />
          檢舉留言
        </li>
      ) : (
        <>
          <li
            onClick={(e) => handleEditComment(e)}
            className="button-large flex items-center gap-1 px-5 py-2 hover:bg-primary-100"
          >
            <Icon iconName="icon-edit" size="m" />
            編輯留言
          </li>
          <li
            onClick={(e) => handleDeleteComment(e)}
            className="button-large flex items-center gap-1 px-5 py-2 hover:bg-primary-100"
          >
            <span className="brightness-0">
              <Icon iconName="icon-delete" size="m" />
            </span>
            刪除留言
          </li>
        </>
      )}
    </ul>
  )
}
