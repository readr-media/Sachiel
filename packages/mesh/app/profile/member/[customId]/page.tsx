import {
  type GetMemberProfileQuery,
  type GetVisitorProfileQuery,
  GetMemberProfileDocument,
  GetVisitorProfileDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { formatFollowCount } from '@/utils/format-follow-count'

import MemberPage from './_components/member-page'
import VisitorPage from './_components/visitor-page'

export type PageProps = {
  params: {
    customId: string
    type: string
  }
  searchParams: {
    user: string
  }
}
type FetchGraphQLByIdentify = (
  isVisitor: boolean
) => Promise<GetMemberProfileQuery> | Promise<GetVisitorProfileQuery>
const page = async ({ params, searchParams }: PageProps) => {
  const customId = params.customId
  const isVisitor = searchParams.user !== customId
  const userType = isVisitor ? 'visitor' : 'member'
  const takesCount = 20
  const fetchGraphQLByIdentify: FetchGraphQLByIdentify = async (
    isVisitor: boolean
  ) => {
    if (isVisitor) {
      const response = await fetchGraphQL(GetVisitorProfileDocument, {
        customId,
        takes: takesCount,
      })
      if (response === null) {
        throw new Error('Failed to fetch visitor profile')
      }
      return response
    } else {
      const response = await fetchGraphQL(GetMemberProfileDocument, {
        customId,
        takes: takesCount,
      })
      if (response === null) {
        throw new Error('Failed to fetch member profile')
      }
      return response
    }
  }
  const response = await fetchGraphQLByIdentify(isVisitor)
  // TODO: replace for error page
  if (!response) {
    return <div>Error</div>
  }
  const userData = response.member
  if (!userData) {
    return <div>Error</div>
  }
  const picksData = userData.picks || []
  const bookmarkData =
    'books' in userData && userData.books ? userData.books : []
  const followingCount = userData.followingCount || 0
  const convertedFollowingCount = formatFollowCount(followingCount)
  const followerCount = userData.followerCount || 0
  const convertedFollowerCount = formatFollowCount(followerCount)
  return (
    <main className="flex grow flex-col">
      {isVisitor ? (
        <VisitorPage
          name={userData.name || ''}
          avatar={userData.avatar || ''}
          intro={userData.intro || ''}
          pickCount={userData.picksCount || 0}
          followingCount={convertedFollowingCount}
          followerCount={convertedFollowerCount}
          userType={userType}
          picksData={picksData}
          memberId={userData.id}
        />
      ) : (
        <MemberPage
          name={userData.name || ''}
          avatar={userData.avatar || ''}
          intro={userData.intro || ''}
          pickCount={userData.picksCount || 0}
          followingCount={convertedFollowingCount}
          followerCount={convertedFollowerCount}
          userType={userType}
          picksData={picksData}
          bookmarks={bookmarkData}
          memberId={userData.id}
        />
      )}
    </main>
  )
}

export default page
