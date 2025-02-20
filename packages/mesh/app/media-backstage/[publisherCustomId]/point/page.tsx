import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getMeshPointBalance } from '@/app/actions/mesh-point'
import { LogInCard } from '@/components/alchemy/login-card'

import MeshPoint from './_components/mesh-point'

export default async function MediaPointPage({
  params: { publisherCustomId },
}: {
  params: { publisherCustomId: string }
}) {
  if (!publisherCustomId) notFound()

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
          formDescription="您尚未新增/連結錢包。點擊下方按鈕，我們會將錢包的啟用連結寄送至您的 Email。"
          isHelperText={true}
        />
      )}
    </main>
  )
}
