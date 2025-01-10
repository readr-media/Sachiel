import dynamic from 'next/dynamic'
import { notFound, redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getMeshPointBalance } from '@/app/actions/mesh-point'
import { getPublisherWallet } from '@/app/actions/publisher'
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
      const publisherAddress = unlockPolicy[0].publisher?.admin?.wallet
      if (!unlockPolicy.length || !isHexAddress(publisherAddress)) notFound()

      return (
        <AlchemyAuth
          hasAlchemyAccount={hasAlchemyAccount}
          renderComponent={
            <PaymentInfo
              unlockPolicy={unlockPolicy}
              storyId={targetId}
              balance={balance}
              recipientAddress={publisherAddress}
            />
          }
        />
      )
    }
    case PaymentType.Sponsor: {
      const publisher = await getPublisherWallet(targetId)
      const publisherAddress = publisher?.admin?.wallet
      if (!publisher || !isHexAddress(publisherAddress)) notFound()
      return (
        <AlchemyAuth
          hasAlchemyAccount={hasAlchemyAccount}
          renderComponent={
            <SponsorshipInfo
              publisher={publisher}
              balance={balance}
              recipientAddress={publisherAddress}
            />
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

function isHexAddress(
  address: string | null | undefined
): address is `0x${string}` {
  if (!address) return false
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
