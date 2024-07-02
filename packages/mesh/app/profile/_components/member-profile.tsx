import {
  GetMemberProfileDocument,
  GetMemberProfileQuery,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import ArticleCardList from './article-card-list'
import UserIntro from './user-intro/index'
import { type userType } from './user-intro/types'

type MemberProfileProps = {
  userID: string
  visitID: string
  userType: userType
}

const MemberProfile = async ({ visitID, userType }: MemberProfileProps) => {
  const response = await fetchGraphQL(GetMemberProfileDocument, {
    memberId: visitID,
  })
  if (!response) {
    return <div>Error</div>
  }
  const userData = response.member
  if (!userData) {
    return <div>Error</div>
  }

  const picksData = userData.picks || []
  const bookmarkData = userData.books || []
  const hasContent = picksData.length > 0 || bookmarkData.length > 0
  const contentHeight = hasContent
    ? 'h-full'
    : 'min-h-screen-without-header-nav sm:min-h-sm-screen-without-header-footer'

  return (
    <div className={`flex ${contentHeight}  flex-col bg-white`}>
      <UserIntro
        userType={userType}
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
