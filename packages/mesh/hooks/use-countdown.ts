import { useCallback, useEffect, useState } from 'react'

import { SECOND } from '@/constants/time-unit'

export default function useCountdown(initialCount: number) {
  const [countdown, setCountdown] = useState(initialCount)

  useEffect(() => {
    if (countdown <= 0) return

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, SECOND)

    return () => clearInterval(interval)
  }, [countdown])

  const resetCountdown = useCallback(() => {
    setCountdown(initialCount)
  }, [initialCount])

  return { countdown, resetCountdown }
}
