import type { UserCredential } from 'firebase/auth'
import {
  browserLocalPersistence,
  getRedirectResult,
  isSignInWithEmailLink,
  setPersistence,
  signInWithEmailLink,
} from 'firebase/auth'
import { useCallback, useState } from 'react'

import {
  getAccessToken,
  getCurrentUser,
  validateIdToken,
} from '@/app/actions/auth'
import { useLogin } from '@/context/login'
import { useUser } from '@/context/user'
import { auth } from '@/firebase/client'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function useHandleSignIn() {
  const { setFormData } = useLogin()
  const { setUser } = useUser()
  const [status, setStatus] = useState<Status>('idle')

  const handleIdToken = useCallback(
    async (
      idToken: string,
      userEmail: string | null
    ): Promise<{
      result: 'sign-up' | 'logged-in'
    }> => {
      await getAccessToken(idToken)
      const user = await getCurrentUser()

      if (!user) {
        setFormData((prev) => ({
          ...prev,
          email: userEmail ?? '',
        }))
        return { result: 'sign-up' }
      } else {
        setUser(user)
        return { result: 'logged-in' }
      }
    },
    [setFormData, setUser]
  )

  const handleOAuthSignIn = useCallback(
    async (result: UserCredential) => {
      try {
        const idToken = await result.user.getIdToken()
        const userEmail = await result.user.email
        const { status } = await validateIdToken(idToken)
        if (status !== 'verified') return
        return await handleIdToken(idToken, userEmail)
      } catch (error) {
        console.error('OAuthSignIn Error:', error)
      }
    },
    [handleIdToken]
  )

  const handleEmailLinkSignIn = useCallback(async () => {
    const email = window.localStorage.getItem('emailForSignIn')
    if (!email) return
    try {
      await setPersistence(auth, browserLocalPersistence)
      const res = await signInWithEmailLink(auth, email, window.location.href)
      const idToken = await res.user.getIdToken()
      const userEmail = await res.user.email
      window.localStorage.removeItem('emailForSignIn')

      const { status } = await validateIdToken(idToken)
      if (status !== 'verified') return
      return await handleIdToken(idToken, userEmail)
    } catch (error) {
      console.error('EmailLinkSignIn Error:', error)
    }
  }, [handleIdToken])

  const handleLoggedInFirebase = useCallback(async () => {
    if (!auth.currentUser) return
    let idToken = ''
    idToken = await auth.currentUser.getIdToken()
    const { status } = await validateIdToken(idToken)
    if (status === 'expired') {
      idToken = await auth.currentUser.getIdToken(true)
    }
    const userEmail = await auth.currentUser.email
    return await handleIdToken(idToken, userEmail)
  }, [handleIdToken])

  const handleSignIn = useCallback(async () => {
    setStatus('loading')
    try {
      const redirectResult = await getRedirectResult(auth)
      if (redirectResult) {
        return await handleOAuthSignIn(redirectResult)
      } else if (isSignInWithEmailLink(auth, window.location.href)) {
        return await handleEmailLinkSignIn()
      } else {
        return await handleLoggedInFirebase()
      }
    } catch (error) {
      setStatus('error')
      console.error('SignIn Error:', error)
    } finally {
      setStatus('success')
    }
  }, [handleEmailLinkSignIn, handleLoggedInFirebase, handleOAuthSignIn])

  return { handleSignIn, status }
}
