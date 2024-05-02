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
      <body className="min-h-screen pt-15 pb-16 sm:pl-[theme(width.nav.sm)] sm:pt-16 sm:pb-0 md:pl-[theme(width.nav.md)] xl:pl-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))]">
        <header className="fixed top-0 left-0 h-[theme(height.header.default)] w-full border sm:h-[theme(height.header.sm)]">
          {/* nested header to maintain the max width for screen width larger than 1440 */}
          <div className="mx-auto h-full max-w-[theme(width.maxContent)]">
            這是 header
          </div>
        </header>
        <main className="min-h-[calc(100dvh-theme(height.footer.default)-theme(height.header.default)-theme(height.nav.default))] w-full border sm:min-h-[calc(100dvh-theme(height.footer.sm)-theme(height.header.sm))]">
          {/* nested main to maintain the max width for screen width larger than 1440 */}
          <div className="mr-auto max-w-[theme(width.maxMain)]">{children}</div>
        </main>
        {/*  */}
        <footer className="h-[theme(height.footer.default)] border sm:h-[theme(height.footer.sm)]">
          {/* nested footer to maintain the max width for screen width larger than 1440 */}
          <div className="mr-auto h-full max-w-[theme(width.maxMain)]">
            這是 footer
          </div>
        </footer>
        {/* fixed left nav shown on tablet, desktop size */}
        <nav className="fixed left-0 top-16 hidden h-[calc(100%-theme(height.header.sm))] w-[theme(width.nav.sm)] border sm:block md:w-[theme(width.nav.md)] xl:w-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))] ">
          {/* nested nav bar to maintain the max width for screen width larger than 1440 */}
          <div className="absolute top-0 right-0 h-full w-full xl:max-w-[theme(width.nav.xl)]">
            左側 navbar, 只在平板以上尺寸顯示
          </div>
        </nav>
        {/* fixed bottom nav bar shown on mobile only */}
        <nav className="fixed bottom-0 left-0 h-[theme(height.nav.default)] w-full border sm:hidden">
          <div>置底 nav bar, 只在手機尺寸顯示</div>
        </nav>
      </body>
    </html>
  )
}
