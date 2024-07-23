import {
  browserLocalPersistence,
  getRedirectResult,
  isSignInWithEmailLink,
  setPersistence,
  signInWithEmailLink,
  UserCredential,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { getCurrentUser, validateIdToken } from '@/app/actions/auth'
import { useLogin } from '@/context/login'
import { auth } from '@/firebase/client'

export default function useHandleSignIn() {
  const router = useRouter()
  const { setStep } = useLogin()

  const handleAfterSignInRedirect = useCallback(
    async (idToken: string) => {
      const { status } = await handleToken(idToken)
      if (status !== 'verified') {
        router.push('/login')
        return
      }

      const user = await getCurrentUser()
      if (user?.memberId) {
        router.push('/media')
      } else {
        setStep('set-name')
      }
    },
    [router, setStep]
  )

  const handleOAuthSignIn = useCallback(
    async (result: UserCredential) => {
      const idToken = await result.user.getIdToken()
      try {
        if (idToken) {
          await handleAfterSignInRedirect(idToken)
        }
      } catch (error) {
        console.error('OAuthSignIn Error:', error)
        router.push('/login')
      }
    },
    [handleAfterSignInRedirect, router]
  )

  const handleEmailLinkSignIn = useCallback(async () => {
    let email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      router.push('/login')
      return
    }
    try {
      await setPersistence(auth, browserLocalPersistence)
      const res = await signInWithEmailLink(auth, email, window.location.href)
      const idToken = await res.user.getIdToken()

      window.localStorage.removeItem('emailForSignIn')
      await handleAfterSignInRedirect(idToken)
    } catch (error) {
      console.error('EmailLinkSignIn Error:', error)
      router.push('/login')
    }
  }, [handleAfterSignInRedirect, router])

  const handleSignIn = useCallback(async () => {
    const redirectResult = await getRedirectResult(auth)
    if (redirectResult) {
      await handleOAuthSignIn(redirectResult)
    } else if (isSignInWithEmailLink(auth, window.location.href)) {
      await handleEmailLinkSignIn()
    }
  }, [handleEmailLinkSignIn, handleOAuthSignIn])

  return { handleSignIn }
}

async function handleToken(
  token: string
): Promise<ReturnType<typeof validateIdToken>> {
  const response = await validateIdToken(token)
  if (response.status === 'expired') {
    const newToken = await refreshIdToken()
    return newToken ? await validateIdToken(newToken) : { status: 'error' }
  }
  return response
}

async function refreshIdToken() {
  const user = auth.currentUser
  if (user) {
    try {
      return await user.getIdToken(true)
    } catch (error) {
      console.error('Error refreshing token:', error)
      return null
    }
  }
  return null
}
