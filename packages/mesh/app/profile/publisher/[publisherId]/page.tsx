import { notFound } from 'next/navigation'

import { publisherStoriesFn } from '@/app/actions/get-publisher-profile'
import { GetPublisherProfileDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { formatFollowCount } from '@/utils/format-follow-count'

import PublisherPage from './_component/publisher-page'

export type PageProps = {
  params: {
    publisherId: string
  }
}

const Page = async ({ params }: PageProps) => {
  const { publisherId } = params
  const userType = 'publisher'

  try {
    const storiesResponse = await publisherStoriesFn(publisherId)
    const response = await queryGraphQL(GetPublisherProfileDocument, {
      publisherId: storiesResponse?.source.id ?? '',
    })

    if (!response || !response.publisher) {
      notFound()
    }

    const userData = response.publisher
    const userName = userData.title || '使用者名稱'
    const userLogo = userData.logo || ''
    const userIntro = userData.description || '使用者介紹'
    const storyData = storiesResponse?.stories ?? []
    const followerCount = userData.followerCount || 0
    const convertedFollowerCount = formatFollowCount(followerCount)

    // TODO: 等待 API 實現
    const convertedSponsoredCount = formatFollowCount(999999)
    // TODO: 等待 API 實現
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
  } catch (error) {
    console.error('Error fetching publisher data:', error)
    notFound()
  }
}

export default Page
