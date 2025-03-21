'use client'

import { useTranslations } from 'next-intl'

import Button from '@/components/button'
import { useCreateCollection } from '@/context/create-collection'

import { DesktopCreateCollectionStep } from '../../_types/create-collection'

export default function DesktopGoNextButton() {
  const t = useTranslations('Pages.Collection')
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
          text={t('DesktopGoNextButton-go-next')}
        />
      )
    case DesktopCreateCollectionStep.Step2SortStories:
      return (
        <Button
          onClick={createCollection}
          disabled={!isDesktopStepFullfilled}
          size="lg"
          color="primary"
          text={t('DesktopGoNextButton-create')}
        />
      )

    default:
      return null
  }
}
