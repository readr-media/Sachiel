import { GetMemberFollowerListDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import { PageProps } from '../page'
import EmptyFollowingStatus from './_components/empty-following-status'
import FollowerListItem from './_components/follower-list-item'

const FollowerPage = async ({ params, searchParams }: PageProps) => {
  const takeCount = 20
  const isVisitor = params.customId !== searchParams.user
  const response = await fetchGraphQL(GetMemberFollowerListDocument, {
    customId: params.customId,
    take: takeCount,
  })
  const followList = response?.member?.follower
  if (!followList || !followList.length)
    return <EmptyFollowingStatus isVisitor={isVisitor} />
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
