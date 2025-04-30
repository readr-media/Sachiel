'use client'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useCustomTranslation()
  const navigationData = {
    title: t('Pages.Contact.Layout-title', '聯絡我們'),
    leftButtons: [<GoBackButton key={0} />],
    rightButtons: [],
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
