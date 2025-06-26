'use client'

import Button from '@/components/button'
import { useCreateCollection } from '@/context/create-collection'

import { MobileCreateCollectionStep } from '../../_types/create-collection'

export default function TabletGoNextButton() {
  const { mobileStepName, setStep, isMobileStepFullfilled, createCollection } =
    useCreateCollection()

  const goNextStep = () => {
    setStep((step) => step + 1)
  }

  switch (mobileStepName) {
    case MobileCreateCollectionStep.Step1SelectStories:
    case MobileCreateCollectionStep.Step2SetTitle:
      return (
        <Button
          text="下一步"
          size="lg"
          color="primary"
          disabled={!isMobileStepFullfilled}
          onClick={goNextStep}
        />
      )
    case MobileCreateCollectionStep.Step3SetSummary:
      return (
        <Button
          text="下一步"
          size="lg"
          color="primary"
          disabled={!isMobileStepFullfilled}
          onClick={goNextStep}
        />
      )
    case MobileCreateCollectionStep.Step4SortStories:
      return (
        <Button
          text="建立"
          size="lg"
          color="primary"
          disabled={!isMobileStepFullfilled}
          onClick={createCollection}
        />
      )
    default:
      return null
  }
}
