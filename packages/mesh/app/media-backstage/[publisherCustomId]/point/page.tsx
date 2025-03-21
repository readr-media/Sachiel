import { getTranslations } from 'next-intl/server'

import { getCurrentUser } from '@/app/actions/auth'
import { getMeshPointBalance } from '@/app/actions/mesh-point'
import { LogInCard } from '@/components/alchemy/login-card'

import MeshPoint from './_components/mesh-point'

export default async function MediaPointPage({
  params: { publisherCustomId },
}: {
  params: { publisherCustomId: string }
}) {
  const t = await getTranslations('Others.alchemy')
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
        <LogInCard
          formDescription={t('login-description')}
          isHelperText={true}
        />
      )}
    </main>
  )
}
