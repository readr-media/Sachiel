import '@/styles/global.css'

import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'

import AdManagerScript from '@/components/ad-manager-script'
import AdsenseScript from '@/components/adsense-script'
import I18nProvider from '@/components/i18n-provider'
import MisoAiScript from '@/components/miso-ai-script'
import UserBehaviorLogger from '@/components/user-behavior-logger'
import { GTM_ID } from '@/constants/config'
import { PickModalProvider } from '@/context/pick-modal'
import { PickersModalProvider } from '@/context/pickers-modal'
import { ToastProvider } from '@/context/toast'
import { UserProvider } from '@/context/user'
import { getSiteMedadata } from '@/utils/site-meta'

import RootLayoutWrapper from './_components/root-layout-wrapper'
import { getCurrentUser } from './actions/auth'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Others.meta')
  return getSiteMedadata(t)
}

const notoSans = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()

  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} className={notoSans.className}>
      <GoogleTagManager gtmId={GTM_ID} />
      <AdsenseScript />
      <AdManagerScript />
      <MisoAiScript />
      <body>
        <NextIntlClientProvider messages={messages}>
          <I18nProvider>
            <UserProvider user={user}>
              <ToastProvider>
                <PickModalProvider>
                  <PickersModalProvider>
                    <RootLayoutWrapper>
                      <UserBehaviorLogger />
                      {children}
                    </RootLayoutWrapper>
                  </PickersModalProvider>
                </PickModalProvider>
              </ToastProvider>
            </UserProvider>
          </I18nProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
