import { type FormEvent, useEffect, useState } from 'react'

import { getMeshPointBalance } from '@/app/actions/mesh-point'
import Spinner from '@/components/spinner'
import { useUser } from '@/context/user'

export default function SponsorInput({
  sponsorValue,
  setSponsorValue,
}: {
  sponsorValue: string
  setSponsorValue: (value: string) => void
}) {
  const { user } = useUser()
  const [balance, setBalance] = useState(1000)
  const [isLoading, setIsLoading] = useState(false)
  const isMax = `${sponsorValue}` === `${balance}`

  useEffect(() => {
    const fetchPoint = async () => {
      setIsLoading(true)
      const response = await getMeshPointBalance(user.wallet)
      if (response?.balance) {
        setBalance(response.balance)
      }
      setIsLoading(false)
    }
    fetchPoint()
  }, [user.wallet])

  const handleMaxClick = () => {
    if (!balance) return
    setSponsorValue(`${balance}`)
  }

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    if (!balance) return
    const value = e.currentTarget.value

    if (value && !/^[1-9][0-9]*$/.test(value)) {
      return
    }

    setSponsorValue(value ? `${Math.min(parseInt(value), balance)}` : '')
  }

  return isLoading ? (
    <div className="flex h-[calc(100vh-130px)] grow sm:h-[144px] sm:max-w-[600px] sm:grow-0">
      <Spinner />
    </div>
  ) : (
    <div className="flex max-w-[600px] grow flex-col p-5 sm:grow-0">
      <div className="flex flex-col gap-3 pb-5">
        <div className="flex items-center gap-2 border-b border-primary-200 pb-2">
          <input
            className="flex-1 appearance-none border-none outline-none"
            value={sponsorValue}
            onChange={handleInput}
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
