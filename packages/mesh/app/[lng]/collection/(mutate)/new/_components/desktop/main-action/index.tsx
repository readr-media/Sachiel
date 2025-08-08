'use client'

import { useMemo } from 'react'

import { useCreateCollection } from '@/context/create-collection'

import { DesktopCreateCollectionStep } from '../../../_types/create-collection'
import DesktopStep1FullEdit from './step-one-full-edit'
import DesktopStep2SortStories from './step-two-sort-stories'

export default function DesktopMainAction() {
  const { desktopStepName } = useCreateCollection()

  const stepJsx = useMemo(() => {
    switch (desktopStepName) {
      case DesktopCreateCollectionStep.Step1EditAll:
        return <DesktopStep1FullEdit />
      case DesktopCreateCollectionStep.Step2SortStories:
        return <DesktopStep2SortStories />
      default:
        return null
    }
  }, [desktopStepName])

  return (
    <div className="fixed inset-y-0 left-[calc(max((100vw-1440px)/2,0px))] z-layout flex w-[theme(width.nav.xl)] flex-col gap-8 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05),4px_0px_16px_0px_rgba(0,0,0,0.05)]">
      {stepJsx}
    </div>
  )
}
