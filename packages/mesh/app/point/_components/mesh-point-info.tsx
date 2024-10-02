'use client'

import { useEffect, useState } from 'react'

import { getMeshPointBalance } from '@/app/actions/mesh-point'
import Icon from '@/components/icon'
import { useUser } from '@/context/user'

import MeshPointHelper from './mesh-point-helper'

export default function MeshPointInfo() {
  const [balance, setBalance] = useState(0)
  const { user } = useUser()

  useEffect(() => {
    const fetchPoint = async () => {
      const response = await getMeshPointBalance(user.wallet)
      if (response?.balance) {
        setBalance(response.balance)
      }
    }
    fetchPoint()
  }, [user.wallet])

  return (
    <>
      <div className="flex flex-col justify-center gap-2 sm:flex-col-reverse sm:self-end">
        <div className="flex flex-row items-center justify-center gap-1">
          <Icon iconName="icon-mesh-point" size="m" className="size-6" />
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
