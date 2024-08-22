import { GetPublisherProfileDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { formatFollowCount } from '@/utils/format-follow-count'

import PublisherPage from './_component/publisher-page'

export type PageProps = {
  params: {
    publisherId: string
  }
}
const page = async ({ params }: PageProps) => {
  const publisherId = params.publisherId
  const takesCount = 20
  const userType = 'publisher'

  const response = await queryGraphQL(GetPublisherProfileDocument, {
    publisherId,
    takes: takesCount,
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
  // 使用publishers因為query publisher的where沒有提供customId的篩選
  const userData = response.publishers && response.publishers[0]
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
  const userLogo = userData.logo || ''
  const userIntro = userData.description || '使用者介紹'
  const storyData = response.stories || []
  const followerCount = userData.followerCount || 0
  const convertedFollowerCount = formatFollowCount(followerCount)
  // TODO: wait for api
  const convertedSponsoredCount = formatFollowCount(999999)
  // TODO: wait for api
  const pickedCount = 100
  return (
    <main className="flex grow flex-col">
      <PublisherPage
        pickedCount={pickedCount}
        sponsoredCount={convertedSponsoredCount}
        followerCount={convertedFollowerCount}
        name={userName}
        avatar={userLogo}
        intro={userIntro}
        publisherId={publisherId}
        userType={userType}
        storyData={storyData}
      />
    </main>
  )
}

export default page
