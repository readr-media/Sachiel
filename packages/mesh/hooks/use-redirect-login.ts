'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { useUser } from '@/context/user'

export const loginRedirectPathKey = 'login-redirect'

export default function useRedirectLogin() {
  const { user } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const detectIfShouldRedirectToLogin = useCallback(() => {
    if (!user.memberId) {
      localStorage.setItem(loginRedirectPathKey, pathname)
      router.push('/login')
      return true
    }
    return false
  }, [pathname, router, user.memberId])

  return { detectIfShouldRedirectToLogin }
}
