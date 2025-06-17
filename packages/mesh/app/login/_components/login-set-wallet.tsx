import { LogInCard } from '@/components/alchemy/login-card'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function LoginSetWallet() {
  const { t } = useCustomTranslation()

  return (
    <LogInCard
      formDescription={t(
        'Others.alchemy.signup-description',
        '新增/連結錢包即可完成註冊。點擊下方按鈕立刻建立錢包！'
      )}
      isHelperText={true}
    />
  )
}
