import React, { useEffect } from 'react'

import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { useComment } from '@/context/comment-context'
import { type Story } from '@/graphql/__generated__/graphql'
import { displayTimeFromNow } from '@/utils/story-display'

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
        if (type === 'popular' && index > 2) return

        return (
          <li
            key={comment.id}
            className={`mx-5 flex gap-2 border-b border-b-primary-200 py-5 transition-colors duration-500 first-of-type:pt-0 last-of-type:border-none ${
              comment.id === state.highlightedId && 'bg-highlight-red'
            }`}
          >
            <Avatar src={comment.member?.avatar || ''} size="l" />
            <div className="flex grow flex-col">
              <section className="flex grow items-center justify-between gap-[2px]">
                {/* meta data */}
                <div className="flex items-center">
                  <p className="subtitle-2">
                    {comment.member?.name || '使用者'}
                  </p>
                  <span className="caption-1 mr-1 text-primary-500">
                    ·{displayTimeFromNow(comment.createdAt)}
                  </span>
                  <Icon iconName="icon-more-horiz" size="m" />
                </div>
                <div className="flex items-center justify-end">
                  <p className="caption-1 text-primary-600">
                    {comment.likeCount}
                  </p>
                  <button>
                    <Icon iconName="icon-heart" size="l" />
                  </button>
                </div>
              </section>
              {/* comment body */}
              <p className="body-3 whitespace-pre text-primary-600">
                {comment.content}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default StoryCommentBlock
