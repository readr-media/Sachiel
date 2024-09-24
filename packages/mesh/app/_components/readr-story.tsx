import { fetchRecentReadrStory } from '@/app/actions/get-homepage'

import FeaturedCard from './featured-card'

export default async function ReadrStory() {
  const data = await fetchRecentReadrStory()
  if (!data) return null
  const story = data.stories[0]
  const customId = data.customId

  return (
    <FeaturedCard
      isReadrStory={true}
      story={story}
      customId={customId}
      publisher={story.title}
    />
  )
}
