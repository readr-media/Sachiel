import InteractiveIcon from '@/components/interactive-icon'
import type { CategoryStory } from '@/types/homepage'

import StoryCard from '../story-card'
import EmptyMessage from './empty-message'
import MainCard from './main-card'

type Props = {
  stories: CategoryStory[] | null
  activeTitle: string
}

export default function StorySection({ activeTitle, stories }: Props) {
  return (
    <div>
      <div className="group flex pb-3 pt-2 lg:pb-4">
        <h3 className="list-title lg:title-1 text-primary-700">
          {activeTitle}
        </h3>
        <div className="flex items-center">
          <InteractiveIcon
            size={{ width: 24, height: 24 }}
            icon={{
              default: 'icon-navigate-next',
              hover: 'icon-navigate-next-hover',
            }}
          />
        </div>
      </div>

      {stories && stories.length > 0 ? (
        <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-10">
          <MainCard story={stories[0]} />

          <div className="flex flex-col gap-y-5">
            {stories.slice(1, 4).map((story) => (
              <StoryCard story={story} key={story.id} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyMessage />
      )}
    </div>
  )
}
