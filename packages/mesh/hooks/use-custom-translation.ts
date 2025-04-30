import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook to prevent useTranslation causing hydration error
 * Use serverT to show fallback string and useTranslation in client side after useEffect
 */
export function useCustomTranslation() {
  const [isClient, setIsClient] = useState(false)

  const { t: clientT, i18n, ...rest } = useTranslation()

  // 在客户端渲染后更新状态
  useEffect(() => {
    setIsClient(true)
  }, [])

  // only deal with default value or interpolated value like `Update at {{time}}`
  const serverT = useCallback(
    (key: string, defaultValue: string, options?: object) => {
      if (options) {
        let interpolatedValue = defaultValue
        // 替换所有 {{key}} 格式的插值变量
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

  // 为了支持更多的函数签名和类型安全，返回的 t 函数类型与原始 TFunction 一致
  return { t: isClient ? clientT : serverT, i18n, ...rest }
}
