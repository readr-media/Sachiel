'use client'

import { useAccount, useSignerStatus } from '@alchemy/aa-alchemy/react'
import { type ReactNode, useEffect } from 'react'
import { type Hex } from 'viem'

import { updateMemberWallet } from '@/app/actions/auth'
import { accountType } from '@/utils/alchemy'

import Spinner from '../spinner'
import { LogInCard } from './login-card'

export default function AlchemyAuth({
  memberId,
  hasAlchemyAccount,
  renderComponent,
}: {
  memberId: string
  hasAlchemyAccount: boolean
  renderComponent: ReactNode
}) {
  const { isInitializing, isAuthenticating, isConnected, status } =
    useSignerStatus()
  const isLoading =
    isInitializing || (isAuthenticating && status !== 'AWAITING_EMAIL_AUTH')
  const { address } = useAccount({ type: accountType })

  useEffect(() => {
    const syncSmartAccount = async (id: string, address: Hex) => {
      await updateMemberWallet(id, address)
    }

    if (!hasAlchemyAccount && address) {
      syncSmartAccount(memberId, address)
    }
  }, [address, hasAlchemyAccount, memberId])

  if (!hasAlchemyAccount && !address)
    return (
      <LogInCard
        formDescription="您尚未新增/連結錢包，成功啟用錢包可獲得 100 讀選點數。點擊下方按鈕，我們會將錢包的啟用連結寄送至您的 Email。"
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
          formDescription="為維護交易安全，請重新登入錢包以繼續"
          isHelperText={false}
        />
      )}
    </>
  )
}
