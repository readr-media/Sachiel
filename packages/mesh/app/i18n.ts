'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    lng: 'zh-TW', // 默认语言
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

export default i18n 