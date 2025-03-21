import { useTranslations } from 'next-intl'

import { LogInCard } from '@/components/alchemy/login-card'

export default function LoginSetWallet() {
  const t = useTranslations('Others.alchemy')
  return (
    <LogInCard formDescription={t('signup-description')} isHelperText={true} />
  )
}
