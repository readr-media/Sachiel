'use client'
import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigationData = {
    title: '聯絡我們',
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
