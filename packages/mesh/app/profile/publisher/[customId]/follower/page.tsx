import EmptyFollowStatus from '@/app/profile/_components/empty-follow-status'
import FollowListItem from '@/app/profile/_components/follow-list-item'
import { GetPublisherFollowerListDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'

import { type PageProps } from '../page'

const FollowerPage = async ({ params }: PageProps) => {
  const takeCount = 20
  const response = await queryGraphQL(GetPublisherFollowerListDocument, {
    publisherId: params.customId,
    takes: takeCount,
  })
  const targetPublisher = response?.publishers && response?.publishers[0]
  const followList = targetPublisher?.follower || []
  if (!followList.length) return <EmptyFollowStatus content="目前還沒有粉絲" />
  return (
    <main className="flex max-w-[theme(width.maxMain)] grow flex-col items-center sm:gap-5  sm:p-5 md:px-[70px] md:py-10 lg:px-10 xl:w-maxMain">
      <div className="w-full rounded-xl bg-white px-5 pb-3 pt-4">
        <ul className="lg:grid lg:grid-cols-2 lg:gap-x-5">
          {followList?.map(({ id, customId, avatar, name }) => {
            return (
              <FollowListItem
                key={customId}
                followerId={id}
                followerCustomId={customId || ''}
                followerAvatar={avatar || ''}
                followerName={name || ''}
                type="publisher"
              />
            )
          })}
        </ul>
      </div>
    </main>
  )
}

export default FollowerPage
