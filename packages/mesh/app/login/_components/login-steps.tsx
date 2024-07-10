import {
  browserLocalPersistence,
  isSignInWithEmailLink,
  setPersistence,
  signInWithEmailLink,
} from 'firebase/auth'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter, useSearchParams } from 'next/navigation'
import { createElement, useEffect } from 'react'

import { clearTokenCookie, validateIdToken } from '@/app/actions/auth'
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
  const searchParams = useSearchParams()
  const { isLogin } = useAuthState()

  useEffect(() => {
    const handleEmailLinkSignIn = async () => {
      let email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        // email = window.prompt('Please provide your email for confirmation')
        router.push('/login')
        return
      }
      try {
        await setPersistence(auth, browserLocalPersistence)
        const res = await signInWithEmailLink(auth, email, window.location.href)
        const idToken = await res.user.getIdToken()
        // const { emailVerified, uid } = res.user
        // const apiKey = searchParams.get('apiKey')
        // const mode = searchParams.get('mode')
        // const oobCode = searchParams.get('oobCode')
        // const continueUrl = searchParams.get('continueUrl')
        // const lang = searchParams.get('lang') || 'en'

        window.localStorage.removeItem('emailForSignIn')
        if (idToken) {
          // console.log(idToken)
          const response = await validateIdToken(idToken)
          if (response) {
            setStep('set-name')
          } else {
            router.push('/login')
          }
        }
      } catch (error) {
        console.error('EmailLinkSignIn Error:', error)
        router.push('/login')
      }
    }

    const handleOAuthSignIn = async () => {
      console.log('oath')
      try {
        const idToken = await auth.currentUser?.getIdToken()
        console.log({ idToken })
        if (idToken) {
          const response = await handleToken(idToken, router)
          if (response.ok) {
            console.log('login-success: redirect to url')
            router.push('/media')
          }
        }
      } catch (error) {
        console.error('OAuthSignIn Error:', error)
        router.push('/login')
      }
    }

    if (isLogin) {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        handleEmailLinkSignIn()
      } else {
        handleOAuthSignIn()
      }
    }
  }, [isLogin, router, searchParams, setStep])

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

async function handleToken(token: string, router: AppRouterInstance) {
  const response = await validateIdToken(token)
  if (!response.ok && response.status === 'refresh') {
    const newToken = await refreshIdToken()
    if (newToken) {
      const newResponse = await validateIdToken(newToken)
      if (!newResponse.ok) {
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
  } else if (!response.ok) {
    router.push('/login')
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
