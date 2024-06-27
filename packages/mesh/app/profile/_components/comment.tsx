'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import Icon from '@/components/icon'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { displayTimeFromNow } from '@/utils/story-display'

import { type StoryItem } from './article-card'
type CommentList = NonNullable<StoryItem>['comment']
type CommentProps = {
  data?: NonNullable<CommentList>[number]
  clampLineCount?: number
  avatar: string
}

const Comment = ({ data, clampLineCount = 3, avatar }: CommentProps) => {
  const router = useRouter()
  const [isTooLong, setIsTooLing] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const { width } = useWindowDimensions()

  const shouldRedirect = width >= 960
  const needClamp = !isOpened && isTooLong
  const commentRef = useRef<null | HTMLParagraphElement>(null)
  const defaultLineClamp = `line-clamp-${clampLineCount}`
  useEffect(() => {
    if (!commentRef.current) return

    const styleMap = window.getComputedStyle(commentRef.current)
    const lineHeight = parseInt(styleMap.lineHeight, 10)
    const paragraphHeight = parseInt(styleMap.height, 10)
    const expectedParagraphHeight = lineHeight * clampLineCount
    setIsTooLing(paragraphHeight > expectedParagraphHeight)
  }, [clampLineCount])
  const lineClampClassName = needClamp
    ? `${defaultLineClamp} md:line-clamp-1`
    : `line-clamp-none`
  const toggledPseudoClassName = needClamp ? '' : 'after:opacity-0'

  const handleToggleClamp = () => {
    if (shouldRedirect) {
      // TODO: navigate to story and anchor
      router.push('/story/')
    }
    if (isOpened) return
    if (!isTooLong) return
    setIsOpened(true)
  }
  if (!data)
    return (
      <section className="mt-4 hidden w-full flex-col gap-2 rounded-md border border-primary-200 bg-primary-100 p-3 md:flex ">
        <div
          className={`relative md:flex md:items-center ${toggledPseudoClassName} after:absolute after:bottom-0 after:right-1 after:bg-gradient-to-r after:from-transparent after:from-0% after:to-primary-100 after:to-25% after:pl-6 after:text-sm after:font-normal after:leading-[21px] after:text-primary-400 after:content-['...繼續閱讀'] md:after:bottom-[3px]
`}
          onClick={handleToggleClamp}
        >
          <div className="mr-2 h-7 w-7 min-w-7 overflow-hidden rounded-full">
            <Image
              src={avatar}
              width={28}
              height={28}
              alt="avatar"
              className=" object-cover"
            />
          </div>
          <p
            className={`${lineClampClassName} h-full w-full text-sm font-normal leading-[21px] text-primary-400`}
            ref={commentRef}
          >
            沒有評論
          </p>
        </div>
      </section>
    )
  return (
    <section className="mt-4 flex w-full flex-col gap-2 rounded-md border border-primary-200 bg-primary-100 p-3 ">
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
      <div
        className={`relative md:flex md:items-center ${toggledPseudoClassName} after:absolute after:bottom-0 after:right-1 after:bg-gradient-to-r after:from-transparent after:from-0% after:to-primary-100 after:to-25% after:pl-6 after:text-sm after:font-normal after:leading-[21px] after:text-primary-400 after:content-['...繼續閱讀'] md:after:bottom-[3px]
`}
        onClick={handleToggleClamp}
      >
        <div className="mr-2 hidden h-7 w-7 overflow-hidden rounded-full md:flex">
          <Image
            src={data.member?.avatar || '/images/default-avatar-image.png'}
            width={28}
            height={28}
            alt={data.member?.name || 'avatar'}
            className="  object-cover"
          />
        </div>
        <p
          className={`${lineClampClassName} h-full w-full text-sm font-normal leading-[21px] text-primary-600`}
          ref={commentRef}
        >
          {data.content}
        </p>
      </div>
    </section>
  )
}

export default Comment
