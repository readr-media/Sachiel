import {
  GetMemberProfileDocument,
  GetMemberProfileQuery,
  GetVisitorProfileDocument,
  GetVisitorProfileQuery,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import MemberPage from './_components/member-page'
import VisitorPage from './_components/visitor-page'

type PageProps = {
  params: {
    userId: string
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
  const visitID = params.userId
  const isVisitor = searchParams.user !== visitID
  const userType = isVisitor ? 'visitor' : 'member'
  const fetchGraphQLByIdentify: FetchGraphQLByIdentify = async (
    isVisitor: boolean
  ) => {
    if (isVisitor) {
      const response = await fetchGraphQL(GetVisitorProfileDocument, {
        memberId: visitID,
      })
      if (response === null) {
        throw new Error('Failed to fetch visitor profile')
      }
      return response
    } else {
      const response = await fetchGraphQL(GetMemberProfileDocument, {
        memberId: visitID,
      })
      if (response === null) {
        throw new Error('Failed to fetch member profile')
      }
      return response
    }
  }
  const response = await fetchGraphQLByIdentify(isVisitor)
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
  const hasContent = picksData.length > 0 || bookmarkData.length > 0
  const contentHeight = hasContent
    ? 'h-full'
    : 'min-h-screen-without-header-nav sm:min-h-sm-screen-without-header-footer'

  return (
    // TODO: change to grow
    <main className={`flex ${contentHeight}  flex-col bg-white`}>
      {isVisitor ? (
        <VisitorPage
          name={userData.name || ''}
          avatar={userData.avatar || ''}
          intro={userData.intro || ''}
          pickCount={userData.pickCount || 0}
          followingCount={userData.followingCount || 0}
          followerCount={userData.followerCount || 0}
          userType={userType}
          picksData={picksData}
          visitID={visitID}
        />
      ) : (
        <MemberPage
          name={userData.name || ''}
          avatar={userData.avatar || ''}
          intro={userData.intro || ''}
          pickCount={userData.pickCount || 0}
          followingCount={userData.followingCount || 0}
          followerCount={userData.followerCount || 0}
          userType={userType}
          picksData={picksData}
          bookmarkData={bookmarkData}
          visitID={visitID}
        />
      )}
    </main>
  )
}

export default page
