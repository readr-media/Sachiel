'use client'
import { useMemo } from 'react'

import { useUser } from '@/context/user'

export default function useUserPayload() {
  const { user } = useUser()
  const memberId = user.memberId
  const email = user.email
  const firebaseId = user.firebaseId

  return useMemo(() => {
    return {
      logInStatus: memberId ? true : false,
      memberId,
      email,
      firebaseId,
    }
  }, [memberId, email, firebaseId])
}
