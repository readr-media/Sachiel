import { type LatestStoriesInfo } from './media-stories'
import StoryCard from './story-card'

export default function DesktopInfiniteStories({
  latestStoriesInfo,
}: {
  latestStoriesInfo: LatestStoriesInfo
}) {
  // TODO: 導數第五個 trigger infinite scroll
  const { stories } = latestStoriesInfo

  return (
    <>
      {stories.map((story, i) => (
        <StoryCard
          key={story.id}
          className={`first-of-type:pt-0 ${
            i === stories.length - 1 ? 'last-of-type:border-b-0' : ''
          }`}
          story={story}
        />
      ))}
    </>
  )
}
