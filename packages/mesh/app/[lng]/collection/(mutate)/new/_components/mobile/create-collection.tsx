'use client'

import { useEffect, useMemo, useState } from 'react'

import type { CollectionPickStory } from '@/app/[lng]/collection/(mutate)/_types/collection'
import { useCreateCollection } from '@/context/create-collection'
import { getCrossPageCollectinPickStory } from '@/utils/cross-page-create-collection'

import { MobileCreateCollectionStep } from '../../_types/create-collection'
import TabletNavigation from '../tablet/navigation'
import MobileStep4SortStories from './steps/step-four-sort-stories'
import MobileStep1SelectStories from './steps/step-one-select-stories'
import MobileStep3SetSummary from './steps/step-three-set-summary'
import MobileStep2SetTitle from './steps/step-two-set-title'

export default function MobileNewCollection() {
  const [fixedStory, setFixedStory] = useState<CollectionPickStory | null>(null)

  const { mobileStepName, collectionPickStories, setCollectionPickStories } =
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
    switch (mobileStepName) {
      case MobileCreateCollectionStep.Step1SelectStories:
        return <MobileStep1SelectStories fixedStory={fixedStory} />
      case MobileCreateCollectionStep.Step2SetTitle:
        return <MobileStep2SetTitle />
      case MobileCreateCollectionStep.Step3SetSummary:
        return <MobileStep3SetSummary />
      case MobileCreateCollectionStep.Step4SortStories:
        return <MobileStep4SortStories />
      default:
        return null
    }
  }, [fixedStory, mobileStepName])

  return (
    <div className="flex w-full grow flex-col sm:mx-auto sm:max-w-screen-sm md:max-w-[740px] lg:hidden">
      <TabletNavigation />
      {stepJsx}
    </div>
  )
}
