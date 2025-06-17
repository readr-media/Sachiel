'use client'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function ValidCodesTitle({ count }: { count: number }) {
  const { t } = useCustomTranslation()

  return (
    <h2 className="list-title px-5 pb-1 pt-4 text-primary-700">
      {t('Pages.Invitation-Code.Page-valid-code', '可用的邀請碼（{{count}}）', {
        count,
      })}
    </h2>
  )
}
