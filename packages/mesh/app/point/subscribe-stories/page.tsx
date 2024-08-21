import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getMemberUnlockStories } from '@/app/actions/subscribe-stories'
import Icon from '@/components/icon'

import SubscribeStoriesList from '../_components/subscribe-stories-list'

export type SubscribeStories = Awaited<
  ReturnType<typeof getMemberUnlockStories>
>

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) notFound()

  const pageSize = 12
  const amountOfElements = 200
  const subscribeStories = await getMemberUnlockStories(memberId, pageSize)

  return (
    <div className="pt-0 sm:pt-[68px]">
      <div className="flex h-15 w-full flex-row items-center border-b bg-white">
        <Link href={'/point'}>
          <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
        </Link>
        <h2 className="list-title mx-auto sm:ml-6">訂閱中文章</h2>
        <div className="size-5 px-5"></div>
      </div>
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
    </div>
  )
}
