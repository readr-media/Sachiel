import { redirect } from 'next/navigation'

import { getCurrentUser } from '../actions/auth'
import CreateMeshPoint from './_components/create-mesh-point'
import MeshPoint from './_components/mesh-point'

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) redirect('/login')

  const hasDynamicAccount = !!user.wallet

  return (
    <main className="sm:p-5 md:px-[70px] md:py-10 lg:p-10">
      <div className="bg-white sm:rounded-md sm:drop-shadow">
        {hasDynamicAccount ? <MeshPoint /> : <CreateMeshPoint />}
      </div>
    </main>
  )
}
