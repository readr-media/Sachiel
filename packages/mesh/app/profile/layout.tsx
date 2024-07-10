'use client'
import '@/styles/global.css'

import { usePathname } from 'next/navigation'

import Nav from '@/app/_components/nav'
import Icon from '@/components/icon'
import { NO_NAV } from '@/constants/page-style'
import useWindowDimensions from '@/hooks/use-window-dimension'

import Footer from '../_components/footer'
import Header from '../_components/header'

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathName = usePathname()
  const { width } = useWindowDimensions()

  const hasNav = (pathName: string, width: number): boolean => {
    const hasTargetPath = NO_NAV.some((path) => pathName.endsWith(path))
    const isMobileWidth = width < 768

    return !hasTargetPath || !isMobileWidth
  }

  return (
    <div className="flex grow flex-col">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="primary-container py-0 sm:pt-[68px]">
        <div className="flex grow flex-col bg-multi-layer-light">
          {children}
        </div>
        <div className="hidden sm:block">
          <Footer />
        </div>
      </div>
      {hasNav(pathName, width) && <Nav />}
    </div>
  )
}
