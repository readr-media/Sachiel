import { useEffect, useState } from 'react'

import { getCurrentUser } from '@/app/actions/auth'

type CurrentUserType = Awaited<ReturnType<typeof getCurrentUser>>

export default function useAuthState() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const authState = async () => {
      setIsLoading(true)
      const user = await getCurrentUser()
      if (user) {
        setIsLogin(true)
        setCurrentUser(user)
      } else {
        setIsLogin(false)
        setCurrentUser(undefined)
      }
      setIsLoading(false)
    }

    authState()
  }, [])

  return { isLogin, currentUser, isLoading }
}
