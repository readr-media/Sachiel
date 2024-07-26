import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export const LoginState = {
  Entry: 'entry',
  Email: 'email',
  EmailConfirmation: 'email-confirmation',
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
}

type LoginContextType = {
  step: LoginStepsKey
  formData: UserFormData
  setStep: Dispatch<SetStateAction<LoginStepsKey>>
  setFormData: Dispatch<SetStateAction<UserFormData>>
  lastUsedEmail: string
  setLastUsedEmail: Dispatch<SetStateAction<string>>
}

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<LoginStepsKey>(LoginState.Entry)
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    name: '',
    interests: [],
    followings: [],
  })
  const [lastUsedEmail, setLastUsedEmail] = useState('')

  return (
    <LoginContext.Provider
      value={{
        step,
        formData,
        setStep,
        setFormData,
        lastUsedEmail,
        setLastUsedEmail,
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
