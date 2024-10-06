import FeaturedCard from '@/app/_components/featured-card'
import { fetchCategoryStory } from '@/app/actions/get-homepage'

type Props = {
  slug: string
}

export default async function MostPickedStory({ slug }: Props) {
  const mostPickedStories = await fetchCategoryStory(slug)
  const story = mostPickedStories?.[0]
  if (!story) return null

  return (
    <FeaturedCard
      story={story}
      customId={story.source.customId}
      publisher={story.source.title}
    />
  )
}
