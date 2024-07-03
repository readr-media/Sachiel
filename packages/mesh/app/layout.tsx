import '@/styles/global.css'

import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

import Body from './_components/body'
import Footer from './_components/footer'
import Header from './_components/header'
import Nav from './_components/nav'

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
      <Body>
        {/* fixed header */}
        <Header />
        {/* block for non-fixed content, set padding for fixed blocks */}
        <div className="flex min-h-screen flex-col pb-[theme(height.nav.default)] pt-[theme(height.header.default)]  sm:pb-0 sm:pl-[theme(width.nav.sm)] sm:pt-[theme(height.header.sm)] md:pl-[theme(width.nav.md)] xl:pl-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))]">
          {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
          <div className="flex grow">
            <div className="flex grow flex-col xl:max-w-[theme(width.maxMain)]">
              {children}
            </div>
          </div>
          {/* footer after main content */}
          <Footer />
        </div>
        {/* fixed nav, mobile on the bottom, otherwise on the left side */}
        <Nav />
      </Body>
    </html>
  )
}
