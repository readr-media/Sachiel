import InteractiveIcon from '@/components/interactive-icon'
import type { CategoryStory } from '@/types/homepage'

import StoryCard from '../story-card'
import MainCard from './main-card'

type Props = {
  followingMembers: Set<string>
  stories: CategoryStory[]
  activeTitle: string
}

export default function StorySection({
  activeTitle,
  stories,
  followingMembers,
}: Props) {
  return (
    <div>
      <div className="group flex items-center pb-3 pt-2 lg:pb-4">
        <h3 className="list-title text-primary-700">{activeTitle}</h3>
        <InteractiveIcon
          size={{ width: 36, height: 36 }}
          icon={{
            default: 'icon-navigate-next',
            hover: 'icon-navigate-next-hover',
          }}
        />
      </div>

      <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-10">
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
      </div>
    </div>
  )
}
