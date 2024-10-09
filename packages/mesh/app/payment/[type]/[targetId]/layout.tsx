'use client'

import { usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const subPath = pathname.split('/')[2]
  const subtitle = subPath.startsWith('subscription') ? '解鎖' : '贊助'

  const navigationData = {
    leftButtons: [<GoBackButton key={0} />],
    title: subtitle,
    rightButtons: [],
  }

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-white',
        restrictMainWidth: true,
        footer: 'hidden',
        nav: 'hidden sm:block',
      }}
      mobileNavigation={navigationData}
      nonMobileNavigation={navigationData}
    >
      {children}
    </LayoutTemplate>
  )
}
