'use client'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function Title() {
  const { t } = useCustomTranslation()

  return (
    <h2 className="list-title lg:title-1 mb-3 text-primary-700 lg:mb-4">
      {t('Pages.Home.TopPublisherSection-title', '獲得最多次贊助')}
    </h2>
  )
}
