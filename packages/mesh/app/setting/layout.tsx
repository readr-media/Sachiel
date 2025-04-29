'use client'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = useTranslations('Pages.Setting')
  const pathname = usePathname()
  const navigationData = {
    title: t('SettingLayout-title'),
    leftButtons: [<GoBackButton key={0} />],
    rightButtons: [],
  }
  if (pathname.startsWith('/setting/account-deletion')) {
    return <>{children}</>
  }

  return (
    <LayoutTemplate
      type="default"
      mobileNavigation={navigationData}
      nonMobileNavigation={navigationData}
      customStyle={{
        background: 'bg-multi-layer-light',
        footer: 'hidden sm:block',
      }}
    >
      {children}
    </LayoutTemplate>
  )
}
