'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import LoginProcess from './_components/login-process'

export default function Page() {
  return (
    <LoginProvider>
      <LoginProcess />
    </LoginProvider>
  )
}

export type LoginProcess =
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
  process: LoginProcess
  formData: UserFormData
  setProcess: Dispatch<SetStateAction<LoginProcess>>
  setFormData: Dispatch<SetStateAction<UserFormData>>
}

const LoginContext = createContext<LoginContextType | undefined>(undefined)

function LoginProvider({ children }: { children: React.ReactNode }) {
  const [process, setProcess] = useState<LoginProcess>('entry')
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    name: '',
    interests: [],
    followings: [],
  })

  return (
    <LoginContext.Provider
      value={{ process, formData, setProcess, setFormData }}
    >
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
