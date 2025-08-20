/* eslint-disable filename-rules/match */
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { defaultNS, fallbackLng, languages } from '@/app/i18n/settings'

const runsOnServerSide = typeof window === 'undefined'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      if (namespace.includes('/')) {
        return import(`./locales/${namespace}/${language}.json`)
      }
      return import(`./locales/${language}.json`)
    })
  )
  .init({
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng: undefined, // let detect the language on client side
    fallbackNS: defaultNS,
    defaultNS,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  })

/**
 * The default export of the i18next instance, which provides internationalization (i18n) functionality.
 * Use this instance to manage translations, language detection, and localization features in your application.
 *
 * @see https://www.i18next.com/
 */
export default i18next
