/* eslint-disable filename-rules/match */
'use client'
import '@/i18n/index'

import { type ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useUser } from '@/context/user'

export default function I18nProvider({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (user.memberId && user.language !== i18n.language) {
      i18n.changeLanguage(user.language)
    }
  }, [i18n, user])

  return <>{children}</>
}
