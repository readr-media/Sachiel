import { fetchRecentReadrStory } from '@/app/actions/get-homepage'
import AdSense from '@/components/ad/google-adsense/adsense-ad'

import FeaturedCard from './featured-card'

export default async function ReadrStory() {
  const data = await fetchRecentReadrStory()
  if (!data) return null
  const story = data.stories[0]
  const customId = data.customId
  const publisher = data.title
  const publisherId = data.id

  return (
    <>
      <FeaturedCard
        isReadrStory={true}
        pageType="homepage"
        story={story}
        customId={customId}
        publisher={publisher}
        publisherId={publisherId}
        gtmTags={{
          story: 'GTM-homepage_click_readr_latest_ article',
          pick: 'GTM-homepage_pick_readr_latest_ article',
        }}
      />
      <AdSense pageKey="homepage" adKey="A3" className="mt-5 lg:mt-10" />
    </>
  )
}
