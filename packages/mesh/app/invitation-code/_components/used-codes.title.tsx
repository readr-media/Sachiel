'use client'

import { useTranslations } from 'next-intl'

export default function UsedCodesTitle() {
  const t = useTranslations('Pages.Invitation-Code')

  return (
    <h2 className="list-title px-5 pb-1 pt-4 text-primary-700">
      {t('Page-already-used')}
    </h2>
  )
}
