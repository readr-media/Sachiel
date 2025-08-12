'use client'

import { useEffect, useMemo, useState } from 'react'

import type { CollectionPickStory } from '@/app/[lng]/collection/(mutate)/_types/collection'
import { useCreateCollection } from '@/context/create-collection'
import { getCrossPageCollectinPickStory } from '@/utils/cross-page-create-collection'

import { DesktopCreateCollectionStep } from '../../../_types/create-collection'
import DesktopStep1FullEdit from './step-one-full-edit'
import DesktopStep2SortStories from './step-two-sort-stories'

export default function DesktopCollectionPicks() {
  const [fixedStory, setFixedStory] = useState<CollectionPickStory | null>(null)

  const { desktopStepName, collectionPickStories, setCollectionPickStories } =
    useCreateCollection()

  useEffect(() => {
    if (!collectionPickStories.length) {
      const story = getCrossPageCollectinPickStory()
      if (story) {
        setFixedStory(story)
        setCollectionPickStories([story])
      }
    }
  }, [collectionPickStories.length, setCollectionPickStories])

  const stepJsx = useMemo(() => {
    switch (desktopStepName) {
      case DesktopCreateCollectionStep.Step1EditAll:
        return <DesktopStep1FullEdit fixedStory={fixedStory} />
      case DesktopCreateCollectionStep.Step2SortStories:
        return <DesktopStep2SortStories />
      default:
        return null
    }
  }, [desktopStepName, fixedStory])

  return (
    <div className="relative left-[320px] flex w-maxDesktopNavigation grow flex-col">
      <div className="flex grow flex-col pl-2 pr-5 sm:px-5 md:px-[70px] lg:pl-10 lg:pr-0">
        {stepJsx}
      </div>
    </div>
  )
}
