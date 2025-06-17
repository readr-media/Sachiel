'use client'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function Title() {
  const { t } = useCustomTranslation()

  return (
    <h2 className="list-title lg:title-1 text-primary-700">
      {t('Pages.Home.DailyHighlight-title', '今日焦點')}
    </h2>
  )
}
