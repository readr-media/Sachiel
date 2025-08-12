import { type FormEvent, useState } from 'react'

export default function SponsorInput({
  balance,
  onChangeAmount,
}: {
  balance: number | undefined
  onChangeAmount: (value: number) => void
}) {
  const [userInput, setUserInput] = useState('')
  const isMax = `${userInput}` === `${balance}`

  const handleMaxClick = () => {
    if (!balance) return
    setUserInput(`${balance}`)
  }

  const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    if (balance === undefined) return
    const value = e.currentTarget.value
    if (value && !/^[1-9][0-9]*$/.test(value)) {
      return
    }
    setUserInput(value)
    onChangeAmount(parseInt(value) || 0)
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
          <span>請輸入您要贊助的金額。</span>
          <span>您的讀選點數餘額：${balance}</span>
        </p>
      </div>
    </div>
  )
}
