import { notFound } from 'next/navigation'

import {
  getPublisherPodcasts,
  publisherStoriesFn,
} from '@/app/actions/get-publisher-profile'
import { formatFollowCount } from '@/utils/format-follow-count'

import PublisherPage from './_component/publisher-page'

export type PageProps = {
  params: {
    customId: string
  }
}

const Page = async ({ params }: PageProps) => {
  const { customId } = params
  const userType = 'publisher'

  try {
    const storiesResponse = await publisherStoriesFn(customId)
    const podcastData = await getPublisherPodcasts({
      customId,
      takes: 10,
      start: 0,
    })

    if (!storiesResponse) {
      notFound()
    }

    const userData = storiesResponse?.source
    const userName = userData?.title || '使用者名稱'
    const userLogo = userData?.logo || ''
    const userIntro = userData?.description || '使用者介紹'
    const followerCount = userData?.followerCount || 0
    const publisherId = storiesResponse.source.id

    const storyData =
      storiesResponse?.stories?.map((data) => ({
        ...data,
        source: {
          id: userData.id,
          title: userData.title,
        },
      })) || []
    const convertedFollowerCount = formatFollowCount(followerCount)
    const convertedSponsoredCount = formatFollowCount(userData.sponsoredCount)
    const pickedCount = parseInt(formatFollowCount(userData.picksCount ?? 0))

    return (
      <div className="flex grow flex-col">
        <PublisherPage
          pickedCount={pickedCount}
          sponsoredCount={convertedSponsoredCount}
          followerCount={convertedFollowerCount}
          name={userName}
          avatar={userLogo}
          intro={userIntro}
          publisherCustomId={customId}
          publisherId={publisherId}
          userType={userType}
          storyData={storyData}
          podcastData={podcastData}
        />
      </div>
    )
  } catch (error) {
    console.error('Error fetching publisher data:', error)
    notFound()
  }
}

export default Page
