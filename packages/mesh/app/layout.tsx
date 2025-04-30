import '@/styles/global.css'

import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

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
  return getSiteMedadata()
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

  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <GoogleTagManager gtmId={GTM_ID} />
      <AdsenseScript />
      <AdManagerScript />
      <MisoAiScript />
      <body>
        <UserProvider user={user}>
          <I18nProvider>
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
          </I18nProvider>
        </UserProvider>
      </body>
    </html>
  )
}
