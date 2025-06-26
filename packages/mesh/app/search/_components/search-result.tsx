'use client'
import { useState } from 'react'

import {
  type FilterType,
  type SearchResultType,
  type SearchType,
  MISO_SEARCH_FILTERS,
} from '@/constants/miso'
import type {
  GetCollectionsQuery,
  GetPublishersQuery,
  GetStoriesCommentCountsQuery,
} from '@/graphql/__generated__/graphql'
import type { AnswerResponse } from '@/types/miso'

import HybridSearch from './hybrid-search'
import SearchFilter from './search-filter'

type SearchResultsProps = {
  hybridSearchResults: Record<SearchType, SearchResultType>
  misoAskResult: null | AnswerResponse
  query: string
  collectionsGQLData?: GetCollectionsQuery['collections']
  publisherGQLData?: GetPublishersQuery['publishers']
  storiesGQLData?: GetStoriesCommentCountsQuery['stories']
  currentStorySort: 'relevance' | 'published_at'
  currentCollectionSort: 'relevance' | 'published_at'
}
export type filterType = FilterType

export default function SearchResult({
  query,
  hybridSearchResults,
  misoAskResult,
  collectionsGQLData,
  publisherGQLData,
  storiesGQLData,
  currentStorySort,
  currentCollectionSort,
}: SearchResultsProps) {
  const [activeFilter, setActiveFilter] = useState<filterType['id']>(
    MISO_SEARCH_FILTERS[0].id
  )
  return (
    <div>
      <SearchFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <HybridSearch
        activeFilter={activeFilter}
        query={query}
        hybridSearchResults={hybridSearchResults}
        misoAskResult={misoAskResult}
        collectionsGQLData={collectionsGQLData}
        publisherGQLData={publisherGQLData}
        storiesGQLData={storiesGQLData}
        currentStorySort={currentStorySort}
        currentCollectionSort={currentCollectionSort}
      />
    </div>
  )
}
