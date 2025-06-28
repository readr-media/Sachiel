'use client'
import React, { useEffect } from 'react'

import { EditDrawerBlockType, useComment } from '@/context/comment'
import { type Story } from '@/graphql/__generated__/graphql'
import useWindowDimensions from '@/hooks/use-window-dimension'

import CommentBlockItem from './comment-block-item'

const BACKGROUND_COLOR_FADE_TIME = 5000

const CommentBlock = ({
  title,
  type,
  comments = [],
}: {
  title: string
  comments?: Story['comment']
  type: EditDrawerBlockType
}) => {
  const { state, dispatch } = useComment()
  const openCommentBlock = () => {
    dispatch({ type: 'TOGGLE_MOBILE_COMMENT_MODAL', payload: { isOpen: true } })
    document.body.classList.add('overflow-hidden')
  }

  const { width } = useWindowDimensions()
  useEffect(() => {
    if (state.highlightedId) {
      const timer = setTimeout(() => {
        dispatch({ type: 'UPDATE_HIGHLIGHTED_COMMENT', payload: '' })
      }, BACKGROUND_COLOR_FADE_TIME)

      return () => clearTimeout(timer)
    }
  }, [state.highlightedId])

  return (
    <ul className="flex grow flex-col">
      <p className="list-title px-5 py-4 md:px-0">
        {title}
        <span
          className={`${type === EditDrawerBlockType.Popular ? 'hidden' : ''}`}
        >
          （{comments?.length}）
        </span>
      </p>
      {comments?.length ? (
        comments?.map((comment) => {
          return (
            <CommentBlockItem
              displayMode={type}
              comment={comment}
              key={comment.id}
            />
          )
        })
      ) : (
        <button onClick={openCommentBlock} disabled={width > 768}>
          <p className="body-3 mx-5 text-primary-600">
            還沒有人留言，快來搶頭香！
          </p>
        </button>
      )}
    </ul>
  )
}
export default CommentBlock
