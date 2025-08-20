'use client'

import { usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import ShareButton from '@/components/navigation/share-button'
import { getPolicyUrl } from '@/utils/get-url'

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()

  return (
    <LayoutTemplate
      type="article"
      mobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: '',
        rightButtons: [<ShareButton key={0} url={getPolicyUrl(pathName)} />],
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: '',
        rightButtons: [],
      }}
    >
      {children}
    </LayoutTemplate>
  )
}
