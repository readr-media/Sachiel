'use client'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook to prevent useTranslation from causing hydration errors.
 * Use serverT to show fallback strings on the server, and useTranslation on the client after hydration.
 */
export function useCustomTranslation() {
  const [isClient, setIsClient] = useState(false)
  // @ts-expect-error: hook typescript
  const { t: clientT, i18n, ...rest } = useTranslation<string, string>()

  // Set isClient to true after client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handles only default values or interpolated values like `Update at {{time}}`
  const serverT = useCallback(
    (_key: string, defaultValue: string, options?: object): string => {
      if (options) {
        let interpolatedValue = defaultValue
        // Replace all interpolation variables in the format {{key}}
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

  // Wraps the t function to ensure type safety
  const wrappedT = useCallback(
    (key: string, defaultValue: string, options?: object): string => {
      if (isClient && clientT) {
        const result = clientT(key, defaultValue, options)
        return result ?? defaultValue
      }
      return serverT(key, defaultValue, options)
    },
    [isClient, clientT, serverT]
  )

  return { t: wrappedT, i18n, ...rest }
}
