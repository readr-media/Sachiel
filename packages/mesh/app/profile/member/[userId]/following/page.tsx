import {
  GetMemberFollowingListDocument,
  GetMemberFollowingListQuery,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import { PageProps } from '../page'
import FollowingMemberList from './_components/following-member-list'
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
  return (
    <div>
      <FollowingPublisherList
        followingList={response?.member?.follow_publisher}
      />
      <FollowingMemberList followingList={response?.member?.following} />
    </div>
  )
}

export default FollowerList
