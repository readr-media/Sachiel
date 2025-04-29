'use client'

import { useTranslations } from 'next-intl'

export default function NoCodes() {
  const t = useTranslations('Pages.Invitation-Code')

  return (
    <p className="button-large px-5 pb-5 pt-3 text-primary-400">
      {t('Page-no-codes')}
    </p>
  )
}
