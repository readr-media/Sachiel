import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getMeshPointBalance } from '@/app/actions/mesh-point'
import { LogInCard } from '@/components/alchemy/login-card'

import { getCurrentUser } from '../actions/auth'
import MeshPoint from './_components/mesh-point'

export default async function Page() {
  const t = await getTranslations('Others.alchemy')
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
      {hasAlchemyAccount ? (
        <MeshPoint balance={balance} />
      ) : (
        <LogInCard
          formDescription={t('login-description')}
          isHelperText={true}
        />
      )}
    </main>
  )
}
