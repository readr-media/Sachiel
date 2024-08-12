'use client'

import { usePathname } from 'next/navigation'

import Footer from '@/app/_components/footer'
import Header from '@/app/_components/header'
import Nav from '@/app/_components/nav'

export default function PointLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHeader = pathname.split('/')[2] !== 'sponsorship'

  return (
    <>
      {/* fixed header */}
      <div className={`${isHeader ? 'block' : 'hidden sm:block'}`}>
        <Header />
      </div>
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div
        className="primary-container bg-white sm:bg-multi-layer-light"
        style={{
          paddingTop: isHeader ? undefined : '0px',
        }}
      >
        {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
        <div className="flex grow flex-col">
          <div className="flex grow flex-col">{children}</div>
        </div>
        {/* footer after main content */}
        <div className="hidden sm:block">
          <Footer />
        </div>
      </div>
      {/* fixed nav, mobile on the bottom, otherwise on the left side */}
      <Nav />
    </>
  )
}
