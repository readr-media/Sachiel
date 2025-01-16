import { useCallback, useRef, useState } from 'react'

export default function useInViewDynamicRef() {
  const [isIntersecting, setIsIntersecting] = useState<boolean | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setTarget = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (node) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          setIsIntersecting(entries[0].isIntersecting)
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0,
        }
      )
      observerRef.current.observe(node)
    }
  }, [])

  return { setTarget, isIntersecting, observerRef }
}
