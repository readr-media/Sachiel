'use client'

import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import { useCreateCollection } from '@/context/create-collection'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

import { MobileCreateCollectionStep } from '../../_types/create-collection'

export default function MobileGoNextButton() {
  const { t } = useCustomTranslation()
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
          text={t('Pages.Collection.MobileGoNextButton-go-next', '下一步')}
          type="text"
          onClick={goNextStep}
          color="blue"
        />
      )
    case MobileCreateCollectionStep.Step4SortStories:
      return (
        <MobileNavigationButton
          text={t('Pages.Collection.MobileGoNextButton-create', '建立')}
          type="text"
          onClick={createCollection}
          color="blue"
        />
      )
    default:
      return null
  }
}
