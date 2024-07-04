'use client'

import { LoginProvider } from '@/context/login'

import LoginSteps from './_components/login-steps'

export default function Page() {
  return (
    <LoginProvider>
      <LoginSteps />
    </LoginProvider>
  )
}
