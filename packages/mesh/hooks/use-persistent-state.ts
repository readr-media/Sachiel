import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

function usePersistentState<T>(
  key: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialState
    }
    try {
      const storageValue = window.localStorage.getItem(key)
      return storageValue ? JSON.parse(storageValue) : initialState
    } catch (error) {
      console.error(error)
      return initialState
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.error(error)
    }
  }, [key, state])

  return [state, setState]
}

export default usePersistentState
