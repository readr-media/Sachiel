import { GetPublisherFollowerListDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import { type PageProps } from '../page'
import EmptyFollowingStatus from './_components/empty-following-status'
import FollowerListItem from './_components/follower-list-item'

const FollowerPage = async ({ params }: PageProps) => {
  const takeCount = 20
  const response = await fetchGraphQL(GetPublisherFollowerListDocument, {
    publisherId: params.publisherId,
    takes: takeCount,
  })
  const targetPublisher = response?.publishers && response?.publishers[0]
  const followList = targetPublisher?.follower || []
  if (!followList.length) return <EmptyFollowingStatus />
  return (
    <div className="flex max-w-[1120px] grow flex-col items-center sm:gap-5  sm:p-5 md:px-[70px] md:py-10 xl:w-maxMain">
      <div className="w-full bg-white px-5 pb-3 pt-4">
        <ul className="lg:grid lg:grid-cols-2 lg:gap-x-5">
          {followList?.map(({ id, customId, avatar, name }) => {
            return (
              <FollowerListItem
                key={customId}
                followerId={id}
                followerCustomId={customId || ''}
                // TODO: Avatar change to shared components
                followerAvatar={avatar || ''}
                followerName={name || ''}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default FollowerPage
