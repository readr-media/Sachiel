'use client'

import { useMemo } from 'react'

import { useEditCollection } from '@/context/edit-collection'

import { DesktopEditCollectionType } from '../../../_types/edit-collection'
import DesktopAddStories from './add-stories'
import DesktopEditAll from './edit-all'

export default function DesktopMainAction() {
  const { desktopEditType } = useEditCollection()

  const editTypeJsx = useMemo(() => {
    switch (desktopEditType) {
      case DesktopEditCollectionType.EditAll:
        return <DesktopEditAll />
      case DesktopEditCollectionType.AddStories:
        return <DesktopAddStories />
      default:
        return null
    }
  }, [desktopEditType])

  return (
    <div className="fixed inset-y-0 left-[calc(max((100vw-1440px)/2,0px))] z-layout flex w-[theme(width.nav.xl)] flex-col gap-8 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05),4px_0px_16px_0px_rgba(0,0,0,0.05)]">
      {editTypeJsx}
    </div>
  )
}
