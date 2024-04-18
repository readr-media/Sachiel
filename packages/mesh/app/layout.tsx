import '@/styles/normalize.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mesh',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  )
}
