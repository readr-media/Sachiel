'use client'
import { usePathname, useRouter } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

import Loading from './_components/loading'

export default function FollowingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathname = usePathname()
  const backToPreviousPage = () => {
    router.back()
  }

  let title = ''
  if (pathname.endsWith('follower')) {
    title = '粉絲'
  } else if (pathname.endsWith('following')) {
    title = '追蹤中'
  }

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-multi-layer-light',
        footer: 'hidden sm:block',
        nav: 'hidden sm:block',
        hideMobileBottomNav: true,
      }}
      mobileNavigation={{
        leftButtons: [
          {
            type: 'icon',
            icon: 'icon-chevron-left',
            onClick: backToPreviousPage,
          },
        ],
        title,
        rightButtons: [],
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title,
        rightButtons: [],
      }}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
