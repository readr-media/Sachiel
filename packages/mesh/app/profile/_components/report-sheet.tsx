import { useTranslations } from 'next-intl'
import React from 'react'

import Button from '@/components/button'
type ReportSheet = {
  onClose: () => void
}
// TODO: onClose 尚未實作，等待api
const ReportSheet = ({ onClose }: ReportSheet) => {
  const t = useTranslations('Pages.Profile')
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-lightbox-dark">
      <div className="flex max-w-[278px] flex-col rounded-md bg-white px-5 py-4">
        <section className="mb-5">
          <p className="title-2">{t('ReportSheet-report-success')}</p>
          <p className="body-3">{t('ReportSheet-description')}</p>
        </section>
        <section className="flex justify-end">
          <Button
            size="sm"
            color="custom-blue"
            text={t('ReportSheet-confirm')}
            onClick={onClose}
          />
        </section>
      </div>
    </div>
  )
}

export default ReportSheet
