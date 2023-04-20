import { useEffect, useRef } from 'react'

const useScrollToEnd = (callback: () => void) => {
  const anchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = anchorRef.current
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback()
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      }
    )

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [callback])

  return anchorRef
}

export default useScrollToEnd
