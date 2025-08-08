'use client'

import LayoutTemplate from '@/components/layout-template'
import CreateCollectionProvider from '@/context/create-collection'

import MobileGoBackButton from './_components/mobile/go-back-button'
import MobileGoNextButton from './_components/mobile/go-next-button'
import MobileTitle from './_components/mobile/title'

export default function NewCollectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CreateCollectionProvider>
      <LayoutTemplate
        type="collection"
        mobileNavigation={{
          leftButtons: [<MobileGoBackButton key={0} />],
          title: <MobileTitle />,
          rightButtons: [<MobileGoNextButton key={0} />],
        }}
      >
        {children}
      </LayoutTemplate>
    </CreateCollectionProvider>
  )
}
