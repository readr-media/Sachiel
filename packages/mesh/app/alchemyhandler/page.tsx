'use client'

import { useAccount, useSignerStatus } from '@alchemy/aa-alchemy/react'
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Spinner from '@/components/spinner'
import { useUser } from '@/context/user'
import { accountType } from '@/utils/alchemy'

import { updateMemberWallet } from '../actions/auth'

// handle redirects from alchemy email link to user interacting page
export default function Page() {
  const router = useRouter()
  const { isConnected } = useSignerStatus()
  const { address } = useAccount({ type: accountType })
  const { user } = useUser()
  const hasAlchemyAccount = !!user.wallet
  const memberId = user.memberId

  if (!memberId) redirect('/login')

  useEffect(() => {
    const handleAlchemyRedirect = async () => {
      if (!isConnected || !address) return

      const route = localStorage.getItem('alchemy-redirect')
      if (!route) return

      if (hasAlchemyAccount) {
        router.push(route)
      } else {
        const response = await updateMemberWallet(memberId, address)
        if (response) router.push(route)
      }
    }
    handleAlchemyRedirect()
  }, [address, hasAlchemyAccount, isConnected, memberId, router])

  return (
    <main className="flex h-dvh justify-center">
      <Spinner />
    </main>
  )
}
