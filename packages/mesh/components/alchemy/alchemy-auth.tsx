'use client'

import { useAccount, useSignerStatus } from '@alchemy/aa-alchemy/react'
import { useTranslations } from 'next-intl'
import { type ReactNode } from 'react'

import Spinner from '@/components/spinner'
import { accountType } from '@/utils/alchemy'

import { LogInCard } from './login-card'

export default function AlchemyAuth({
  hasAlchemyAccount,
  renderComponent,
}: {
  hasAlchemyAccount: boolean
  renderComponent: ReactNode
}) {
  const t = useTranslations('Others.alchemy')
  const { isInitializing, isAuthenticating, isConnected, status } =
    useSignerStatus()
  const isLoading =
    isInitializing || (isAuthenticating && status !== 'AWAITING_EMAIL_AUTH')
  const { address } = useAccount({ type: accountType })

  if (!hasAlchemyAccount && !address)
    return (
      <LogInCard formDescription={t('login-description')} isHelperText={true} />
    )

  return (
    <>
      {isLoading ? (
        <div className="flex grow items-center justify-center">
          <Spinner />
        </div>
      ) : isConnected ? (
        renderComponent
      ) : (
        <LogInCard
          formDescription={t('login-before-transaction-description')}
          isHelperText={false}
        />
      )}
    </>
  )
}
