import Image from 'next/image'
import React, { createContext, useContext } from 'react'

import Icon from '@/components/icon'
import { displayTimeFromNow } from '@/utils/story-display'

import type { CommentData, CommentProps } from './type'
import { useCommentLogic } from './useCommentLogic'

const CommentContext = createContext<
  | (ReturnType<typeof useCommentLogic> & {
      data?: CommentData
      avatar: string
    })
  | null
>(null)

const useCommentContext = () => {
  const context = useContext(CommentContext)
  if (!context) {
    throw new Error(
      'Comment compound components must be used within Comment component'
    )
  }
  return context
}

const Comment: React.FC<CommentProps> & {
  Header: typeof Header
  Content: typeof Content
} = ({ data, clampLineCount = 3, avatar, canToggle = false, children }) => {
  const commentLogic = useCommentLogic(clampLineCount, data, canToggle)

  return (
    <CommentContext.Provider value={{ ...commentLogic, data, avatar }}>
      <section className="mt-4 flex w-full flex-col gap-2 rounded-md border border-primary-200 bg-primary-100 p-3">
        {children}
      </section>
    </CommentContext.Provider>
  )
}

// Sub-components
const Header: React.FC = () => {
  const { data } = useCommentContext()

  if (!data) return null

  return (
    <div className="flex items-center justify-between md:hidden">
      <div className="flex items-center">
        <div className="mr-2 h-7 w-7 overflow-hidden rounded-full">
          <Image
            src={data.member?.avatar || '/images/default-avatar-image.png'}
            width={28}
            height={28}
            alt={data.member?.name || 'avatar'}
            className="object-cover"
          />
        </div>
        <p className="text-xs font-normal leading-[18px] text-primary-500">
          {displayTimeFromNow(data.createdAt)}
        </p>
        <Icon iconName="icon-dot" size="s" />
        <button className="text-xs font-normal leading-[18px] text-primary-500">
          編輯留言
        </button>
      </div>
      <div className="flex items-center justify-end">
        <p className="text-xs font-normal leading-[18px] text-primary-600">
          {data.likeCount}
        </p>
        <button>
          <Icon iconName="icon-heart" size="l" />
        </button>
      </div>
    </div>
  )
}

const Content: React.FC = () => {
  const {
    data,
    avatar,
    commentRef,
    needClamp,
    handleToggleClamp,
    defaultLineClamp,
  } = useCommentContext()

  return (
    <div
      className={`relative md:flex md:items-center ${
        needClamp ? '' : 'after:opacity-0'
      } after:absolute after:bottom-0 after:right-1 after:bg-gradient-to-r after:from-transparent after:from-0% after:to-primary-100 after:to-25% after:pl-6 after:text-sm after:font-normal after:leading-[21px] after:text-primary-400 after:content-['...繼續閱讀'] md:after:bottom-[3px]`}
      onClick={handleToggleClamp}
    >
      <div className="mr-2 hidden h-7 w-7 overflow-hidden rounded-full md:flex">
        <Image
          src={data?.member?.avatar || avatar}
          width={28}
          height={28}
          alt={data?.member?.name || 'avatar'}
          className="object-cover"
        />
      </div>
      <p
        className={`line-clamp-3 h-full w-full text-sm font-normal leading-[21px] text-primary-600 sm:line-clamp-1`}
        ref={commentRef}
        style={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: defaultLineClamp,
        }}
      >
        {data?.content || '沒有評論'}
      </p>
    </div>
  )
}

Comment.Header = Header
Comment.Content = Content

export default Comment
