/* eslint-disable filename-rules/match */
'use client'
import '@/i18n/index'

import type { ReactNode } from 'react'

export default function I18nProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
