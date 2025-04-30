'use client'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function UsedCodesTitle() {
  const { t } = useCustomTranslation()
  return (
    <h2 className="list-title px-5 pb-1 pt-4 text-primary-700">
      {t('Pages.Invitation-Code.Page-already-used', '已使用')}
    </h2>
  )
}
