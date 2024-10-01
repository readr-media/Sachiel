import React, { useEffect } from 'react'

import { useComment } from '@/context/comment-context'
import { type Story } from '@/graphql/__generated__/graphql'

import StoryCommentBlockItem from './story-comment-block-item'

const StoryCommentBlock = ({
  title,
  type,
  comments = [],
}: {
  title: string
  comments?: Story['comment']
  type: 'popular' | 'all'
}) => {
  const { state, dispatch } = useComment()
  const backgroundColorFadeTime = 5000
  useEffect(() => {
    if (state.highlightedId) {
      const timer = setTimeout(() => {
        dispatch({ type: 'UPDATE_HIGHLIGHTED_COMMENT', payload: '' })
      }, backgroundColorFadeTime)

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
            <StoryCommentBlockItem
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

export default StoryCommentBlock
