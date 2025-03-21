'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import Dialog from '@/components/dialog'
import GoBackButton from '@/components/navigation/go-back-button'
import { useEditCollection } from '@/context/edit-collection'

import { MobileEditCollectionType } from '../../_types/edit-collection'

export default function MobileGoBackButton() {
  const t = useTranslations('Pages.Collection')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const { setMobileEditType, mobileEditType } = useEditCollection()

  const onGoBackClicked = () => {
    if (mobileEditType === MobileEditCollectionType.AddStories) {
      setMobileEditType(MobileEditCollectionType.EditStories)
    } else {
      dialogRef.current?.showModal()
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
