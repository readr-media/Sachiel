import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

import { getMeshPointBalance } from '@/app/actions/mesh-point'

import { getCurrentUser } from '../actions/auth'
import MeshPoint from './_components/mesh-point'
const AlchemyAuth = dynamic(() => import('@/components/alchemy/alchemy-auth'), {
  ssr: false,
})

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  let balance = undefined
  if (!memberId) redirect('/login')

  const hasAlchemyAccount = !!user.wallet

  if (hasAlchemyAccount) {
    const response = await getMeshPointBalance(user.wallet)
    balance = response?.balance
  }

  return (
    <main className="flex grow flex-col sm:p-5 md:px-[70px] md:py-10 lg:p-10">
      <AlchemyAuth
        hasAlchemyAccount={hasAlchemyAccount}
        renderComponent={<MeshPoint balance={balance} />}
      />
    </main>
  )
}
