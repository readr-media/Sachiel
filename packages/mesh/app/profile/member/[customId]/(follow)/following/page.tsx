import { getCurrentUser } from '@/app/actions/auth'
import { getMemberFollowingList } from '@/app/actions/get-profile'
import EmptyFollowStatus from '@/app/profile/_components/empty-follow-status'
import { takeCount } from '@/constants/profile-following'
import type { GetMemberFollowingListQuery } from '@/graphql/__generated__/graphql'

import type { PageProps } from '../../page'
import FollowingList from './_components/following-list'

export type FollowingListType = NonNullable<
  NonNullable<GetMemberFollowingListQuery['member']>['following']
>

export type FollowingPublisherListType = NonNullable<
  NonNullable<GetMemberFollowingListQuery['member']>['follow_publisher']
>

const FollowingPage = async ({ params: { customId } }: PageProps) => {
  const user = await getCurrentUser()
  const response = await getMemberFollowingList(customId, takeCount)
  const isVisitor = customId !== user?.customId
  const followPublisherResponse = response?.member?.follow_publisher || []
  const followPublisherCount = response?.member?.follow_publisher_count || 0
  const followResponse = response?.member?.following || []
  const followCount = response?.member?.followingCount || 0
  const followPublisherData = followPublisherResponse.map((followItem) => {
    return {
      ...followItem,
      avatar: followItem.logo,
      name: followItem.title,
    }
  })
  const hasPublisherData = !!followPublisherResponse.length
  const hasFollowingData = !!followResponse.length

  if (!hasPublisherData && !hasFollowingData) {
    return (
      <EmptyFollowStatus
        content={
          isVisitor ? '這個人還沒有追蹤中的對象' : '目前還沒有追蹤中的對象'
        }
      />
    )
  }
  return (
    <main className="flex max-w-[theme(width.maxMain)] grow flex-col items-center sm:gap-5 sm:p-5 md:px-[70px] md:py-10 lg:px-10 xl:w-maxMain">
      <FollowingList
        title="媒體"
        publisherCustomId={customId}
        followingList={followPublisherData}
        followingCount={followPublisherCount}
        defaultToggle={false}
        type="publisher"
      />
      <FollowingList
        title="人物"
        publisherCustomId={customId}
        followingList={followResponse}
        followingCount={followCount}
        defaultToggle={true}
        type="member"
      />
    </main>
  )
}

export default FollowingPage
