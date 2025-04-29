'use client'

import { useTranslations } from 'next-intl'

export default function Title() {
  const t = useTranslations('Pages.Home')

  return (
    <h2 className="list-title lg:title-1 mb-3 text-primary-700 lg:mb-4">
      {t('TopPublisherSection-title')}
    </h2>
  )
}
