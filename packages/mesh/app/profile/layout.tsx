'use client'
import '@/styles/global.css'

import { usePathname, useRouter } from 'next/navigation'

import Nav from '@/app/_components/nav'
import Icon from '@/components/icon'
import { FOLLOW_LIST_PATHS } from '@/constants/page-style'
import useWindowDimensions from '@/hooks/use-window-dimension'

import Footer from '../_components/footer'
import Header from '../_components/header'

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathName = usePathname()
  const pathNameList = pathName.split('/')
  // TODO: publisher now using items id will be number
  const userId = pathNameList.pop()
  const { width } = useWindowDimensions()
  const router = useRouter()
  const backToPreviousPage = () => {
    router.back()
  }
  const hasNav = (pathName: string, width: number): boolean => {
    const hasTargetPath = FOLLOW_LIST_PATHS.some((path) =>
      pathName.endsWith(path)
    )
    const isMobileWidth = width < 768

    return !hasTargetPath || !isMobileWidth
  }

  const hasHeader = (pathName: string): boolean => {
    // NOTE: in some path do not show the header
    const hasTargetPath = FOLLOW_LIST_PATHS.some((path) =>
      pathName.endsWith(path)
    )
    return !hasTargetPath
  }
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
      <div className="primary-container py-0 sm:pt-[68px]">
        {hasHeader(pathName) && (
          <div className="flex h-[theme(height.header.default)] sm:h-[theme(height.header.sm)]">
            <div className="grid grow grid-cols-3 items-center">
              <button
                type="button"
                className="ml-2 p-3"
                onClick={backToPreviousPage}
              >
                <Icon
                  iconName="icon-chevron-left"
                  size={{ width: 20, height: 20 }}
                />
              </button>
              <p className="list-title place-self-center">{userId}</p>
              <button
                type="button"
                className="mr-3 place-self-end self-center p-3"
                onClick={backToPreviousPage}
              >
                <Icon
                  iconName="icon-more-horiz"
                  size={{ width: 24, height: 24 }}
                />
              </button>
            </div>
          </div>
        )}
        <div className="flex grow flex-col bg-multi-layer-light">
          {children}
        </div>
        <div className="hidden sm:block">
          <Footer />
        </div>
      </div>
      <Nav />
    </div>
  )
}
