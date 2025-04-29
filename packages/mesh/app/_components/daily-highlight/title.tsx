'use client'

import { useTranslations } from 'next-intl'

export default function Title() {
  const t = useTranslations('Pages.Home')

  return (
    <h2 className="list-title lg:title-1 text-primary-700">
      {t('DailyHighlight-title')}
    </h2>
  )
}
