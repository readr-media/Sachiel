import { getCurrentUser } from '@/app/actions/auth'
import EmptyFollowStatus from '@/app/profile/_components/empty-follow-status'
import FollowListItem from '@/app/profile/_components/follow-list-item'
import { GetMemberFollowerListDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'

import type { PageProps } from '../page'

const FollowerPage = async ({ params }: PageProps) => {
  const takeCount = 20
  const user = await getCurrentUser()
  const isVisitor = params.customId !== user?.customId
  const response = await queryGraphQL(GetMemberFollowerListDocument, {
    customId: params.customId,
    take: takeCount,
  })
  const followList = response?.member?.follower
  const mutualFansList = response?.member?.mutualFans
  if (!followList || !followList.length)
    return (
      <EmptyFollowStatus
        content={isVisitor ? '這個人還沒有粉絲' : '目前還沒有粉絲'}
      />
    )
  return (
    <div className="flex max-w-[1120px] grow flex-col items-center sm:gap-5 sm:p-5 md:px-[70px] md:py-10 lg:px-10 xl:w-maxMain">
      <div className="w-full rounded-xl bg-white px-5 pb-3 pt-4">
        <ul className="lg:grid lg:grid-cols-2 lg:gap-x-5">
          {followList?.map(({ id, customId, avatar, name }) => {
            const isMutualFans = !!mutualFansList?.find(
              (member) => member.customId === customId
            )
            return (
              <FollowListItem
                key={customId}
                followerId={id}
                followerCustomId={customId || ''}
                followerAvatar={avatar || ''}
                followerName={name || ''}
                isMutualFans={isMutualFans}
                type="member"
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default FollowerPage
