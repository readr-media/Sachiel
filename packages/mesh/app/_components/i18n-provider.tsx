'use client'

import { useEffect } from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    lng: 'zh-TW',
    fallbackLng: 'zh-TW',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      'zh-TW': {
        translation: {
          // 在这里添加翻译
        },
      },
    },
  })

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // 确保 i18n 在客户端初始化
    if (!i18n.isInitialized) {
      i18n.init()
    }
  }, [])

  return <>{children}</>
} 