import { useMemo } from 'react'

import { type LatestStoriesInfo, type Story } from '../page'
import DesktopInfiniteStories from './desktop-infinite-stories'
import HeroStoryCard from './hero-story-card'
import MostPickedStoryCard from './most-picked-story-card'
import PublisherCard, { type DisplayPublisher } from './publisher-card'
import StoryCard from './story-card'

export default function DesktopStories({
  mostPickedStory,
  displayPublishers,
  followingMemberIds,
  latestStoriesInfo,
}: {
  mostPickedStory: Story | null | undefined
  displayPublishers: DisplayPublisher[]
  followingMemberIds: Set<string>
  latestStoriesInfo: LatestStoriesInfo
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
            <HeroStoryCard
              key={story.id}
              story={story}
              followingMemberIds={followingMemberIds}
            />
          ) : (
            <StoryCard
              key={story.id}
              story={story}
              className={i >= firstSectionCount - 2 ? 'border-b-0' : ''}
              followingMemberIds={followingMemberIds}
            />
          )
        )}
      </section>
      {mostPickedStory && (
        <MostPickedStoryCard
          story={mostPickedStory}
          isDesktop={true}
          followingMemberIds={followingMemberIds}
        />
      )}
      <div className="flex gap-10 p-10 pb-15">
        <section className="w-[600px] flex-shrink-0">
          <DesktopInfiniteStories
            latestStoriesInfo={{
              ...latestStoriesInfo,
              stories: secondSectionStories,
              totalCount: latestStoriesInfo.totalCount - firstSectionCount,
            }}
            followingMemberIds={followingMemberIds}
          />
        </section>
        <aside className="flex flex-col gap-3">
          {displayPublishers.map((displayPublisher) => (
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
