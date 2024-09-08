import { fetchMostPickedStory } from '@/app/actions/get-homepage'

import FeaturedCard from './featured-card'

type Props = {
  followingMembers: Set<string>
}

export default async function ReadrStory({ followingMembers }: Props) {
  const story = await fetchMostPickedStory()
  if (!story) return null

  return (
    <FeaturedCard
      story={story}
      followingMembers={followingMembers}
      customId={story.source.customId}
      publisher={story.source.title}
    />
  )
}
