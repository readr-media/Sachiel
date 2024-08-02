'use client'

import { useEffect, useState } from 'react'

import Icon from '@/components/icon'
import { useDynamicContext } from '@/utils/dynamic'

import MeshPointHelper from './mesh-point-helper'

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
      <div className="flex flex-col justify-center gap-2 sm:flex-col-reverse sm:self-end">
        <div className="flex flex-row items-center justify-center gap-1">
          <Icon iconName="icon-mesh-point" size="m" className="h-6 w-6" />
          <p className="hero-title text-primary-700">
            {balance?.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <MeshPointHelper />
      </div>
    </>
  )
}
