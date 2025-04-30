'use client'
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import Avatar from '@/components/story-card/avatar'
import { EditDrawerBlockType, useComment } from '@/context/comment'
import { useUser } from '@/context/user'
import useClickOutside from '@/hooks/use-click-outside'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

const MobileCommentEditor = () => {
  const { t } = useCustomTranslation()
  const { state, dispatch, handleCommentEdit } = useComment()
  const { isEditingComment } = state
  const { user } = useUser()
  const { name, avatar } = user
  const commentEditorRef = useRef(null)
  const isEditingInProfile =
    state.commentEditState.displayMode === EditDrawerBlockType.Profile
  const handleCloseCommentEditor = () => {
    dispatch({ type: 'TOGGLE_COMMENT_EDITOR', payload: { isEditing: false } })
  }
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_COMMENT_DRAFT', payload: e.target.value })
  }
  useClickOutside(commentEditorRef, handleCloseCommentEditor)
  const recoverScroll = () => (document.body.style.overflow = 'scroll')
  useEffect(() => {
    recoverScroll()
  }, [isEditingComment])
  if (!isEditingComment) return null
  return (
    <>
      {createPortal(
        <div className="fixed inset-0 z-30 overscroll-none bg-lightbox-dark" />,
        document.querySelector('.commentEditor') ||
          document.createElement('div')
      )}
      <div
        ref={commentEditorRef}
        className="fixed inset-x-0 bottom-0 z-40 flex h-[216px] w-screen flex-col border bg-white p-5 pt-3"
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
          value={state.commentEditState.content}
        />
        <section
          onClick={() => handleCommentEdit(user)}
          className="body-2 flex items-center justify-end text-custom-blue"
        >
          {state.commentEditState.content.trim()
            ? isEditingInProfile
              ? t('Components.MobileCommentEditor.save', '儲存')
              : t('Components.MobileCommentEditor.submit', '送出')
            : t('Components.MobileCommentEditor.cancel', '取消編輯')}
        </section>
      </div>
    </>
  )
}

export default MobileCommentEditor
