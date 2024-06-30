'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import LoginSteps from './_components/login-steps'

export default function Page() {
  return (
    <LoginProvider>
      <LoginSteps />
    </LoginProvider>
  )
}

export type LoginStepsKey =
  | 'entry'
  | 'email'
  | 'email-confirmation'
  | 'set-name'
  | 'set-category'
  | 'set-following'
  | 'set-wallet'

type UserFormData = {
  email: string
  name: string
  interests: string[]
  followings: string[]
}
type LoginContextType = {
  step: LoginStepsKey
  formData: UserFormData
  setStep: Dispatch<SetStateAction<LoginStepsKey>>
  setFormData: Dispatch<SetStateAction<UserFormData>>
}

const LoginContext = createContext<LoginContextType | undefined>(undefined)

function LoginProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<LoginStepsKey>('entry')
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    name: '',
    interests: [],
    followings: [],
  })

  return (
    <LoginContext.Provider value={{ step, formData, setStep, setFormData }}>
      {children}
    </LoginContext.Provider>
  )
}

export function useLogin() {
  const context = useContext(LoginContext)
  if (context === undefined) {
    throw new Error('LoginProvider Error')
  }
  return context
}
