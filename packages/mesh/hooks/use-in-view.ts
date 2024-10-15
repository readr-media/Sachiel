import { useEffect, useRef, useState } from 'react'

export default function useInView() {
  const [isIntersecting, setIsIntersecting] = useState<boolean | null>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      setIsIntersecting(entries[0].isIntersecting)
    }

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    })

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      observer?.disconnect()
    }
  }, [])

  return { targetRef, isIntersecting }
}
