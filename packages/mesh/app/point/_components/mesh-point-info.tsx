'use client'

import { useEffect, useState } from 'react'

import { useDynamicContext } from '@/utils/dynamic'

export default function MeshPointInfo() {
  const { primaryWallet } = useDynamicContext()
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet) {
        const balance = await primaryWallet.connector.getBalance()
        if (balance) setBalance(parseFloat(balance))
      }
    }

    fetchBalance()
  }, [primaryWallet])
  return (
    <>
      {balance?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </>
  )
}
