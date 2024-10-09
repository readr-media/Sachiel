'use client'

import Loading from '@/app/profile/member/[customId]/(follow)/_components/loading'
import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

export default function FollowerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const title = '粉絲'

  const navigationData = {
    leftButtons: [<GoBackButton key={0} />],
    title,
    rightButtons: [],
  }

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-multi-layer-light',
        footer: 'hidden sm:block',
        nav: 'hidden sm:block',
      }}
      mobileNavigation={navigationData}
      nonMobileNavigation={navigationData}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
