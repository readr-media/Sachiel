import { isEnumValue } from '@/utils/enum'

import DesktopEditCollection from '../../_components/desktop/edit-collection'
import MobileEditCollection from '../../_components/mobile/edit-collection'
import {
  DesktopEditCollectionType,
  MobileEditCollectionType,
} from '../../_types/edit-collection'
import { pageTypes } from './_constants/page-types'

export default function Page({
  params,
}: {
  params: { id: string; type: string; lng: string }
}) {
  const pageType = params.type
  const editCollectionType = pageTypes[pageType]

  const isMobileEditType = isEnumValue(
    MobileEditCollectionType,
    editCollectionType
  )
  const isDesktopEditType = isEnumValue(
    DesktopEditCollectionType,
    editCollectionType
  )

  return (
    <main className="flex w-full max-w-[theme(width.maxContent)] grow flex-col">
      {isMobileEditType && <MobileEditCollection />}
      {isDesktopEditType && <DesktopEditCollection />}
    </main>
  )
}
