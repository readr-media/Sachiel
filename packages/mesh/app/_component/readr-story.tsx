import { fetchRecentReadrStory } from '@/app/actions/get-homepage'

import FeaturedCard from './featured-card'

type Props = {
  followingMembers: Set<string>
}

export default async function ReadrStory({ followingMembers }: Props) {
  const data = await fetchRecentReadrStory()
  if (!data) return null
  const story = data.stories[0]
  const customId = data.customId

  return (
    <FeaturedCard
      isReadrStory={true}
      story={story}
      customId={customId}
      followingMembers={followingMembers}
      publisher={story.title}
    />
  )
}
