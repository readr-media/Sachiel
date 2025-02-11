import { type FirebaseError } from 'firebase/app'
import {
  browserLocalPersistence,
  getRedirectResult,
  isSignInWithEmailLink,
  setPersistence,
  signInWithEmailLink,
} from 'firebase/auth'
import { useCallback, useEffect, useState } from 'react'

import {
  getAccessToken,
  getCurrentUser,
  validateIdToken,
} from '@/app/actions/auth'
import { useLogin } from '@/context/login'
import { useUser } from '@/context/user'
import { auth } from '@/firebase/client'

type Status = 'idle' | 'loading' | 'proceed' | 'redirect' | 'error'

export default function useHandleSignIn() {
  const { setFormData } = useLogin()
  const { setUser } = useUser()
  const [authStatus, setAuthStatus] = useState<Status>('loading')

  const checkUserSession = useCallback(
    async (idToken: string, userEmail: string | null) => {
      await getAccessToken(idToken)
      const user = await getCurrentUser()

      if (!user) {
        setFormData((prev) => ({
          ...prev,
          email: userEmail ?? '',
        }))
        setAuthStatus('proceed')
      } else {
        setUser(user)
        setAuthStatus('redirect')
      }
    },
    [setFormData, setUser]
  )

  const handleSignInRedirect = useCallback(async () => {
    try {
      const credential = await getRedirectResult(auth)
      if (credential) {
        const idToken = await credential.user.getIdToken()
        const userEmail = credential.user.email
        const { status } = await validateIdToken(idToken)
        if (status === 'verified') {
          await checkUserSession(idToken, userEmail)
        }
      } else if (isSignInWithEmailLink(auth, window.location.href)) {
        const email = window.localStorage.getItem('emailForSignIn')
        if (email) {
          await setPersistence(auth, browserLocalPersistence)
          const credential = await signInWithEmailLink(
            auth,
            email,
            window.location.href
          )
          const idToken = await credential.user.getIdToken()
          const userEmail = credential.user.email
          const { status } = await validateIdToken(idToken)
          if (status === 'verified') {
            await checkUserSession(idToken, userEmail)
          }
          window.localStorage.removeItem('emailForSignIn')
        } else {
          console.error('email not found')
        }
      }
    } catch (err) {
      console.error(err)
    }
  }, [checkUserSession])

  const initializeAuthListener = useCallback(async () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthStatus('idle')
        return
      }

      try {
        const idTokenResult = await user.getIdTokenResult()
        const idToken = idTokenResult.token
        const { status } = await validateIdToken(idToken)
        if (status === 'verified') {
          await checkUserSession(idToken, user.email)
        }
      } catch (error) {
        const err = error as FirebaseError
        console.error(err)
        if (err.code === 'auth/user-token-expired') {
          await auth.signOut()
        }
      }
    })
    return unsubscribe
  }, [checkUserSession])

  useEffect(() => {
    const init = async () => {
      await auth.authStateReady()
      await handleSignInRedirect()
      const unsubscribe = await initializeAuthListener()
      return () => {
        unsubscribe()
      }
    }
    init()
  }, [handleSignInRedirect, initializeAuthListener])

  return { authStatus }
}
