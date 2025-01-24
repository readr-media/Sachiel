'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type Hex } from 'viem'

import {
  type CreatePaymentProps,
  type UpdatePaymentProps,
} from '@/app/actions/payment'
import { type PublisherWalletData } from '@/app/actions/publisher'
import SendTransaction from '@/components/alchemy/send-transaction'
import Button from '@/components/button'
import Icon from '@/components/icon'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import useUserPayload from '@/hooks/use-user-payload'
import { logSponsor } from '@/utils/event-logs'
import { debounce } from '@/utils/performance'

import SponsorInput from './sponsor-input'
import { type SponsorshipPoints } from './sponsor-option'
import SponsorOption from './sponsor-option'

export default function SponsorshipInfo({
  publisher,
  balance,
  recipientAddress,
}: {
  publisher: NonNullable<PublisherWalletData>
  balance: number | undefined
  recipientAddress: Hex
}) {
  const { user } = useUser()
  const router = useRouter()
  const [isInputMode, setIsInputMode] = useState(false)
  const [selectedOption, setSelectedOption] = useState<
    SponsorshipPoints | undefined | null
  >(null)
  const [amount, setAmount] = useState(0)
  const [isSponsored, setIsSponsored] = useState(false)
  const { addToast } = useToast()
  const userPayload = useUserPayload()
  const createSponsorPayment: CreatePaymentProps = {
    action: 'sponsor_media',
    memberId: user.memberId,
    publisherId: publisher.id,
    fee: `${amount}`,
  }
  const updateSponsorPayment: UpdatePaymentProps = {
    action: 'sponsor_media',
    memberId: user.memberId,
    objective: 'sponsorship',
    targetId: '0',
    tid: '0x',
  }

  const onClickOption = (value: SponsorshipPoints | undefined) => {
    if (value && balance && value > balance) {
      addToast({ status: 'fail', text: TOAST_MESSAGE.payFailedInsufficient })
      return
    }
    setSelectedOption(value)
    setAmount(value ?? 0)
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
    logSponsor(userPayload, publisher.title ?? '')
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
            <p className="title-2 pb-1 text-primary-700">支付成功</p>
            <p className="body-2 pb-6 text-primary-500">
              您成功贊助了
              <span className="text-custom-blue">{publisher.title}</span>
            </p>
            <Button
              size="lg"
              color="white"
              text="完成"
              onClick={() => {
                router.push('/point')
              }}
            />
          </div>
        </div>
      ) : isInputMode ? (
        <SponsorInput balance={balance} onChangeAmount={handleChangeAmount} />
      ) : (
        <SponsorOption
          publisherTitle={publisher.title ?? ''}
          selectedOption={selectedOption}
          onClick={onClickOption}
        />
      )}

      {isSponsored ? null : (
        <div className="fixed bottom-0 left-0 w-full max-w-[600px] border-t border-primary-200 bg-white px-5 py-3 sm:static sm:border-0 sm:py-0">
          {amount > 0 ? (
            <SendTransaction
              amount={amount}
              balance={balance}
              recipientAddress={recipientAddress}
              disabled={selectedOption === null}
              createPaymentPayload={createSponsorPayment}
              updatePaymentPayload={updateSponsorPayment}
              onSuccess={handleSponsorSuccess}
            />
          ) : (
            <div className="flex w-full justify-center">
              <div className="shrink-0 grow sm:max-w-[335px]">
                <Button
                  size="lg"
                  text={isInputMode ? '上一步' : '下一步'}
                  color="primary"
                  disabled={selectedOption !== undefined}
                  onClick={() => setIsInputMode(!isInputMode)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
