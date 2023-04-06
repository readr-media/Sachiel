import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

type InfiniteScrollProps = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

const useInfiniteScroll = (
  options: InfiniteScrollProps
): [MutableRefObject<null>, boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isAtBottom, setIsAtBottom] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsAtBottom(entry.isIntersecting)
    }, options)

    const element = ref.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [ref, options])

  return [ref, isAtBottom, setIsAtBottom]
}

export default useInfiniteScroll
