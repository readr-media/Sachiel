import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import useWindowDimensions from '@/hooks/use-window-dimension'

import type { CommentData } from './type'

export const useCommentLogic = (
  clampLineCount: number,
  data?: CommentData,
  canToggle: boolean = false
) => {
  const [isTooLong, setIsTooLong] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const { width } = useWindowDimensions()
  const commentRef = useRef<HTMLParagraphElement>(null)
  const router = useRouter()

  const shouldRedirect = width >= 960
  const needClamp = !isOpened && isTooLong
  const defaultLineClamp = clampLineCount

  useEffect(() => {
    if (!commentRef.current) return

    const styleMap = window.getComputedStyle(commentRef.current)
    const lineHeight = parseInt(styleMap.lineHeight, 10)
    const realHeight = commentRef.current.scrollHeight
    const expectedParagraphHeight = lineHeight * clampLineCount
    setIsTooLong(realHeight > expectedParagraphHeight)
  }, [clampLineCount, data?.content])

  const handleToggleClamp = useCallback(() => {
    if (!commentRef.current) return
    if (shouldRedirect) {
      router.push('/story/')
      return
    }
    if (!isTooLong) return
    if (isOpened) {
      if (!canToggle) return
      commentRef.current.style.setProperty(
        '-webkit-line-clamp',
        clampLineCount.toString()
      )
      setIsOpened(false)
    } else {
      commentRef.current.style.setProperty('-webkit-line-clamp', 'none')
      setIsOpened(true)
    }
  }, [
    commentRef,
    shouldRedirect,
    isTooLong,
    isOpened,
    router,
    canToggle,
    clampLineCount,
  ])

  return {
    isTooLong,
    isOpened,
    needClamp,
    commentRef,
    handleToggleClamp,
    defaultLineClamp,
  }
}
