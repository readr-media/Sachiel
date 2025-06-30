import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enUS from './locales/en-US.json'
import zhTW from './locales/zh-TW.json'

const resources = {
  'zh-TW': {
    translation: zhTW,
  },
  'en-US': {
    translation: enUS,
  },
}

// 偵測瀏覽器語言
const detectBrowserLanguage = () => {
  if (typeof window === 'undefined') return 'zh-TW' // SSR fallback

  const browserLang = navigator.language || navigator.languages?.[0] || 'zh-TW'

  if (browserLang.startsWith('zh')) {
    return 'zh-TW'
  }

  if (browserLang.startsWith('en')) {
    return 'en-US'
  }

  return 'zh-TW'
}

i18n.use(initReactI18next).init({
  resources,
  lng: detectBrowserLanguage(),
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
