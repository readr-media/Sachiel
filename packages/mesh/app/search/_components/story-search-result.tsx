import { type SearchResults } from '@/utils/data-schema'

import StoryCard from './story-card'

export default function StorySearchResult({
  query,
  storyResult,
}: {
  query: string
  storyResult: SearchResults['story']
}) {
  const isNoResult = !storyResult.length

  return (
    <>
      {storyResult.length ? (
        <>
          <h2 className="list-title pb-3 pt-4 sm:pb-4 sm:pt-5">所有新聞</h2>
          {storyResult.map((story, idx) => (
            <StoryCard
              key={story.id}
              story={story}
              extra={idx === 0 ? 'pt-0 pb-5' : 'py-5'}
            />
          ))}
        </>
      ) : null}
      {isNoResult ? (
        <p className="pt-3 text-primary-500 sm:pt-5">
          找不到包含「
          <span className="text-primary-700">{query}</span>
          」的新聞，請換個關鍵字，再試一次。
        </p>
      ) : null}
    </>
  )
}
