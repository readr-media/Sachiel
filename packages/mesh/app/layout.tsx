import '@/styles/global.css'

import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

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
    <html lang="zh-Hant" className={twMerge('h-full', notoSans.className)}>
      <body className="h-full pt-15 pb-16 sm:pl-32 sm:pt-16 sm:pb-0 md:pl-[220px] xl:pl-[calc((100vw-1440px)/2+320px)]">
        <header className="fixed top-0 left-0 h-15 w-full border sm:h-16">
          {/* nested header to maintain the max width for screen width larger than 1440 */}
          <div className="mx-auto h-full max-w-[1440px]">這是 header</div>
        </header>
        <main className="min-h-[calc(100%-641px)] w-full border sm:min-h-[calc(100%-317px)]">
          {/* nested main to maintain the max width for screen width larger than 1440 */}
          <div className="mr-auto max-w-[1220px]">{children}</div>
        </main>
        {/*  */}
        <footer className="h-[641px] border sm:h-[317px]">
          {/* nested footer to maintain the max width for screen width larger than 1440 */}
          <div className="mr-auto h-full max-w-[1220px]">這是 footer</div>
        </footer>
        {/* fixed left nav shown on tablet, desktop size */}
        <nav className="fixed left-0 top-16 hidden h-[calc(100%-64px)] w-32 border sm:block md:w-[220px] xl:w-[calc((100vw-1440px)/2+320px)] ">
          {/* nested nav bar to maintain the max width for screen width larger than 1440 */}
          <div className="absolute top-0 right-0 h-full w-full xl:max-w-[320px]">
            左側 navbar, 只在平板以上尺寸顯示
          </div>
        </nav>
        {/* fixed bottom nav bar shown on mobile only */}
        <nav className="fixed bottom-0 left-0 h-16 w-full border sm:hidden">
          <div>置底 nav bar, 只在手機尺寸顯示</div>
        </nav>
      </body>
    </html>
  )
}
