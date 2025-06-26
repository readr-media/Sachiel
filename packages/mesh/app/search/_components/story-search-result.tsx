import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { useState } from 'react'

import { searchWithPagination } from '@/app/actions/search-pagination'
import {
  generateNoResultsMessage,
  MISO_ORDER_BY,
  MISO_SEARCH_PAGINATION,
} from '@/constants/miso'
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
      // Map currentSort to MISO_ORDER_BY constants
      const orderBy =
        currentSort === MISO_ORDER_BY.PUBLISHED_AT
          ? 'PUBLISHED_AT'
          : 'RELEVANCE'

      const newStories = (await searchWithPagination(
        'STORY',
        query,
        pageIndex,
        MISO_SEARCH_PAGINATION.PAGE_SIZE,
        orderBy,
        storiesGQLData
      )) as SearchResults['story']

      // If we get fewer stories than page size, we've reached the end
      if (newStories.length < MISO_SEARCH_PAGINATION.PAGE_SIZE) {
        setHasMoreData(false)
      }

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
        {generateNoResultsMessage(query, '新聞')}
      </p>
    )
  }

  return (
    <>
      <h2 className="list-title pb-3 pt-4 sm:pb-4 sm:pt-5">所有新聞</h2>
      <InfiniteScrollList
        key={currentSort}
        initialList={initialStories}
        pageSize={MISO_SEARCH_PAGINATION.PAGE_SIZE}
        amountOfElements={Math.min(
          totalCount,
          MISO_SEARCH_PAGINATION.MAX_ELEMENTS
        )}
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
