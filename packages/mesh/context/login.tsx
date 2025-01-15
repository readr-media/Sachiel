import type { Dispatch, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

export const LoginState = {
  Entry: 'entry',
  Email: 'email',
  EmailConfirmation: 'email-confirmation',
  TermsConfirmation: 'terms-confirmation',
  SetName: 'set-name',
  SetCategory: 'set-category',
  SetFollowing: 'set-following',
  SetWallet: 'set-wallet',
} as const

export type LoginStepsKey = typeof LoginState[keyof typeof LoginState]

export type UserFormData = {
  email: string
  name: string
  interests: string[]
  followings: string[]
  code: {
    id: string
    code: string
  }
}

type LoginContextType = {
  step: LoginStepsKey
  formData: UserFormData
  cachedEmail: string
  setStep: Dispatch<SetStateAction<LoginStepsKey>>
  setFormData: Dispatch<SetStateAction<UserFormData>>
  setCachedEmail: Dispatch<SetStateAction<string>>
}

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<LoginStepsKey>(LoginState.Entry)
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    name: '',
    interests: [],
    followings: [],
    code: {
      id: '',
      code: '',
    },
  })
  const [cachedEmail, setCachedEmail] = useState('')

  return (
    <LoginContext.Provider
      value={{
        step,
        formData,
        cachedEmail,
        setStep,
        setFormData,
        setCachedEmail,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
)

export function useLogin() {
  const context = useContext(LoginContext)
  if (context === undefined) {
    throw new Error('LoginProvider Error')
  }
  return context
}
