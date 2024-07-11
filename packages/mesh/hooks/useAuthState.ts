import { useEffect, useState } from 'react'

import { auth } from '@/firebase/client'

export default function useAuthState() {
  const [isLogin, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return { isLogin }
}
