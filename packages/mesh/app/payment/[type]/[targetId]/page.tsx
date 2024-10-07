import dynamic from 'next/dynamic'
import { notFound, redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import getAllPublishers from '@/app/actions/get-all-publishers'
import { getMeshPointBalance } from '@/app/actions/mesh-point'
import { getStoryUnlockPolicy } from '@/app/actions/story'
import { PaymentType } from '@/types/payment'

import PaymentInfo from './_component/payment-info'
import SponsorshipInfo from './_component/sponsorship-info'

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
  if (!memberId) redirect('/login')
  const hasAlchemyAccount = !!user?.wallet
  let balance = undefined

  if (hasAlchemyAccount) {
    const response = await getMeshPointBalance(user.wallet)
    balance = response?.balance
  }

  switch (type) {
    case PaymentType.SubscriptionStory: {
      const unlockPolicy = await getStoryUnlockPolicy(targetId)
      if (!unlockPolicy.length) notFound()
      return (
        <AlchemyAuth
          hasAlchemyAccount={hasAlchemyAccount}
          renderComponent={
            <PaymentInfo unlockPolicy={unlockPolicy} storyId={targetId} />
          }
        />
      )
    }
    case PaymentType.Sponsor: {
      const allPublishers = await getAllPublishers()
      const publisher = allPublishers?.find(
        (publisher) => publisher.id === targetId
      )
      if (!publisher) notFound()
      return (
        <AlchemyAuth
          hasAlchemyAccount={hasAlchemyAccount}
          renderComponent={
            <SponsorshipInfo publisher={publisher} balance={balance} />
          }
        />
      )
    }
    case PaymentType.SubscriptionPublisher:
    case PaymentType.Deposit:
      return <p>Payment Page to be implemented...</p>

    default:
      return <p>Invalid payment type</p>
  }
}
