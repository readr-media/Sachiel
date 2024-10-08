'use client'
import React, { useEffect } from 'react'

import { useComment } from '@/context/comment-context'
import { type Story } from '@/graphql/__generated__/graphql'

import { CommentBlockItem } from './comment-block-item'

const BACKGROUND_COLOR_FADE_TIME = 5000

export const CommentBlock = ({
  title,
  type,
  comments = [],
}: {
  title: string
  comments?: Story['comment']
  type: 'popular' | 'all'
}) => {
  const { state, dispatch } = useComment()

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
      <p className="list-title px-5 py-4">
        {title}
        <span className={`${type === 'popular' ? 'hidden' : ''}`}>
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
        <p className="body-3 mx-5 text-primary-600">
          還沒有人留言，快來搶頭香！
        </p>
      )}
    </ul>
  )
}
