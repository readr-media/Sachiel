import React from 'react'

import Button from '@/components/button'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
type ReportSheet = {
  onClose: () => void
}
// TODO: onClose 尚未實作，等待api
const ReportSheet = ({ onClose }: ReportSheet) => {
  const { t } = useCustomTranslation()

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-lightbox-dark">
      <div className="flex max-w-[278px] flex-col rounded-md bg-white px-5 py-4">
        <section className="mb-5">
          <p className="title-2">
            {t('Pages.Profile.ReportSheet-report-success', '檢舉成功')}
          </p>
          <p className="body-3">
            {t(
              'Pages.Profile.ReportSheet-description',
              '我們已收到您的檢舉，感謝提供資訊。'
            )}
          </p>
        </section>
        <section className="flex justify-end">
          <Button
            size="sm"
            color="custom-blue"
            text={t('Pages.Profile.ReportSheet-confirm', '好的')}
            onClick={onClose}
          />
        </section>
      </div>
    </div>
  )
}

export default ReportSheet
