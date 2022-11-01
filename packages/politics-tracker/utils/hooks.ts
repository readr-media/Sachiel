import { useEffect, useState, useRef } from 'react'

type WindowSize = {
  width: number
  height: number
}
function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  function handleResize() {
    setWindowSize(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }))
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

function useTimeout<T extends () => any>(callback: T, delay: number) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.=
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout
  useEffect(() => {
    // Don't schedule if no delay is specified
    if (delay === null) return

    const id = setTimeout(() => savedCallback.current(), delay)

    return () => clearTimeout(id)
  }, [delay])
}

export { useWindowSize, useTimeout }
