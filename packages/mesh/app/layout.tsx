import '@/styles/global.css'

import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Mesh',
}

const notoSans = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
