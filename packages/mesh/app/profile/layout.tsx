import '@/styles/global.css'

import Nav from '@/app/_components/nav'
import Icon from '@/components/icon'

import Footer from '../_components/footer'
import Header from '../_components/header'

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex grow flex-col">
      <header className="absolute left-0 right-0 top-0 z-header h-[60px] border-b bg-white sm:hidden">
        <div className="flex h-full w-full items-center justify-center">
          <Icon
            size={{ width: 176, height: 44 }}
            iconName="icon-readr-logoA-desktop"
          />
        </div>
      </header>
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="flex min-h-screen flex-col bg-white pb-[theme(height.nav.default)] pt-[theme(height.header.default)] sm:pb-0 sm:pl-[theme(width.nav.sm)] sm:pt-[theme(height.header.sm)] md:pl-[theme(width.nav.md)] xl:pl-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))]">
        <div className="flex grow flex-col">{children}</div>
        <div className="hidden sm:block">
          <Footer />
        </div>
      </div>
      <Nav />
    </div>
  )
}
