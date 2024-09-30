import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '../actions/auth'
import MeshPoint from './_components/mesh-point'

const AlchemyAuth = dynamic(() => import('@/components/alchemy/alchemy-auth'), {
  ssr: false,
})

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) redirect('/login')

  const hasAlchemyAccount = !!user.wallet

  return (
    <main className="sm:p-5 md:px-[70px] md:py-10 lg:p-10">
      <AlchemyAuth
        hasAlchemyAccount={hasAlchemyAccount}
        renderComponent={<MeshPoint />}
      />
    </main>
  )
}
