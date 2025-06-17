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
            MAX
          </button>
        </div>
        {!fullfillMinimum && (
          <span className="body-3 mt-2 text-custom-red-text">
            輸入金額不能少於 1000
          </span>
        )}
        <p className="footnote mt-6 flex flex-col text-primary-500">
          <span>請輸入您要兌換的金額。</span>
          <span>您的讀選點數餘額：${balance}</span>
          <span className="mt-5 text-custom-blue">
            {`點數最低兌換點數為 ${NEXT_PUBLIC_MEDIA_BACKSTAGE_MINIMUM_EXCHANGE_AMOUNT} 點，單筆兌換手續費為 ${
              NEXT_PUBLIC_MEDIA_BACKSTAGE_EXCHANGE_FEE_RATE * 100
            }%。`}
          </span>
        </p>
      </div>
    </div>
  )
}
