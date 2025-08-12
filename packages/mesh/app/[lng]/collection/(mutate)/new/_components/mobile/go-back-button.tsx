'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import Dialog from '@/components/dialog'
import GoBackButton from '@/components/navigation/go-back-button'
import { useCreateCollection } from '@/context/create-collection'

import { MobileCreateCollectionStep } from '../../_types/create-collection'

export default function MobileGoBackButton() {
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
        title="確認要退出編輯？"
        description="系統不會儲存您所做的變更"
        primaryAction={{
          text: '繼續編輯',
          action: () => {
            dialogRef.current?.close()
          },
        }}
        secondaryAction={{
          text: '退出',
          action: () => {
            router.back()
          },
        }}
      />
    </>
  )
}
