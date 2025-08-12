'use client'

import LayoutTemplate from '@/components/layout-template'
import EditCollectionProvider from '@/context/edit-collection'

import type { Collection } from '../../_types/collection'
import type {
  DesktopEditCollectionType,
  MobileEditCollectionType,
} from '../_types/edit-collection'
import MobileGoBackButton from './mobile/go-back-button'
import MobileGoNextButton from './mobile/go-next-button'
import MobileTitle from './mobile/title'

export default function ClientLayout({
  children,
  initialDesktopEditType,
  initialMobileEditType,
  initialCollection,
}: {
  children: React.ReactNode
  initialDesktopEditType?: DesktopEditCollectionType
  initialMobileEditType?: MobileEditCollectionType
  initialCollection: Collection
}) {
  return (
    <EditCollectionProvider
      initialDesktopEditType={initialDesktopEditType}
      initialMobileEditType={initialMobileEditType}
      initialCollection={initialCollection}
    >
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
    </EditCollectionProvider>
  )
}
