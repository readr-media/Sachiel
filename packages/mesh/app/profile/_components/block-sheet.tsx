import { useTranslations } from 'next-intl'
import React from 'react'

import Button from '@/components/button'
type BlockSheetType = {
  onClose: () => void
  customId: string
}
const BlockSheet = ({ onClose, customId }: BlockSheetType) => {
  const t = useTranslations('Pages.Profile')
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-lightbox-dark">
      <div className="flex max-w-[278px] flex-col rounded-md bg-white px-5 py-4">
        <section className="mb-5">
          <p className="title-2">{t('BlockSheet-title', { customId })}</p>
          <p className="body-3">{t('BlockSheet-description')}</p>
        </section>
        <section className="flex justify-end">
          {/* TODO: report function not yet */}
          <Button
            size="sm"
            color="transparent-blue"
            text={t('BlockSheet-confirm')}
            onClick={onClose}
          />
          <Button
            size="sm"
            color="custom-blue"
            text={t('BlockSheet-cancel')}
            onClick={onClose}
          />
        </section>
      </div>
    </div>
  )
}

export default BlockSheet
