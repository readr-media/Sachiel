'use client'
import { usePathname } from 'next/navigation'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

import Loading from './_components/loading'

export default function FollowingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const { t } = useCustomTranslation()

  let title = ''
  if (pathname.endsWith('follower')) {
    title = t('Profile.Follower', '粉絲')
  } else if (pathname.endsWith('following')) {
    title = t('Profile.Following', '追蹤中')
  }

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
        hideMobileBottomNav: true,
      }}
      mobileNavigation={navigationData}
      nonMobileNavigation={navigationData}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
