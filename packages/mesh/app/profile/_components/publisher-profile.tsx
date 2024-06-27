import { GetPublisherProfileDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import StoryCardList from './story-card-list'
import UserIntro from './user-intro/index'

type PublisherProfileProps = { visitID: string; userType: string }

const PublisherProfile = async ({
  visitID,
  userType,
}: PublisherProfileProps) => {
  const response = await fetchGraphQL(GetPublisherProfileDocument, {
    memberId: visitID,
  })

  if (!response) {
    return (
      <main>
        <div>
          <h1>Error Page</h1>
          <p>Sorry, something went wrong.</p>
        </div>
      </main>
    )
  }
  const userData = response.publisher
  if (!userData) {
    return (
      <main>
        <div>
          <h1>Error Page</h1>
          <p>Sorry, something went wrong.</p>
        </div>
      </main>
    )
  }
  const userName = userData.title || '使用者名稱'
  const userLogo = userData.logo || '/images/default-avatar-image.png'
  const userIntro = userData.description || '使用者介紹'
  const userFollowerCount = userData.followerCount || 0
  const storyData = response.stories || []
  return (
    <div className="flex h-full flex-col bg-white">
      <UserIntro
        userType={userType}
        id={userData.id}
        name={userName}
        avatar={userLogo}
        intro={userIntro}
        pickCount={null}
        followingCount={null}
        followerCount={userFollowerCount}
      />
      <StoryCardList storyData={storyData} id={visitID} userType={userType} />
    </div>
  )
}

export default PublisherProfile
