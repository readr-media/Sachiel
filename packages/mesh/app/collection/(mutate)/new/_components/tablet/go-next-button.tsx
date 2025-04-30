'use client'

import Button from '@/components/button'
import { useCreateCollection } from '@/context/create-collection'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

import { MobileCreateCollectionStep } from '../../_types/create-collection'

export default function TabletGoNextButton() {
  const { t } = useCustomTranslation()
  const { mobileStepName, setStep, isMobileStepFullfilled, createCollection } =
    useCreateCollection()

  const goNextStep = () => {
    setStep((step) => step + 1)
  }

  switch (mobileStepName) {
    case MobileCreateCollectionStep.Step1SelectStories:
    case MobileCreateCollectionStep.Step2SetTitle:
    case MobileCreateCollectionStep.Step3SetSummary:
      return (
        <Button
          text={t('Pages.Collection.TabletGoNextButton-go-next', '下一步')}
          size="lg"
          color="primary"
          disabled={!isMobileStepFullfilled}
          onClick={goNextStep}
        />
      )
    case MobileCreateCollectionStep.Step4SortStories:
      return (
        <Button
          text={t('Pages.Collection.TabletGoNextButton-create', '建立')}
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
