import { getRequestConfig } from 'next-intl/server'

// import { getCurrentUser } from '@/app/actions/auth'

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // TODO: handle lang require logic including getCurrentUser and lang queryString
  // const user = await getCurrentUser()
  const locale = 'zh-TW'

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
