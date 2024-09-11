import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getStoryUnlockPolicy } from '@/app/actions/story'

import PaymentInfo from './_component/payment-info'

const AlchemyAuth = dynamic(() => import('@/components/alchemy/alchemy-auth'), {
  ssr: false,
})

export type StoryUnlockPolicy = Awaited<ReturnType<typeof getStoryUnlockPolicy>>

export default async function Page({
  params,
}: {
  params: { type: string; targetId: string }
}) {
  const { type, targetId } = params
  const user = await getCurrentUser()
  const memberId = user?.memberId ?? ''
  const hasAlchemyAccount = !!user?.wallet
  const unlockPolicy = await getStoryUnlockPolicy(targetId)

  if (!unlockPolicy.length) notFound()

  if (type === 'subscription') {
    return (
      <AlchemyAuth
        memberId={memberId}
        hasAlchemyAccount={hasAlchemyAccount}
        renderComponent={
          <PaymentInfo unlockPolicy={unlockPolicy} storyId={targetId} />
        }
      />
    )
  } else if (type === 'sponsor') {
    return <p>SponsorPayment Page</p>
  } else {
    return <p>Invalid payment type</p>
  }
}
