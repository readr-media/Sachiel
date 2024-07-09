import Image from 'next/image'

import Icon from '@/components/icon'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { displayTimeFromNow } from '@/utils/story-display'

import { type CommentType } from './index'
import { useCommentLogic } from './useCommentLogic'

type CommentProps = {
  data: CommentType
  clampLineCount?: number
  avatar: string
  canToggle?: boolean
}

const Comment: React.FC<CommentProps> = ({
  data,
  clampLineCount = 3,
  avatar,
  canToggle = false,
}) => {
  const { width } = useWindowDimensions()
  const shouldRedirect = {
    cond: width > 960,
    route: '/story/',
  }
  const { needClamp, commentRef, handleToggleClamp } = useCommentLogic(
    clampLineCount,
    canToggle,
    shouldRedirect
  )
  if (width < 960 && !data.content) return <></>
  return (
    <section className="mt-4 flex w-full flex-col gap-2 rounded-md border border-primary-200 bg-primary-100 p-3">
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
          <p className="caption-1 leading-[18px] text-primary-500">
            {displayTimeFromNow(data.createdAt)}
          </p>
          <Icon iconName="icon-dot" size="s" />

          <button className="caption-1 leading-[18px] text-primary-500">
            編輯留言
          </button>
        </div>
        <div className="flex items-center justify-end">
          <p className="caption-1 leading-[18px] text-primary-600">
            {data.likeCount}
          </p>
          <button>
            <Icon iconName="icon-heart" size="l" />
          </button>
        </div>
      </div>
      <div
        className={`relative md:flex md:items-start ${
          needClamp ? '' : 'after:opacity-0'
        } after:body-3 after:absolute after:bottom-0 after:right-1 after:bg-gradient-to-r after:from-transparent after:from-0% after:to-primary-100 after:to-25% after:pl-6 after:leading-[21px] after:text-primary-400 after:content-['...繼續閱讀'] md:after:bottom-[6px]`}
        onClick={handleToggleClamp}
      >
        <div className="mr-2 hidden h-7 min-h-7 w-7 min-w-7 overflow-hidden rounded-full md:flex">
          <Image
            src={data.member?.avatar || avatar}
            width={28}
            height={28}
            alt={data.member?.name || 'avatar'}
            className="object-cover"
          />
        </div>
        <p
          className={`body-3 line-clamp-3 h-full w-full leading-[21px] text-primary-600 sm:line-clamp-1`}
          ref={commentRef}
        >
          {data.content || '沒有評論'}
        </p>
      </div>
    </section>
  )
}

export default Comment
