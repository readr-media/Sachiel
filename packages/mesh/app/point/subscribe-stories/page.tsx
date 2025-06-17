import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getMemberUnlockStories } from '@/app/actions/subscribe-stories'

import SubscribeStoriesList from '../_components/subscribe-stories-list'

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
        <div className="flex h-[calc(100vh-124px)] items-center justify-center bg-multi-layer-light sm:h-[calc(100vh-445px)] sm:bg-transparent">
          <p className="button-large w-dvw text-center text-primary-400">
            目前還沒有訂閱中的文章
          </p>
        </div>
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
