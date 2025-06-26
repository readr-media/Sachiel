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

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh-TW',
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
