import {
  GetMemberFollowingListDocument,
  GetMemberFollowingListQuery,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import { PageProps } from '../page'
import FollowingPublisherList from './_components/following-publisher-list'

export type FollowingListType = NonNullable<
  GetMemberFollowingListQuery['member']
>['following']

export type FollowingPublisherListType = NonNullable<
  GetMemberFollowingListQuery['member']
>['follow_publisher']

const FollowerList = async ({ params }: PageProps) => {
  const response = await fetchGraphQL(GetMemberFollowingListDocument, {
    customId: params.userId,
  })
  const followPublisherResponse = response?.member?.follow_publisher || []
  const followResponse = response?.member?.following || []
  const followPublisherData = followPublisherResponse.map((followItem) => {
    return {
      ...followItem,
      avatar: followItem.logo,
      name: followItem.title,
    }
  })

  return (
    <div className="flex flex-col bg-multi-layer-light sm:gap-5 sm:p-5">
      <FollowingPublisherList
        title="媒體"
        followingList={followPublisherData as FollowingListType}
      />
      <FollowingPublisherList title="人物" followingList={followResponse} />
    </div>
  )
}

export default FollowerList
