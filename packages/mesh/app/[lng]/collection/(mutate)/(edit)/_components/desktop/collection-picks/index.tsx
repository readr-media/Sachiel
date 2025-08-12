'use client'

import { useMemo } from 'react'

import { useEditCollection } from '@/context/edit-collection'

import { DesktopEditCollectionType } from '../../../_types/edit-collection'
import DesktopAddStories from './add-stories'
import DesktopSortStories from './sort-stories'

export default function DesktopCollectionPicks() {
  const { desktopEditType } = useEditCollection()

  const editTypeJsx = useMemo(() => {
    switch (desktopEditType) {
      case DesktopEditCollectionType.EditAll:
        return <DesktopSortStories />
      case DesktopEditCollectionType.AddStories:
        return <DesktopAddStories />
      default:
        return null
    }
  }, [desktopEditType])

  return (
    <div className="relative left-[320px] flex w-maxDesktopNavigation grow flex-col">
      <div className="flex grow flex-col pl-2 pr-5 sm:px-5 md:px-[70px] lg:pl-10 lg:pr-0">
        {editTypeJsx}
      </div>
    </div>
  )
}
