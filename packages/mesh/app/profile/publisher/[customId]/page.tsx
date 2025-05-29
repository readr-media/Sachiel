import { notFound } from 'next/navigation'

import {
  getPublisherProfileJSON,
  getPublisherStoryType,
} from '@/app/actions/get-publisher-profile'
import MisoPageView from '@/components/miso-page-view'
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
  const [profileJSON, publisherStoryType] = await Promise.all([
    getPublisherProfileJSON(customId),
    getPublisherStoryType(customId),
  ])

  if (!profileJSON) return notFound()

  const { source, stories, podcasts } = profileJSON
  const userName = source.title || '使用者名稱'
  const userLogo = source.logo || ''
  const userIntro = source.description || '使用者介紹'
  const publisherId = source.id
  const storyData =
    stories.map((data) => ({
      ...data,
      source: {
        id: source.id,
        title: source.title,
      },
    })) || []
  const convertedFollowerCount = formatFollowCount(source.followerCount)
  const convertedSponsoredCount = formatFollowCount(source.sponsoredCount)
  const pickedCount = parseInt(formatFollowCount(source.picksCount))

  return (
    <div className="flex grow flex-col">
      <MisoPageView productIds={`publisher_${customId}`} />
      <PublisherPage
        pickedCount={pickedCount}
        sponsoredCount={convertedSponsoredCount}
        followerCount={convertedFollowerCount}
        name={userName}
        avatar={userLogo}
        intro={userIntro}
        publisherCustomId={customId}
        publisherId={publisherId}
        publisherStoryType={publisherStoryType}
        userType={userType}
        storyData={storyData}
        podcastData={podcasts}
        source={source}
      />
    </div>
  )
}

export default Page
