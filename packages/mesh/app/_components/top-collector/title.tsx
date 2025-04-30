'use client'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function Title() {
  const { t } = useCustomTranslation()

  return (
    <h2 className="list-title lg:title-1 mb-3 text-primary-700 lg:mb-4 lg:text-primary-500 xl:mb-[14px] xxl:mb-4">
      {t('Pages.Home.TopCollectorSection-title', '本週精選最多文章')}
    </h2>
  )
}
