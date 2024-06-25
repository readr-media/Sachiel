'use client'

import { useState } from 'react'

import Icon from '@/components/icon'

import LoginEmail from './_components/login-email'
import LoginEntry from './_components/login-entry'
import LoginSetName from './_components/login-set-name'

export type LoginProcess =
  | 'entry'
  | 'email'
  | 'email-confirm'
  | 'set-name'
  | 'set-category'
  | 'set-following'

export type UserFormData = { email: string; name: string; interests: string[] }

export default function Page() {
  const [process, setProcess] = useState<LoginProcess>('entry')
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    name: '',
    interests: [],
  })

  const handleLoginProcess = (step: LoginProcess) => {
    setProcess(step)
  }

  const processComponent: Record<string, JSX.Element> = {
    entry: <LoginEntry handleLoginProcess={handleLoginProcess} />,
    email: (
      <LoginEmail
        handleLoginProcess={handleLoginProcess}
        setFormData={setFormData}
      />
    ),
    'set-name': (
      <LoginSetName
        handleLoginProcess={handleLoginProcess}
        setFormData={setFormData}
      />
    ),
  }

  console.log({ process })
  console.log(formData)

  return (
    <>
      <header className="absolute left-0 right-0 top-0 z-header hidden h-[60px] border-b bg-white sm:block">
        <div className="flex h-full w-full items-center justify-center">
          <Icon size={{ width: 100, height: 44 }} iconName="icon-readr-logo" />
        </div>
      </header>
      {processComponent[process]}
    </>
  )
}
