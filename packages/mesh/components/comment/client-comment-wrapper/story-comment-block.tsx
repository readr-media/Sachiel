import React from 'react'

import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { displayTimeFromNow } from '@/utils/story-display'

const StoryCommentBlock = ({
  title,
  commentCount,
  authorName,
  commentCreatedAt,
  commentBody,
  likeCount,
}: {
  title: string
  commentCount: number
  authorName: string
  commentCreatedAt: string
  commentBody: string
  likeCount: number
}) => {
  return (
    <ul className="flex grow flex-col">
      <p className="list-title px-5 py-4">{`${title}（${commentCount}）`}</p>
      <li className="flex gap-2 px-5">
        <Avatar src="" size="l" />
        <div className="flex grow flex-col">
          <section className="flex grow items-center justify-between">
            {/* meta data */}
            <div className="flex items-center">
              <p className="subtitle-2">{authorName}</p>
              <span className="caption-1 mr-1 text-primary-500">
                ·{displayTimeFromNow(commentCreatedAt)}
              </span>
              <Icon iconName="icon-more-horiz" size="m" />
            </div>
            <div className="flex items-center justify-end">
              <p className="caption-1 text-primary-600">{likeCount}</p>
              <button>
                <Icon iconName="icon-heart" size="l" />
              </button>
            </div>
          </section>
          {/* comment body */}
          <p className="body-3 text-primary-600">{commentBody}</p>
        </div>
      </li>
    </ul>
  )
}

export default StoryCommentBlock
