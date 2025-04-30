'use client'

import { useAccount, useSignerStatus } from '@alchemy/aa-alchemy/react'
import { type ReactNode } from 'react'

import Spinner from '@/components/spinner'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { accountType } from '@/utils/alchemy'

import { LogInCard } from './login-card'

export default function AlchemyAuth({
  hasAlchemyAccount,
  renderComponent,
}: {
  hasAlchemyAccount: boolean
  renderComponent: ReactNode
}) {
  const { t } = useCustomTranslation()
  const { isInitializing, isAuthenticating, isConnected, status } =
    useSignerStatus()
  const isLoading =
    isInitializing || (isAuthenticating && status !== 'AWAITING_EMAIL_AUTH')
  const { address } = useAccount({ type: accountType })

  if (!hasAlchemyAccount && !address)
    return (
      <LogInCard
        formDescription={t(
          'Others.alchemy.login-description',
          '您尚未新增/連結錢包。點擊下方按鈕，我們會將錢包的啟用連結寄送至您的 Email。'
        )}
        isHelperText={true}
      />
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
          formDescription={t(
            'Others.alchemy.login-before-transaction-description',
            '為維護交易安全，請重新登入錢包以繼續'
          )}
          isHelperText={false}
        />
      )}
    </>
  )
}
