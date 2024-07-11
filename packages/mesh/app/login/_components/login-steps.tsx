import {
  browserLocalPersistence,
  isSignInWithEmailLink,
  setPersistence,
  signInWithEmailLink,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { createElement, useEffect } from 'react'

import {
  clearTokenCookie,
  getCurrentUserMemberId,
  validateIdToken,
} from '@/app/actions/auth'
import { type LoginStepsKey, LoginState, useLogin } from '@/context/login'
import { auth } from '@/firebase/client'
import useAuthState from '@/hooks/useAuthState'

import LoginEmail from './login-email'
import LoginEmailConfirmation from './login-email-confirmation'
import LoginEntry from './login-entry'
import LoginSetCategory from './login-set-category'
import LoginSetFollowing from './login-set-following'
import LoginSetName from './login-set-name'
import LoginSetWallet from './login-set-wallet'
import LoginStepsTitle from './login-steps-title'

const loginStepComponents: Record<LoginStepsKey, React.FC> = {
  [LoginState.Entry]: LoginEntry,
  [LoginState.Email]: LoginEmail,
  [LoginState.EmailConfirmation]: LoginEmailConfirmation,
  [LoginState.SetName]: LoginSetName,
  [LoginState.SetCategory]: LoginSetCategory,
  [LoginState.SetFollowing]: LoginSetFollowing,
  [LoginState.SetWallet]: LoginSetWallet,
}

export default function LoginSteps() {
  const { step, setStep } = useLogin()
  const router = useRouter()
  const { idToken } = useAuthState()

  useEffect(() => {
    const handleEmailLinkSignIn = async () => {
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
    }

    const handleOAuthSignIn = async () => {
      try {
        if (idToken) {
          await handleAfterSignInRedirect(idToken)
        }
      } catch (error) {
        console.error('OAuthSignIn Error:', error)
        router.push('/login')
      }
    }

    const handleAfterSignInRedirect = async (idToken: string) => {
      const response = await handleToken(idToken)
      if (!response.ok) {
        router.push('/login')
        return
      }

      const memberId = await getCurrentUserMemberId()
      if (memberId) {
        router.push('/media')
      } else {
        setStep('set-name')
      }
    }

    const handleSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        await handleEmailLinkSignIn()
      } else {
        await handleOAuthSignIn()
      }
    }
    handleSignIn()
  }, [idToken, router, setStep])

  return (
    <>
      <div className="flex h-15 w-full flex-row items-center border-b sm:hidden">
        <LoginStepsTitle />
      </div>
      <div className="flex h-full w-full justify-center overflow-auto sm:items-center">
        <div className="sm:w-[480px] sm:rounded-md sm:bg-white sm:drop-shadow">
          {step !== 'entry' && (
            <div className="hidden h-15 w-full flex-row items-center border-b sm:flex">
              <LoginStepsTitle />
            </div>
          )}
          {createElement(loginStepComponents[step])}
        </div>
      </div>
    </>
  )
}

async function handleToken(
  token: string
): Promise<ReturnType<typeof validateIdToken>> {
  const response = await validateIdToken(token)
  if (response.ok) return response

  if (response.status === 'refresh') {
    const newToken = await refreshIdToken()
    if (newToken) {
      return await validateIdToken(newToken)
    } else {
      return { ok: false, status: 'error', message: 'refresh token Error' }
    }
  }
  return response
}

async function refreshIdToken() {
  const user = auth.currentUser
  if (user) {
    try {
      const newToken = await user.getIdToken(true)
      return newToken
    } catch (error) {
      console.error('Error refreshing token:', error)
      return null
    }
  }
  return null
}

export async function logout() {
  try {
    await auth.signOut()
    await clearTokenCookie()
  } catch (error) {
    console.error('Logout Error', error)
  }
}
