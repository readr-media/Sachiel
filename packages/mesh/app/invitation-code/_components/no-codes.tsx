'use client'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function NoCodes() {
  const { t } = useCustomTranslation()

  return (
    <p className="button-large px-5 pb-5 pt-3 text-primary-400">
      {t('Pages.Invitation-Code.Page-no-codes', '目前沒有可用的邀請碼...')}
    </p>
  )
}
