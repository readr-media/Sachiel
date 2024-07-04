import { GetPublisherProfileDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import PublisherPage from './_component/publisher-page'

type PageProps = {
  params: {
    userId: string
    type: string
  }
}
const page = async ({ params }: PageProps) => {
  const userId = params.userId
  const response = await fetchGraphQL(GetPublisherProfileDocument, {
    memberId: userId,
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

  const hasContent = storyData.length > 0
  const contentHeight = hasContent
    ? 'h-full'
    : 'min-h-screen-without-header-nav sm:min-h-sm-screen-without-header-footer'

  return (
    <div className={`${contentHeight} flex flex-col bg-white`}>
      <PublisherPage
        name={userName}
        avatar={userLogo}
        intro={userIntro}
        followerCount={userFollowerCount || 0}
        userId={userId}
        userType="publisher"
        pickCount={null}
        storyData={storyData}
      />
    </div>
  )
}

export default page
