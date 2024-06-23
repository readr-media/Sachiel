/* eslint-disable no-console */
import { GetMemberProfileDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import ArticleCardList from '../_components/article-card-list'
import UserIntro from '../_components/user-intro'

const page = async ({ params }: { params: { id: string } }) => {
  const userId = params.id

  const response = await fetchGraphQL(GetMemberProfileDocument, {
    memberId: userId,
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
    <div className="flex flex-col bg-white">
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
        id={params.id}
      />
    </div>
  )
}

export default page
