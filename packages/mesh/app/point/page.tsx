import { redirect } from 'next/navigation'

import { getMeshPointBalance } from '@/app/actions/mesh-point'

import { getCurrentUser } from '../actions/auth'
import MeshPoint from './_components/mesh-point'
import PointLoginCard from './_components/point-login-card'

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
      {hasAlchemyAccount ? <MeshPoint balance={balance} /> : <PointLoginCard />}
    </main>
  )
}
