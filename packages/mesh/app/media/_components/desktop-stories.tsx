import { useMemo } from 'react'

import DesktopInfiniteStories from './desktop-infinite-stories'
import HeroStoryCard from './hero-story-card'
import type {
  DisplayPublisher,
  LatestStoriesInfo,
  Story,
} from './media-stories'
import MostPickedStoryCard from './most-picked-story-card'
import PublisherCard from './publisher-card'
import StoryCard from './story-card'

export default function DesktopStories({
  mostPickedStory,
  publishers,
  latestStoriesInfo,
  loadMoreLatestStories,
}: {
  mostPickedStory: Story | null | undefined
  publishers: DisplayPublisher[]
  latestStoriesInfo: LatestStoriesInfo
  loadMoreLatestStories: () => void
}) {
  const { stories } = latestStoriesInfo
  const firstSectionCount = 5
  const [firstSectionStories, secondSectionStories] = useMemo(() => {
    return [
      stories?.slice(0, firstSectionCount),
      stories.slice(firstSectionCount),
    ]
  }, [stories])

  return (
    <div className="hidden lg:block">
      <section className="grid gap-x-10 p-10 pt-0">
        {firstSectionStories.map((story, i) =>
          i === 0 ? (
            <HeroStoryCard key={story.id} story={story} />
          ) : (
            <StoryCard
              key={story.id}
              story={story}
              className={i >= firstSectionCount - 2 ? 'border-b-0' : ''}
            />
          )
        )}
      </section>
      {mostPickedStory && (
        <MostPickedStoryCard story={mostPickedStory} isDesktop={true} />
      )}
      <div className="flex gap-10 p-10 pb-15">
        <section className="w-[600px] shrink-0">
          <DesktopInfiniteStories
            key={latestStoriesInfo.stories.length}
            latestStoriesInfo={{
              ...latestStoriesInfo,
              stories: secondSectionStories,
              totalCount: latestStoriesInfo.totalCount - firstSectionCount,
            }}
            loadMoreLatestStories={loadMoreLatestStories}
          />
        </section>
        <aside className="flex flex-col gap-3">
          {publishers.map((displayPublisher) => (
            <PublisherCard
              key={displayPublisher.id}
              publisher={displayPublisher}
            />
          ))}
        </aside>
      </div>
    </div>
  )
}
