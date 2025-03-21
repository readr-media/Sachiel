'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import Dialog from '@/components/dialog'
import GoBackButton from '@/components/navigation/go-back-button'
import { useCreateCollection } from '@/context/create-collection'

import { MobileCreateCollectionStep } from '../../_types/create-collection'

export default function MobileGoBackButton() {
  const t = useTranslations('Pages.Collection')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const { setStep, mobileStepName } = useCreateCollection()

  const onGoBackClicked = () => {
    if (mobileStepName === MobileCreateCollectionStep.Step1SelectStories) {
      dialogRef.current?.showModal()
    } else {
      setStep((step) => step - 1)
    }
  }
  return (
    <>
      <GoBackButton customAction={onGoBackClicked} />
      <Dialog
        ref={dialogRef}
        title={t('MobileGoBackButton-confirm-leave')}
        description={t('MobileGoBackButton-leave-warning')}
        primaryAction={{
          text: t('MobileGoBackButton-stay'),
          action: () => {
            dialogRef.current?.close()
          },
        }}
        secondaryAction={{
          text: t('MobileGoBackButton-leave'),
          action: () => {
            router.back()
          },
        }}
      />
    </>
  )
}
