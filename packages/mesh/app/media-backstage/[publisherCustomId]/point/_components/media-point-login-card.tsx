'use client'

import { useTranslations } from 'next-intl'

import { LogInCard } from '@/components/alchemy/login-card'

export default function MediaPointLoginCard() {
  const t = useTranslations('Others.alchemy')

  return (
    <LogInCard formDescription={t('login-description')} isHelperText={true} />
  )
}
