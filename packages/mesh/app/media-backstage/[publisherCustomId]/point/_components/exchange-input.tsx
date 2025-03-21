import { useTranslations } from 'next-intl'
import { type FormEvent, useState } from 'react'

import {
  NEXT_PUBLIC_MEDIA_BACKSTAGE_EXCHANGE_FEE_RATE,
  NEXT_PUBLIC_MEDIA_BACKSTAGE_MINIMUM_EXCHANGE_AMOUNT,
} from '@/constants/config'

export default function ExchangeInput({
  balance,
  onChangeAmount,
}: {
  balance: number | undefined
  onChangeAmount: (value: number) => void
}) {
  const t = useTranslations('Pages.Media-Backstage')
  const [userInput, setUserInput] = useState('')
  const [fullfillMinimum, setFullfillMimium] = useState(true)
  const maxAmount = balance ?? 0
  const isMax = `${userInput}` === `${balance}`

  const handleMaxClick = () => {
    if (!balance) return

    setUserInput(`${maxAmount}`)
  }

  const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    if (!balance) return
    const value = e.currentTarget.value

    if (value && !/^[1-9][0-9]*$/.test(value)) {
      return
    }

    const newInputAmount = Math.min(parseInt(value) || 0, maxAmount)
    const isNewValueFullfillMinimum =
      newInputAmount >= NEXT_PUBLIC_MEDIA_BACKSTAGE_MINIMUM_EXCHANGE_AMOUNT

    setUserInput(newInputAmount ? newInputAmount.toString() : '')
    onChangeAmount(newInputAmount)
    setFullfillMimium(isNewValueFullfillMinimum)
  }

  return (
    <div className="w-full max-w-[600px] px-5 pt-10 sm:px-0 sm:pb-10 sm:pt-4 lg:px-10">
      <div className="flex flex-col">
        <div
          className={`flex items-center gap-2 border-b pb-2 ${
            fullfillMinimum ? 'border-primary-200' : 'border-custom-red'
          }`}
        >
          <input
            className="flex-1 appearance-none border-none outline-none"
            value={userInput}
            onChange={handleOnChange}
            max={balance}
            min={0}
            inputMode="numeric"
            autoFocus
          />
          <button
            className={`h-5 w-10 rounded ${
              isMax ? 'bg-primary-400' : 'bg-primary-700'
            } text-[11px] font-normal text-white`}
            onClick={handleMaxClick}
          >
            {t('ExchangeInput-set-max-amount')}
          </button>
        </div>
        {!fullfillMinimum && (
          <span className="body-3 mt-2 text-custom-red-text">
            {t('ExchangeInput-minimum-amount-hint', {
              amount: NEXT_PUBLIC_MEDIA_BACKSTAGE_MINIMUM_EXCHANGE_AMOUNT,
            })}
          </span>
        )}
        <p className="footnote mt-6 flex flex-col text-primary-500">
          <span>{t('ExchangeInput-enter-amount')}</span>
          <span>{t('ExchangeInput-mesh-point-balance', { balance })}</span>
          <span className="mt-5 text-custom-blue">
            {t('ExchangeInput-exchange-detail', {
              amount: NEXT_PUBLIC_MEDIA_BACKSTAGE_MINIMUM_EXCHANGE_AMOUNT,
              feeRate: NEXT_PUBLIC_MEDIA_BACKSTAGE_EXCHANGE_FEE_RATE * 100,
            })}
          </span>
        </p>
      </div>
    </div>
  )
}
