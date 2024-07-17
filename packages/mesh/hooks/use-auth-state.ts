import { useEffect, useState } from 'react'

import { getCurrentUser } from '@/app/actions/auth'

type CurrentUserType = Awaited<ReturnType<typeof getCurrentUser>>

export default function useAuthState() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<CurrentUserType>()

  useEffect(() => {
    const authState = async () => {
      const user = await getCurrentUser()
      if (user) {
        setIsLogin(true)
        setCurrentUser(user)
      } else {
        setIsLogin(false)
        setCurrentUser(undefined)
      }
    }

    authState()
  }, [])

  return { isLogin, currentUser }
}
