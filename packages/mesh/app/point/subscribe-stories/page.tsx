import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getMemberUnlockStories } from '@/app/actions/subscribe-stories'

import SubscribeStoriesList from '../_components/subscribe-stories-list'
import NoRecord from './_components/no-record'

export type SubscribeStories = Awaited<
  ReturnType<typeof getMemberUnlockStories>
>

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) redirect('/login')

  const pageSize = 12
  const amountOfElements = 200
  const subscribeStories = await getMemberUnlockStories(memberId, pageSize, 0)

  return (
    <>
      {subscribeStories.length === 0 ? (
        <NoRecord />
      ) : (
        <SubscribeStoriesList
          initialList={subscribeStories}
          pageSize={pageSize}
          amountOfElements={amountOfElements}
          memberId={memberId}
        />
      )}
    </>
  )
}
