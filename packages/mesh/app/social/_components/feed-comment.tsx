'use client'

import { useState } from 'react'

import Icon from '@/components/icon'
import type { Story } from '@/graphql/query/get-user-following'

import { renderAvatar, timeDifference } from './feed'

export default function FeedComment({
  comment,
}: {
  comment: Story['comment'][number]
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const text = comment.content || ''
  const maxTextLength = 60
  const isTruncated = text.length > maxTextLength
  const truncatedText = truncateString(text, maxTextLength)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex flex-row border-t py-4">
      {renderAvatar(comment.member, 44)}
      <div className="ml-2">
        <span className="flex items-center">
          <div className="subtitle-2 text-primary-700">
            {comment?.member?.name}
          </div>
          <Icon iconName="icon-dot" size="s" />
          <div className="caption-1 text-primary-500">
            <span>{timeDifference(comment?.createdAt)}</span>
          </div>
        </span>
        <p className="body-3 text-primary-600">
          <span>
            {isTruncated ? (isExpanded ? text : truncatedText) : text}
          </span>
          {isTruncated && !isExpanded && (
            <>
              {'...'}
              <button
                onClick={toggleExpand}
                className="body-3 pl-1 text-primary-400"
              >
                看完整留言
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

const truncateString = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text
  } else {
    return text.substring(0, maxLength).trim()
  }
}
