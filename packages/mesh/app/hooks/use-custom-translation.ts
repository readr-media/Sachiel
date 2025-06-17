'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type TranslationFunction = (key: string, options?: any) => string

export function useCustomTranslation() {
  const { t, i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng)
    }

    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  const changeLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language)
    },
    [i18n]
  )

  return {
    t: t as TranslationFunction,
    currentLanguage,
    changeLanguage,
  }
} 