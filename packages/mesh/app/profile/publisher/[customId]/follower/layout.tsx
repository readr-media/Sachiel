'use client'

import Loading from '@/app/profile/member/[customId]/(follow)/_components/loading'
import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function FollowerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { t } = useCustomTranslation()
  const title = t('Pages.Profile.FollowerLayout-title', '粉絲')

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
