'use client'

import Button from '@/components/button'
import { useCreateCollection } from '@/context/create-collection'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

import { DesktopCreateCollectionStep } from '../../_types/create-collection'

export default function DesktopGoNextButton() {
  const { t } = useCustomTranslation()
  const {
    setStep,
    desktopStepName,
    isDesktopStepFullfilled,
    createCollection,
  } = useCreateCollection()

  const goNextStep = () => {
    setStep((step) => step + 1)
  }

  switch (desktopStepName) {
    case DesktopCreateCollectionStep.Step1EditAll:
      return (
        <Button
          onClick={goNextStep}
          disabled={!isDesktopStepFullfilled}
          size="lg"
          color="primary"
          text={t('Pages.Collection.DesktopGoNextButton-go-next', '下一步')}
        />
      )
    case DesktopCreateCollectionStep.Step2SortStories:
      return (
        <Button
          onClick={createCollection}
          disabled={!isDesktopStepFullfilled}
          size="lg"
          color="primary"
          text={t('Pages.Collection.DesktopGoNextButton-create', '建立')}
        />
      )

    default:
      return null
  }
}
