import { type FormEvent, useState } from 'react'

import {
  NEXT_PUBLIC_MEDIA_BACKSTAGE_EXCHANGE_FEE_RATE,
  NEXT_PUBLIC_MEDIA_BACKSTAGE_MINIMUM_EXCHANGE_AMOUNT,
} from '@/constants/config'

const exchangeFeeRate = parseFloat(
  NEXT_PUBLIC_MEDIA_BACKSTAGE_EXCHANGE_FEE_RATE
)
const amountWithFeeRatio = 1 + exchangeFeeRate

export default function ExchangeInput({
  balance,
  onChangeAmount,
}: {
  balance: number | undefined
  onChangeAmount: (value: number) => void
}) {
  const [userInput, setUserInput] = useState('')
  const maxAmount = Math.floor((balance ?? 0) / amountWithFeeRatio)
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
    const newAmount = Math.ceil(newInputAmount * amountWithFeeRatio)

    setUserInput(newInputAmount ? newInputAmount.toString() : '')
    onChangeAmount(newAmount)
  }

  return (
    <div className="w-full max-w-[600px] px-5 pt-10 sm:px-0 sm:pb-10 sm:pt-4 lg:px-10">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-primary-200 pb-2">
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
        <p className="footnote flex flex-col text-primary-500">
          <span>請輸入您要兌換的金額。</span>
          <span className="text-custom-blue">
            {`點數最低兌換點數為 ${NEXT_PUBLIC_MEDIA_BACKSTAGE_MINIMUM_EXCHANGE_AMOUNT} 點，單筆兌換手續費為 ${
              exchangeFeeRate * 100
            }%。`}
          </span>
          <span>您的讀選點數餘額：${balance}</span>
        </p>
      </div>
    </div>
  )
}
