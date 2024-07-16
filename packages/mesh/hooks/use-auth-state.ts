import { useEffect, useState } from 'react'

import { getCurrentUser } from '@/app/actions/auth'

export default function useAuthState() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<{
    memberId: string
    idToken: string
  } | null>()

  useEffect(() => {
    const authState = async () => {
      const user = await getCurrentUser()
      if (user) {
        setIsLogin(true)
        setCurrentUser(user)
      } else {
        setIsLogin(false)
        setCurrentUser(null)
      }
    }

    authState()
  }, [])

  return { isLogin, currentUser }
}
