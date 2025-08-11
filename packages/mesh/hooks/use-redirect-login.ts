'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { useUser } from '@/context/user'
import { getLoginUrl } from '@/utils/get-url'

export const loginRedirectPathKey = 'login-redirect'

export default function useRedirectLogin() {
  const { user } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const detectIfShouldRedirectToLogin = useCallback(() => {
    if (!user.memberId) {
      localStorage.setItem(loginRedirectPathKey, pathname)
      // Extract language from pathname (e.g., /zh-TW/page -> zh-TW)
      const lng = pathname.split('/')[1] || 'zh-TW'
      router.push(getLoginUrl(lng))
      return true
    }
    return false
  }, [pathname, router, user.memberId])

  return { detectIfShouldRedirectToLogin }
}
