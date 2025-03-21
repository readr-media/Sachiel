'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { type Hex } from 'viem'

import type { FailPaymentProps } from '@/app/actions/payment'
import {
  type CreatePaymentProps,
  type UpdatePaymentProps,
} from '@/app/actions/payment'
import SendTransaction from '@/components/alchemy/send-transaction'
import Icon from '@/components/icon'
import TOAST_MESSAGE from '@/constants/toast'
import { useUser } from '@/context/user'
import useUserPayload from '@/hooks/use-user-payload'
import { setCrossPageToast } from '@/utils/cross-page-toast'
import { logStoryUnlockEvent } from '@/utils/event-logs'
import { isValidEmail } from '@/utils/validate-email'

import { type StoryUnlockPolicy } from '../page'
import TransactionOngoing from './transaction-ongoing'

export default function PaymentInfo({
  unlockPolicy,
  storyId,
  balance,
  recipientAddress,
}: {
  unlockPolicy: StoryUnlockPolicy
  storyId: string
  balance: number | undefined
  recipientAddress: Hex
}) {
  const t = useTranslations('Pages.Payment')
  const toastT = useTranslations('Others.toast')
  const { user } = useUser()
  const router = useRouter()
  const userPayload = useUserPayload()
  const [email, setEmail] = useState(user.email)
  const [isChecked, setIsChecked] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const isValid = isValidEmail(email)
  const createUnlockStorySinglePayment: CreatePaymentProps = {
    action: 'unlock_story_single',
    memberId: user.memberId,
    policyId: unlockPolicy[0].id,
    storyId: storyId,
  }
  const updateUnlockStorySinglePayment: UpdatePaymentProps = {
    action: 'unlock_story_single',
    memberId: user.memberId,
    objective: 'transaction',
    targetId: '0',
    tid: '0x',
  }
  const failUnlockStorySinglePayment: FailPaymentProps = {
    action: 'unlock_story_single',
    memberId: user.memberId,
    objective: 'transaction',
    targetId: '0',
    complement: 'Reason of failure',
  }

  const handleUnlockStorySingleOnSend = () => {
    setIsUnlocking(true)
  }

  const handleUnlockStorySingleOnSuccess = () => {
    logStoryUnlockEvent(userPayload, {
      policyId: unlockPolicy[0].id,
      policyName: unlockPolicy[0]?.name ?? '',
      publisherId: unlockPolicy[0].publisher?.id ?? '',
      publisherName: unlockPolicy[0].publisher?.title ?? '',
      storyId,
    })
    setCrossPageToast({
      status: 'success',
      text: toastT(TOAST_MESSAGE.unlockStorySuccess),
    })
    router.push(`/story/${storyId}`)
  }

  const handleUnlockStorySingleOnError = () => {
    setIsUnlocking(false)
  }

  return (
    <main className="relative grow p-5 py-4 lg:px-10">
      <div className="flex max-w-[600px] grow flex-col gap-10 sm:grow-0">
        <div className="flex flex-col gap-3">
          <p className="profile-title">{t('PaymentInfo-payment-info')}</p>
          <div className="flex flex-col gap-6 bg-multi-layer-light p-4">
            <div className="flex flex-col gap-2">
              <p className="subtitle-2 text-primary-500">
                {t('PaymentInfo-payment-type')}
              </p>
              <p className="body-2">{t('PaymentInfo-mm-single-story')}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="subtitle-2 text-primary-500">
                {t('PaymentInfo-unlock-duration')}
              </p>
              <p className="body-2">{t('PaymentInfo-14-days')}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="subtitle-2 text-primary-500">
                {t('PaymentInfo-price')}
              </p>
              <div className="flex flex-row items-center">
                <Icon iconName="icon-mesh-point" size="m" className="size-5" />
                <p className="pl-1">{unlockPolicy[0].charge}</p>
                <p className="body-3 pl-2 text-primary-500">
                  {t('PaymentInfo-payment-hint')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="profile-title">{t('PaymentInfo-email')}</p>
            <p className="body-3 text-primary-500">
              {t('PaymentInfo-email-hint')}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full border-b pb-2 ${
                isFocused ? 'border-primary-600' : 'border-primary-200'
              }`}
            />
            <div className="flex flex-row items-center gap-[6px]">
              <Icon
                iconName={
                  isValid ? 'icon-check-circle-blue' : 'icon-check-circle-gray'
                }
                size="m"
              />
              <p
                className={`body-3 ${
                  isValid ? 'text-custom-blue' : 'text-primary-500'
                }`}
              >
                {t('PaymentInfo-email-valid')}
              </p>
            </div>
          </div>
        </div>
        <label className="flex flex-row items-center">
          <input
            className="m-1 size-4"
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <p className="body-2 text-primary-500">
            {t('PaymentInfo-aceept-terms')}
            <Link href={'/policy/terms-of-service'}>
              <span className="text-primary-700 underline underline-offset-2">
                {t('PaymentInfo-terms')}
              </span>
            </Link>
          </p>
        </label>
      </div>
      <div className="fixed bottom-0 left-0 w-full max-w-[600px] border-t px-5 py-4 sm:static sm:border-t-0 sm:pt-10">
        <SendTransaction
          balance={balance}
          amount={unlockPolicy[0].charge ?? 0}
          recipientAddress={recipientAddress}
          disabled={!isChecked}
          createPaymentPayload={createUnlockStorySinglePayment}
          updatePaymentPayload={updateUnlockStorySinglePayment}
          failPaymentPayload={failUnlockStorySinglePayment}
          onSend={handleUnlockStorySingleOnSend}
          onSuccess={handleUnlockStorySingleOnSuccess}
          onError={handleUnlockStorySingleOnError}
          actionText={t('PaymentInfo-pay')}
        />
      </div>

      {/* This UI only cover all other jsx cause the transction logic is inside SendTransaction component */}
      {isUnlocking && <TransactionOngoing />}
    </main>
  )
}
