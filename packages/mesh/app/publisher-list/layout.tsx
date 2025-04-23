'use client'

import { useTranslations } from 'next-intl'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

export default function PublisherListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = useTranslations('Pages.Publisher-List')
  return (
    <LayoutTemplate
      customStyle={{
        background: 'sm:bg-multi-layer-light',
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: t('PublisherListLayout-title'),
        rightButtons: [],
      }}
      mobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: t('PublisherListLayout-title'),
        rightButtons: [],
      }}
      type="default"
    >
      {children}
    </LayoutTemplate>
  )
}
