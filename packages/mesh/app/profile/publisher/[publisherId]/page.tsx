import { GetPublisherProfileDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import PublisherPage from './_component/publisher-page'

export type PageProps = {
  params: {
    publisherId: string
  }
}
const page = async ({ params }: PageProps) => {
  const publisherId = params.publisherId
  const takesCount = 20
  const response = await fetchGraphQL(GetPublisherProfileDocument, {
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
  const storyData = response.stories || []

  return (
    <main className="flex h-full grow flex-col">
      <PublisherPage
        name={userName}
        avatar={userLogo}
        intro={userIntro}
        userId={publisherId}
        userType="publisher"
        storyData={storyData}
      />
    </main>
  )
}

export default page
