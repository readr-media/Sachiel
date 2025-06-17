'use client'

import { useState } from 'react'
import { type Hex } from 'viem'

import type {
  CreatePaymentProps,
  FailPaymentProps,
  UpdatePaymentProps,
} from '@/app/actions/payment'
import { type PublisherData } from '@/app/actions/publisher'
import TransactionOngoing from '@/app/payment/[type]/[targetId]/_component/transaction-ongoing'
import SendTransaction from '@/components/alchemy/send-transaction'
import Button from '@/components/button'
import Icon from '@/components/icon'
import { NEXT_PUBLIC_MEDIA_BACKSTAGE_MINIMUM_EXCHANGE_AMOUNT } from '@/constants/config'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import type { TransactionState } from '@/types/transaction'
// TODO: add user log to log exchange record
// import useUserPayload from '@/hooks/use-user-payload'
// import { logSponsor } from '@/utils/event-logs'
import { debounce } from '@/utils/performance'

import ExchangeInput from './exchange-input'

export default function ExchangeInfo({
  publisher,
  balance,
  recipientAddress,
}: {
  publisher: PublisherData
  balance: number | undefined
  recipientAddress: Hex
}) {
  const { t } = useCustomTranslation()
  const { user } = useUser()
  const [amount, setAmount] = useState(0)
  const [transactionState, setTransactionState] =
    useState<TransactionState>('idle')
  const [nextMonthNumber, setNextMonthNumber] = useState<number | null>(null)
  const { addToast } = useToast()

  const isExchanged = transactionState === 'success'
  const isExchanging = transactionState === 'trading'

  // TODO: add user log to log exchange record
  // const userPayload = useUserPayload()
  const createExchangePayment: CreatePaymentProps = {
    action: 'exchange_media',
    memberId: user.memberId,
    publisherId: publisher.id,
    fee: `${amount}`,
  }
  const updateExchangePayment: UpdatePaymentProps = {
    action: 'exchange_media',
    memberId: user.memberId,
    objective: 'exchange',
    targetId: '0',
    tid: '0x',
  }
  const failExchangePayment: FailPaymentProps = {
    action: 'exchange_media',
    memberId: user.memberId,
    objective: 'exchange',
    targetId: '0',
    complement: 'Reason of failure',
  }
  const handleChangeAmount = debounce((value: number) => {
    if (balance === undefined) return
    if (value <= balance) {
      setAmount(value)
    } else {
      setAmount(0)
      addToast({
        status: 'fail',
        text: t(
          `Others.toast.${TOAST_MESSAGE.payFailedInsufficient}`,
          '讀選點數餘額不足'
        ),
      })
    }
  }, 500)

  const handleExchangeOnSend = () => {
    setTransactionState('trading')
  }

  const handleExchangeOnSuccess = () => {
    setTransactionState('success')
    setNextMonthNumber(getNextMonthNumber())
    // TODO: add user log to log exchange record
    // logSponsor(userPayload, publisher.title ?? '')
  }

  const handleExchangeOnError = () => {
    setTransactionState('error')
  }

  return (
    <div className="relative flex grow flex-col items-center lg:items-start">
      {isExchanged ? (
        <div className="flex h-[calc(100vh-130px)] w-full items-center justify-center">
          <div className="flex w-dvw max-w-[295px] flex-col items-center sm:max-w-[320px]">
            <Icon
              iconName="icon-check-circle-lg"
              size={{ width: 64, height: 64 }}
              className="pb-4"
            />
            <p className="title-2 pb-1 text-primary-700">
              {t(
                'Pages.Media-Backstage.ExchangeInfo-exchange-success',
                '兌換成功'
              )}
            </p>
            {nextMonthNumber && (
              <p className="body-2 pb-6 text-primary-500">
                {t(
                  'Pages.Media-Backstage.ExchangeInfo-report-generation',
                  '收益將於 {{nextMonthNumber}}/5 出報表',
                  {
                    nextMonthNumber,
                  }
                )}
              </p>
            )}
            <Button
              size="lg"
              color="white"
              text={t('Pages.Media-Backstage.ExchangeInfo-finish', '完成')}
              onClick={() => {
                window.location.reload()
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <ExchangeInput
            balance={balance}
            onChangeAmount={handleChangeAmount}
          />
          <div className="fixed bottom-0 left-0 w-full max-w-[600px] border-t border-primary-200 bg-white px-5 py-3 sm:static sm:border-0 sm:py-0">
            <SendTransaction
              amount={amount}
              balance={balance}
              recipientAddress={recipientAddress}
              disabled={
                !amount ||
                amount < NEXT_PUBLIC_MEDIA_BACKSTAGE_MINIMUM_EXCHANGE_AMOUNT
              }
              createPaymentPayload={createExchangePayment}
              updatePaymentPayload={updateExchangePayment}
              failPaymentPayload={failExchangePayment}
              onSend={handleExchangeOnSend}
              onSuccess={handleExchangeOnSuccess}
              onError={handleExchangeOnError}
              actionText={t(
                'Pages.Media-Backstage.ExchangeInfo-exchange',
                '兌換'
              )}
            />
          </div>
        </>
      )}

      {/* This UI only cover all other jsx cause the transction logic is inside SendTransaction component */}
      {isExchanging && <TransactionOngoing />}
    </div>
  )
}

const getNextMonthNumber = () => {
  const d = new Date()
  return ((d.getMonth() + 1) % 12) + 1
}
