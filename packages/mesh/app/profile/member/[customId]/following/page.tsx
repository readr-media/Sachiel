import { getCurrentUser } from '@/app/actions/auth'
import EmptyFollowStatus from '@/app/profile/_components/empty-follow-status'
import type { GetMemberFollowingListQuery } from '@/graphql/__generated__/graphql'
import { GetMemberFollowingListDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import { type PageProps } from '../page'
import FollowingList from './_components/following-list'

export type FollowingListType = NonNullable<
  GetMemberFollowingListQuery['member']
>['following']

export type FollowingPublisherListType = NonNullable<
  GetMemberFollowingListQuery['member']
>['follow_publisher']

const FollowingPage = async ({ params }: PageProps) => {
  const takeCount = 20
  const user = await getCurrentUser()
  const response = await fetchGraphQL(GetMemberFollowingListDocument, {
    customId: params.customId,
    take: takeCount,
  })
  const isVisitor = params.customId !== user?.customId
  const followPublisherResponse = response?.member?.follow_publisher || []
  const followResponse = response?.member?.following || []
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
    <div className="flex max-w-[1120px] grow flex-col items-center sm:gap-5 sm:p-5 md:px-[70px] md:py-10 xl:w-maxMain">
      <FollowingList
        title="媒體"
        followingList={followPublisherData as FollowingListType}
        defaultToggle={false}
        type="publisher"
      />
      <FollowingList
        title="人物"
        followingList={followResponse}
        defaultToggle={true}
        type="member"
      />
    </div>
  )
}

export default FollowingPage
