/* eslint-disable no-console */
import {
  type GetMemberProfileQuery,
  GetMemberProfileDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import ArticleCard from '../_components/article-card'
import Tab from '../_components/tab'
import UserIntro from '../_components/user-intro'

const page = async ({ params }: { params: { id: string } }) => {
  const userId = params.id

  const response = await fetchGraphQL(GetMemberProfileDocument, {
    memberId: userId,
  })

  if (!response) {
    return <div>Error</div>
  }
  const userData = response.member
  if (!userData) {
    return <div>Error</div>
  }
  const picksData = userData.picks || []
  console.log(picksData)
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
      <Tab />
      <ul>
        {picksData.map((pick, idx) => {
          if (!pick.story) return <></>
          return (
            <li key={pick.story?.id} className="relative">
              <ArticleCard
                data={pick.story}
                isLast={idx === picksData.length - 1}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default page
