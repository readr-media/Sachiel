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
      <body className="min-h-screen">
        {/* fixed header */}
        <header className="fixed top-0 left-0 right-0 h-[theme(height.header.default)] border-b bg-white sm:h-[theme(height.header.sm)]">
          {/* nested header to maintain the max width for screen width larger than 1440 */}
          <div className="mx-auto h-full max-w-[theme(width.maxContent)]">
            這是 header
          </div>
        </header>
        {/* block for non-fixed content, set padding for fixed blocks */}
        <div className="flex min-h-screen flex-col bg-gray-50 pb-[theme(height.nav.default)] pt-[theme(height.header.default)]  sm:pb-0 sm:pt-[theme(height.header.sm)] sm:pl-[theme(width.nav.sm)] md:pl-[theme(width.nav.md)] xl:pl-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))]">
          {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
          <div className="grow xl:max-w-[theme(width.maxMain)]">{children}</div>
          {/* footer after main content */}
          <footer className="h-[theme(height.footer.default)] border-t bg-white sm:h-[theme(height.footer.sm)]">
            {/* nested footer to maintain the max width for screen width larger than 1440 */}
            <div className="mr-auto h-full max-w-[theme(width.maxMain)]">
              這是 footer
            </div>
          </footer>
        </div>
        {/* fixed left nav shown on tablet, desktop size */}
        <nav className="fixed left-0 top-16 bottom-0 hidden w-[theme(width.nav.sm)] border-r bg-white sm:flex sm:justify-end md:w-[theme(width.nav.md)] xl:w-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))] ">
          {/* nested nav bar to maintain the max width for screen width larger than 1440 */}
          <div className="grow xl:max-w-[theme(width.nav.xl)]">
            左側 navbar, 只在平板以上尺寸顯示
          </div>
        </nav>
        {/* fixed bottom nav bar shown on mobile only */}
        <nav className="fixed bottom-0 left-0 right-0 h-[theme(height.nav.default)] border-t bg-white sm:hidden">
          <div>置底 nav bar, 只在手機尺寸顯示</div>
        </nav>
      </body>
    </html>
  )
}
