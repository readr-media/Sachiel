import { useEffect, useState } from 'react'

export type WindowSize = {
  width: number
  height: number
}
export default function useWindowSize(): WindowSize {
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
