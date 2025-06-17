'use client'

import { LogInCard } from '@/components/alchemy/login-card'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function MediaPointLoginCard() {
  const { t } = useCustomTranslation()

  return (
    <LogInCard
      formDescription={t(
        'Others.alchemy.login-description',
        '您尚未新增/連結錢包。點擊下方按鈕，我們會將錢包的啟用連結寄送至您的 Email。'
      )}
      isHelperText={true}
    />
  )
}
