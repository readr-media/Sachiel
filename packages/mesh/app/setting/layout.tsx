'use client'
import { usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import { useCustomTranslation } from './use-custom-translation'

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { t } = useCustomTranslation()
  const navigationData = {
    title: t('Others.setting.setting', '設定'),
    leftButtons: [<GoBackButton key={0} />],
    rightButtons: [],
  }
  if (pathname.startsWith('/setting/account-deletion')) {
    return <body className="min-h-screen">{children}</body>
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
    </Format>
  )
}