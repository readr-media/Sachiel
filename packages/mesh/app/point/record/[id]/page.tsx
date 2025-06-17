import { notFound, redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getMeshPointBalance } from '@/app/actions/mesh-point'
import { getMemberSingleTransaction } from '@/app/actions/transaction'

import ClientPage from './_components/client-page'

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  let balance = undefined
  if (!memberId) redirect('/login')

  const data = await getMemberSingleTransaction(memberId, params.id)
  if (!data) notFound()

  const hasAlchemyAccount = !!user.wallet

  if (hasAlchemyAccount) {
    const response = await getMeshPointBalance(user.wallet)
    balance = response?.balance
  }

  return <ClientPage data={data} balance={balance} />
}
