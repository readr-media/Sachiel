import type { CategoryStory } from '@/types/homepage'

import StoryCard from '../story-card'
import MainCard from './main-card'

type Props = {
  followingMembers: Set<string>
  stories: CategoryStory[]
}

export default function StorySection({ stories, followingMembers }: Props) {
  return (
    <section className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-10">
      <MainCard story={stories[0]} followingMembers={followingMembers} />

      <div className="flex flex-col gap-y-5">
        {stories.slice(1, 4).map((story) => (
          <StoryCard
            followingMembers={followingMembers}
            story={story}
            key={story.id}
          />
        ))}
      </div>
    </section>
  )
}
