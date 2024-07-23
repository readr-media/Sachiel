'use client'
import '@/styles/global.css'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
  const searchParams = useSearchParams()
  const pathNameList = pathName.split('/')
  const { width } = useWindowDimensions()
  // TODO: publisher now using items id will be number
  const userId = pathNameList.pop()
  const isSelf = userId === searchParams.get('user')
  const router = useRouter()
  const backToPreviousPage = () => {
    router.back()
  }

  const hasUniqueHeader = (pathName: string): boolean => {
    // NOTE: in some path do not show the header
    const hasTargetPath = FOLLOW_LIST_PATHS.some((path) =>
      pathName.endsWith(path)
    )
    return !hasTargetPath
  }

  const hasNav = (pathName: string, width: number): boolean => {
    const hasTargetPath = FOLLOW_LIST_PATHS.some((path) =>
      pathName.endsWith(path)
    )
    const isMobileWidth = width < 768

    return !hasTargetPath || !isMobileWidth
  }
  return (
    <div className="flex grow flex-col">
      {hasUniqueHeader(pathName) && (
        <header className="absolute left-0 right-0 top-0 z-header h-[60px] border-b bg-white sm:hidden">
          {/* NOTE: add 24px to make sure custom id is in the middle */}
          <div
            className={`flex h-full w-full items-center justify-start p-[18px] ${
              !isSelf && 'pl-[42px]'
            }`}
          >
            {isSelf && (
              <Icon
                size={{ width: 24, height: 24 }}
                iconName="icon-setting-lg-on"
                // TODO: profile setting
              />
            )}
            <p className="list-title flex flex-1 justify-center">{userId}</p>
            <Icon size={{ width: 24, height: 24 }} iconName="icon-more-horiz" />
          </div>
        </header>
      )}
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="primary-container py-0 sm:pt-[68px]">
        {hasUniqueHeader(pathName) && (
          <div className="flex h-[theme(height.header.default)] sm:h-[theme(height.header.sm)]">
            <div className="flex max-w-[680px] grow items-center justify-between px-5">
              <button
                type="button"
                className="ml-2 p-3 sm:hidden"
                onClick={backToPreviousPage}
              >
                <Icon
                  iconName="icon-chevron-left"
                  size={{ width: 20, height: 20 }}
                />
              </button>
              <div className="flex items-center gap-5">
                {!isSelf && (
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
                )}
                <p className="list-title place-self-center">{userId}</p>
              </div>
              <button
                type="button"
                className="place-self-end self-center p-3"
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
      {hasNav(pathName, width) && <Nav />}
    </div>
  )
}
