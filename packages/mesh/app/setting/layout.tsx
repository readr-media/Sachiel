'use client'
import { usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useCustomTranslation()
  const pathname = usePathname()
  const navigationData = {
    title: t('Pages.Setting.SettingLayout-title', '設定'),
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
