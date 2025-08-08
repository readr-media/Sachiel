'use client'

import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import { useCreateCollection } from '@/context/create-collection'

import { MobileCreateCollectionStep } from '../../_types/create-collection'

export default function MobileGoNextButton() {
  const { mobileStepName, setStep, isMobileStepFullfilled, createCollection } =
    useCreateCollection()

  const goNextStep = () => {
    setStep((step) => step + 1)
  }

  if (!isMobileStepFullfilled) return null

  switch (mobileStepName) {
    case MobileCreateCollectionStep.Step1SelectStories:
    case MobileCreateCollectionStep.Step2SetTitle:
      return (
        <MobileNavigationButton
          text="下一步"
          type="text"
          onClick={goNextStep}
          color="blue"
        />
      )
    case MobileCreateCollectionStep.Step3SetSummary:
      return (
        <MobileNavigationButton
          text="下一步"
          type="text"
          onClick={goNextStep}
          color="blue"
        />
      )
    case MobileCreateCollectionStep.Step4SortStories:
      return (
        <MobileNavigationButton
          text="建立"
          type="text"
          onClick={createCollection}
          color="blue"
        />
      )
    default:
      return null
  }
}
