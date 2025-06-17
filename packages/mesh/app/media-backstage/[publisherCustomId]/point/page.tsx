import { getCurrentUser } from '@/app/actions/auth'
import { getMeshPointBalance } from '@/app/actions/mesh-point'

import MediaPointLoginCard from './_components/media-point-login-card'
import MeshPoint from './_components/mesh-point'

export default async function MediaPointPage({
  params: { publisherCustomId },
}: {
  params: { publisherCustomId: string }
}) {
  const user = await getCurrentUser()
  const hasAlchemyAccount = !!user?.wallet
  let balance = undefined

  if (hasAlchemyAccount) {
    const response = await getMeshPointBalance(user.wallet)
    balance = response?.balance
  }

  return (
    <main className="flex grow flex-col gap-5">
      {hasAlchemyAccount ? (
        <MeshPoint balance={balance} publisherCustomId={publisherCustomId} />
      ) : (
        <MediaPointLoginCard />
      )}
    </main>
  )
}
