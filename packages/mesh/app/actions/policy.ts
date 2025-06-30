'use server'
import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

// 獲取當前語言
function getCurrentLanguage(): string {
  // 在 server side，我們需要從 headers 或其他方式獲取語言
  // 這裡先使用預設值，實際實作可能需要從 cookies 或 headers 獲取
  return 'zh-TW'
}

async function fetchTermsOfService(language?: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const currentLang = language || getCurrentLanguage()

  // 根據語言構建檔案路徑
  const filePath =
    currentLang === 'en-US'
      ? `${STATIC_FILE_ENDPOINTS.termsOfService.replace('.html', '_en.html')}`
      : STATIC_FILE_ENDPOINTS.termsOfService

  let data = await fetchStatic<string>(
    filePath,
    undefined,
    globalLogFields,
    'Error occurs while fetching terms of service'
  )

  // 如果英文版本不存在，回退到中文版本
  if (!data && currentLang === 'en-US') {
    data = await fetchStatic<string>(
      STATIC_FILE_ENDPOINTS.termsOfService,
      undefined,
      globalLogFields,
      'Error occurs while fetching terms of service (fallback)'
    )
  }

  return data
}

async function fetchPrivacyPolicy(language?: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const currentLang = language || getCurrentLanguage()

  // 根據語言構建檔案路徑
  const filePath =
    currentLang === 'en-US'
      ? `${STATIC_FILE_ENDPOINTS.privacyPolicy.replace('.html', '_en.html')}`
      : STATIC_FILE_ENDPOINTS.privacyPolicy

  let data = await fetchStatic<string>(
    filePath,
    undefined,
    globalLogFields,
    'Error occurs while fetching privacy policy'
  )

  // 如果英文版本不存在，回退到中文版本
  if (!data && currentLang === 'en-US') {
    data = await fetchStatic<string>(
      STATIC_FILE_ENDPOINTS.privacyPolicy,
      undefined,
      globalLogFields,
      'Error occurs while fetching privacy policy (fallback)'
    )
  }

  return data
}

export { fetchPrivacyPolicy, fetchTermsOfService }
