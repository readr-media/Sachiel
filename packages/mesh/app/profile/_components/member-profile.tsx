import { GetMemberProfileDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import ArticleCardList from './article-card-list'
import UserIntro from './user-intro/index'

type MemberProfileProps = {
  userID: string
  visitID: string
  userType: string
}

const MemberProfile = async ({ visitID, userType }: MemberProfileProps) => {
  const response = await fetchGraphQL(GetMemberProfileDocument, {
    memberId: visitID,
  })
  // TODO: handle gql failed error
  if (!response) {
    return <div>Error</div>
  }
  const userData = response.member
  if (!userData) {
    return <div>Error</div>
  }
  const picksData = userData.picks || []
  const bookmarkData = userData.books || []
  return (
    <div className="flex h-full flex-col bg-white">
      <UserIntro
        id={userData.id}
        name={userData.name || ''}
        avatar={userData.avatar || ''}
        intro={userData.intro || ''}
        pickCount={userData.pickCount || 0}
        followingCount={userData.followingCount || 0}
        followerCount={userData.followerCount || 0}
      />
      <ArticleCardList
        picksData={picksData}
        bookmarkData={bookmarkData}
        avatar={userData.avatar || ''}
        id={visitID}
        userType={userType}
      />
    </div>
  )
}

export default MemberProfile
