import '@/styles/global.css'

import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

import { PickModalProvider } from '@/context/pick-modal'
import { ToastProvider } from '@/context/toast'
import { UserProvider } from '@/context/user'

import RootLayoutWrapper from './_components/root-layout-wrapper'
import { getCurrentUser } from './actions/auth'

export const metadata: Metadata = {
  title: 'Mesh',
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
      <UserProvider user={user}>
        <ToastProvider>
          <PickModalProvider>
            <RootLayoutWrapper>{children}</RootLayoutWrapper>
          </PickModalProvider>
        </ToastProvider>
      </UserProvider>
    </html>
  )
}
