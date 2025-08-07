'use client'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook to prevent useTranslation causing hydration error
 * Use serverT to show fallback string and useTranslation in client side after useEffect
 */
export function useCustomTranslation() {
  const [isClient, setIsClient] = useState(false)
  // @ts-expect-error: hook typescript
  const { t: clientT, i18n, ...rest } = useTranslation<string, string>()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // only deal with default value or interpolated value like `Update at {{time}}`
  const serverT = useCallback(
    (_key: string, defaultValue: string, options?: object) => {
      if (options) {
        let interpolatedValue = defaultValue
        Object.entries(options).forEach(([varKey, varValue]) => {
          const regex = new RegExp(`{{${varKey}}}`, 'g')
          interpolatedValue = interpolatedValue.replace(regex, String(varValue))
        })
        return interpolatedValue
      }
      return defaultValue
    },
    []
  )

  return { t: isClient ? clientT : serverT, i18n, ...rest }
}
