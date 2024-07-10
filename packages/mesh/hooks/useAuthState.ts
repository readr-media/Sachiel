import { useEffect, useState } from 'react'

import { auth } from '@/firebase/client'

export default function useAuthState() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [firebaseId, setFirebaseId] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsLogin(true)
        setFirebaseId(authUser.uid)
      } else {
        setIsLogin(false)
        setFirebaseId('')
      }
    })

    return () => unsubscribe()
  }, [])

  return { isLogin, firebaseId }
}
