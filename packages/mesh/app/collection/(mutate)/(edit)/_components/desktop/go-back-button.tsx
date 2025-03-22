'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import Dialog from '@/components/dialog'
import GoBackButton from '@/components/navigation/go-back-button'
import { useEditCollection } from '@/context/edit-collection'

import { DesktopEditCollectionType } from '../../_types/edit-collection'

export default function DesktopGoBackButton() {
  const t = useTranslations('Pages.Collection')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const { setDesktopEditType, desktopEditType } = useEditCollection()

  const onGoBackClicked = () => {
    if (desktopEditType === DesktopEditCollectionType.EditAll) {
      dialogRef.current?.showModal()
    } else {
      setDesktopEditType(DesktopEditCollectionType.EditAll)
    }
  }

  return (
    <>
      <GoBackButton customAction={onGoBackClicked} />
      <Dialog
        ref={dialogRef}
        title={t('DesktopGoBackButton-confirm-leave')}
        description={t('DesktopGoBackButton-leave-warning')}
        primaryAction={{
          text: t('DesktopGoBackButton-stay'),
          action: () => {
            dialogRef.current?.close()
          },
        }}
        secondaryAction={{
          text: t('DesktopGoBackButton-leave'),
          action: () => {
            router.back()
          },
        }}
      />
    </>
  )
}
