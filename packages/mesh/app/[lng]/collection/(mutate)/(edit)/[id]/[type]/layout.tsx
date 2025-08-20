import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getCollectionToEdit } from '@/app/actions/edit-collection'
import { isEnumValue } from '@/utils/enum'

import ClientLayout from '../../_components/client-layout'
import {
  DesktopEditCollectionType,
  MobileEditCollectionType,
} from '../../_types/edit-collection'
import { pageTypes } from './_constants/page-types'

export default async function EditCollectionLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string; type: string; lng: string }
}) {
  const pageType = params.type
  const editCollectionType = pageTypes[pageType]

  if (!editCollectionType) {
    notFound()
  }

  const isMobileEditType = isEnumValue(
    MobileEditCollectionType,
    editCollectionType
  )
  const isDesktopEditType = isEnumValue(
    DesktopEditCollectionType,
    editCollectionType
  )

  const collectionId = params.id
  const collectionData = await getCollectionToEdit({ collectionId })
  const user = await getCurrentUser()

  if (
    !collectionData ||
    !collectionData.collection ||
    // prenvent user edit other user's collection
    collectionData.collection.creator?.customId !== user?.customId
  ) {
    notFound()
  }

  const collection = collectionData.collection

  return (
    <ClientLayout
      initialDesktopEditType={
        isDesktopEditType ? editCollectionType : undefined
      }
      initialMobileEditType={isMobileEditType ? editCollectionType : undefined}
      initialCollection={collection}
    >
      {children}
    </ClientLayout>
  )
}
