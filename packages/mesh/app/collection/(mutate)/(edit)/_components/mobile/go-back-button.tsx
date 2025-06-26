'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import Dialog from '@/components/dialog'
import GoBackButton from '@/components/navigation/go-back-button'
import { useEditCollection } from '@/context/edit-collection'

import { MobileEditCollectionType } from '../../_types/edit-collection'

export default function MobileGoBackButton() {
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
