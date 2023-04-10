import type { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { useEffect, useRef, useState } from 'react'

type InfiniteScrollProps = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  amount?: number
  dependency?: unknown
}

const useInfiniteScroll = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  amount,
  dependency,
}: InfiniteScrollProps): [
  MutableRefObject<null>,
  boolean,
  Dispatch<SetStateAction<boolean>>
] => {
  const [isAtBottom, setIsAtBottom] = useState(false)
  const ref = useRef(null)

  const options = {
    root,
    rootMargin,
    threshold,
  }

  const callback: IntersectionObserverCallback = (entries) => {
    for (const entry of entries) {
      if (ref.current && entry.isIntersecting) {
        setIsAtBottom(true)
      } else {
        setIsAtBottom(false)
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    const element = ref.current

    if (element) {
      observer.observe(element)
    }

    if (element && isAtBottom && !amount) {
      observer.unobserve(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [dependency, amount])

  return [ref, isAtBottom, setIsAtBottom]
}

export default useInfiniteScroll
