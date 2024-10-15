'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useCommentClamp = (
  clampLineCount: number,
  canToggle: boolean = false
) => {
  const [isTooLong, setIsTooLong] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const commentRef = useRef<HTMLParagraphElement>(null)

  const needClamp = !isOpened && isTooLong
  const defaultLineClamp = clampLineCount

  useEffect(() => {
    if (!commentRef.current) return

    const styleMap = window.getComputedStyle(commentRef.current)
    const lineHeight = parseInt(styleMap.lineHeight, 10)
    const realHeight = commentRef.current.scrollHeight
    const expectedParagraphHeight = lineHeight * clampLineCount
    setIsTooLong(realHeight > expectedParagraphHeight)
  }, [clampLineCount])

  const handleToggleClamp = useCallback(() => {
    if (!commentRef.current || !isTooLong) return
    if (isOpened) {
      if (!canToggle) return
      commentRef.current.style.setProperty(
        '-webkit-line-clamp',
        clampLineCount.toString()
      )
      setIsOpened(false)
    } else {
      commentRef.current.style.setProperty('-webkit-line-clamp', 'inherit')
      setIsOpened(true)
    }
  }, [commentRef, isTooLong, isOpened, canToggle, clampLineCount])

  return {
    isTooLong,
    isOpened,
    needClamp,
    commentRef,
    handleToggleClamp,
    defaultLineClamp,
  }
}
