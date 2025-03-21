'use client'

import { useTranslations } from 'next-intl'

import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import { useCreateCollection } from '@/context/create-collection'

import { MobileCreateCollectionStep } from '../../_types/create-collection'

export default function MobileGoNextButton() {
  const t = useTranslations('Pages.Collection')
  const { mobileStepName, setStep, isMobileStepFullfilled, createCollection } =
    useCreateCollection()

  const goNextStep = () => {
    setStep((step) => step + 1)
  }

  if (!isMobileStepFullfilled) return null

  switch (mobileStepName) {
    case MobileCreateCollectionStep.Step1SelectStories:
    case MobileCreateCollectionStep.Step2SetTitle:
    case MobileCreateCollectionStep.Step3SetSummary:
      return (
        <MobileNavigationButton
          text={t('MobileGoNextButton-go-next')}
          type="text"
          onClick={goNextStep}
          color="blue"
        />
      )
    case MobileCreateCollectionStep.Step4SortStories:
      return (
        <MobileNavigationButton
          text={t('MobileGoNextButton-create')}
          type="text"
          onClick={createCollection}
          color="blue"
        />
      )
    default:
      return null
  }
}
