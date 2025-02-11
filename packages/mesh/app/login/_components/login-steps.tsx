import { useRouter } from 'next/navigation'
import { createElement, useEffect } from 'react'

import Spinner from '@/components/spinner'
import { type LoginStepsKey, LoginState, useLogin } from '@/context/login'
import useHandleSignIn from '@/hooks/use-handle-sign-in'
import { loginRedirectPathKey } from '@/hooks/use-redirect-login'

import LoginEmail from './login-email'
import LoginEmailConfirmation from './login-email-confirmation'
import LoginEntry from './login-entry'
import LoginSetCategory from './login-set-category'
import LoginSetFollowing from './login-set-following'
import LoginSetName from './login-set-name'
import LoginSetWallet from './login-set-wallet'
import LoginStepsTitle from './login-steps-title'
import LoginTermsConfirmation from './login-terms-confirmation'

const loginStepComponents: Record<LoginStepsKey, React.FC> = {
  [LoginState.Entry]: LoginEntry,
  [LoginState.Email]: LoginEmail,
  [LoginState.TermsConfirmation]: LoginTermsConfirmation,
  [LoginState.EmailConfirmation]: LoginEmailConfirmation,
  [LoginState.SetName]: LoginSetName,
  [LoginState.SetCategory]: LoginSetCategory,
  [LoginState.SetFollowing]: LoginSetFollowing,
  [LoginState.SetWallet]: LoginSetWallet,
}

export default function LoginSteps() {
  const router = useRouter()
  const { step, setStep } = useLogin()
  const { authStatus } = useHandleSignIn()

  useEffect(() => {
    switch (authStatus) {
      case 'proceed':
        setStep(LoginState.TermsConfirmation)
        break
      case 'redirect': {
        const redirectRoute = localStorage.getItem(loginRedirectPathKey) ?? '/'
        localStorage.removeItem(loginRedirectPathKey)
        router.push(redirectRoute)
        break
      }
      default:
        break
    }
  }, [authStatus, router, setStep])

  if (authStatus === 'loading' || authStatus === 'redirect') {
    return (
      <div className="flex size-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <div className="flex h-15 w-full flex-row items-center border-b sm:hidden">
        <LoginStepsTitle />
      </div>
      <div className="flex size-full justify-center overflow-auto sm:items-center">
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
