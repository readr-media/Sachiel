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
  useEffect(() => {
    if (state.highlightedId) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_HIGHLIGHTED_ID', payload: '' })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [state.highlightedId])

  return (
    <ul className="flex grow flex-col">
      <p className="list-title px-5 py-4">
        {title}
        <span className={`${type === 'popular' && 'hidden'}`}>
          （{comments?.length}）
        </span>
      </p>
      {comments?.map((comment, index) => {
        // popular only shows 3 comments
        // TODO: add popular gql
        if (type === 'popular' && index > 2) return

        return <StoryCommentBlockItem comment={comment} key={comment.id} />
      })}
    </ul>
  )
}

export default StoryCommentBlock
