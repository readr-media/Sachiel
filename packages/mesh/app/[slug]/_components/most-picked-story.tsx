import FeaturedCard from '@/app/_components/featured-card'
import AdSense from '@/components/ad/adsense-ad'
import type { CategoryStory } from '@/types/homepage'

import FeaturedPodcastCard from './featured-podcast-card'

type Props = {
  story: CategoryStory | undefined | null
  storyType: 'podcast' | 'story'
}

export default function MostPickedStory({ story, storyType }: Props) {
  if (!story) return null

  return (
    <div>
      <AdSense pageKey="category" adKey="B1" className="my-5 lg:mb-10" />
      {storyType === 'story' ? (
        <FeaturedCard
          story={story}
          customId={story.source.customId}
          publisher={story.source.title}
          publisherId={story.source.id}
          gtmTags={{
            story: 'GTM-categorypage_click_most_article',
            pick: 'GTM-categorypage_pick_most_article',
          }}
        />
      ) : (
        <FeaturedPodcastCard story={story} storyType={storyType} />
      )}
    </div>
  )
}
