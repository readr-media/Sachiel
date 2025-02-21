import FeaturedCard from '@/app/_components/featured-card'
import AdSense from '@/components/ad/google-adsense/adsense-ad'
import type { CategoryStory } from '@/types/homepage'

type Props = {
  story: CategoryStory | undefined
}

export default function MostPickedStory({ story }: Props) {
  if (!story) return null

  return (
    <div>
      <AdSense pageKey="category" adKey="B1" className="my-5 lg:mb-10" />
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
    </div>
  )
}
