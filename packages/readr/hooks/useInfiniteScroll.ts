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
  amount?: number
  dependency?: any
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
  const element = ref.current

  const options = {
    root,
    rootMargin,
    threshold,
  }

  const callback: IntersectionObserverCallback = (entries) => {
    for (const entry of entries) {
      if (element && entry.isIntersecting) {
        setIsAtBottom(true)
      } else {
        setIsAtBottom(false)
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)

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
  }, [element, dependency])

  return [ref, isAtBottom, setIsAtBottom]
}

export default useInfiniteScroll
