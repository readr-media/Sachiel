'use client'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function PublisherListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useCustomTranslation()

  return (
    <LayoutTemplate
      customStyle={{
        background: 'sm:bg-multi-layer-light',
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: t('Pages.Publisher-List.PublisherListLayout-title', '媒體列表'),
        rightButtons: [],
      }}
      mobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: t('Pages.Publisher-List.PublisherListLayout-title', '媒體列表'),
        rightButtons: [],
      }}
      type="default"
    >
      {children}
    </LayoutTemplate>
  )
}
