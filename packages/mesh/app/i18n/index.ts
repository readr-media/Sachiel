'use server'

import { cookies } from 'next/headers'

import i18next from '@/i18n/i18next'

import { cookieName, fallbackLng } from './settings'

export async function getT(ns: string, options?: { keyPrefix?: string }) {
  const cookiesStore = cookies()
  const lng = cookiesStore.get(cookieName)?.value || fallbackLng
  if (lng && i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng)
  }
  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns)
  }
  return {
    // @ts-expect-error: i18next type complexity
    t: i18next.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options?.keyPrefix
    ),
    i18n: i18next,
  }
}
