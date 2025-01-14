'use client'

import { useState } from 'react'
import { type Hex } from 'viem'

import type { FailPaymentProps } from '@/app/actions/payment'
import {
  type CreatePaymentProps,
  type UpdatePaymentProps,
} from '@/app/actions/payment'
import { type PublisherData } from '@/app/actions/publisher'
import SendTransaction from '@/components/alchemy/send-transaction'
import Button from '@/components/button'
import Icon from '@/components/icon'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
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
  const { user } = useUser()
  const [amount, setAmount] = useState(0)
  const [isSponsored, setIsSponsored] = useState(false)
  const [nextMonthNumber, setNextMonthNumber] = useState<number | null>(null)
  const { addToast } = useToast()
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
      addToast({ status: 'fail', text: TOAST_MESSAGE.payFailedInsufficient })
    }
  }, 500)

  const handleSponsorSuccess = () => {
    setIsSponsored(true)
    setNextMonthNumber(getNextMonthNumber())
    // logSponsor(userPayload, publisher.title ?? '')
  }

  return (
    <main className="flex flex-col items-center lg:items-start">
      {isSponsored ? (
        <div className="flex h-[calc(100vh-130px)] w-full items-center justify-center">
          <div className="flex w-dvw max-w-[295px] flex-col items-center sm:max-w-[320px]">
            <Icon
              iconName="icon-check-circle-lg"
              size={{ width: 64, height: 64 }}
              className="pb-4"
            />
            <p className="title-2 pb-1 text-primary-700">兌換成功</p>
            {nextMonthNumber && (
              <p className="body-2 pb-6 text-primary-500">
                {`收益將於 ${nextMonthNumber}/5 出報表`}
              </p>
            )}
            <Button
              size="lg"
              color="white"
              text="完成"
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
              disabled={!amount}
              createPaymentPayload={createExchangePayment}
              updatePaymentPayload={updateExchangePayment}
              failPaymentPayload={failExchangePayment}
              onSuccess={handleSponsorSuccess}
            />
          </div>
        </>
      )}
    </main>
  )
}

const getNextMonthNumber = () => {
  const d = new Date()
  return ((d.getMonth() + 1) % 12) + 1
}
