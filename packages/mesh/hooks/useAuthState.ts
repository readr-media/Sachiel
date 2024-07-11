import { useEffect, useState } from 'react'

import { auth } from '@/firebase/client'

export default function useAuthState() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [idToken, setIdToken] = useState<string>('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const token = await authUser.getIdToken()
        setIsLogin(true)
        setIdToken(token)
      } else {
        setIsLogin(false)
        setIdToken('')
      }
    })

    return () => unsubscribe()
  }, [])

  return { isLogin, idToken }
}
