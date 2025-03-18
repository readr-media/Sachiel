import { getRequestConfig } from 'next-intl/server'

import { getCurrentUser } from '@/app/actions/auth'

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const user = await getCurrentUser()
  const locale = user?.language ?? 'en_US'

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
