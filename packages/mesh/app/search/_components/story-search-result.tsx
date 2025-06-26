import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { useState } from 'react'

import { searchStoriesWithPagination } from '@/app/actions/search-stories-pagination'
import type { GetStoriesCommentCountsQuery } from '@/graphql/__generated__/graphql'
import { type SearchResults } from '@/utils/data-schema'

import StoryCard from './story-card'

type StorySearchResultProps = {
  query: string
  initialStories: SearchResults['story']
  totalCount: number
  currentSort: 'relevance' | 'published_at'
  storiesGQLData?: GetStoriesCommentCountsQuery['stories']
}

const PAGE_SIZE = 20
const MAX_ELEMENTS = 200 // Reasonable limit for performance

export default function StorySearchResult({
  query,
  initialStories,
  totalCount,
  currentSort,
  storiesGQLData,
}: StorySearchResultProps) {
  const [hasMoreData, setHasMoreData] = useState(true)
  const isNoResult = !initialStories.length && totalCount === 0

  // Function to fetch more stories for pagination
  const fetchMoreStories = async (
    pageIndex: number
  ): Promise<SearchResults['story']> => {
    if (!hasMoreData) return []

    try {
      const newStories = await searchStoriesWithPagination(
        query,
        pageIndex,
        PAGE_SIZE,
        currentSort,
        storiesGQLData
      )

      // If we get fewer stories than page size, we've reached the end
      if (newStories.length < PAGE_SIZE) {
        setHasMoreData(false)
      }
      console.log({ newStories })
      return newStories
    } catch (error) {
      console.error('Error fetching more stories:', error)
      setHasMoreData(false)
      return []
    }
  }

  if (isNoResult) {
    return (
      <p className="pt-3 text-primary-500 sm:pt-5">
        找不到包含「
        <span className="text-primary-700">{query}</span>
        」的新聞，請換個關鍵字，再試一次。
      </p>
    )
  }

  return (
    <>
      <h2 className="list-title pb-3 pt-4 sm:pb-4 sm:pt-5">所有新聞</h2>
      <InfiniteScrollList
        initialList={initialStories}
        pageSize={PAGE_SIZE}
        amountOfElements={Math.min(totalCount, MAX_ELEMENTS)}
        fetchListInPage={fetchMoreStories}
        isAutoFetch={true}
      >
        {(renderList) => (
          <>
            {renderList.map((story, idx) => (
              <StoryCard
                key={story.id}
                story={story}
                extra={idx === 0 ? 'pt-0 pb-5' : 'py-5'}
              />
            ))}
          </>
        )}
      </InfiniteScrollList>
    </>
  )
}
