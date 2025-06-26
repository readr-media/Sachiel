import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { useState } from 'react'

import { searchWithPagination } from '@/app/actions/search-pagination'
import {
  generateNoResultsMessage,
  MISO_ORDER_BY,
  MISO_SEARCH_PAGINATION,
} from '@/constants/miso'
import type { GetCollectionsQuery } from '@/graphql/__generated__/graphql'
import { type SearchResults } from '@/utils/data-schema'

import CollectionCard from './collection-card'

type CollectionSearchResultProps = {
  query: string
  initialCollections: SearchResults['collection']
  totalCount: number
  currentSort: 'relevance' | 'published_at'
  collectionsGQLData?: GetCollectionsQuery['collections']
}

export default function CollectionSearchResult({
  query,
  initialCollections,
  totalCount,
  currentSort,
  collectionsGQLData,
}: CollectionSearchResultProps) {
  const [hasMoreData, setHasMoreData] = useState(true)
  const isNoResult = !initialCollections.length && totalCount === 0

  // Function to fetch more collections for pagination
  const fetchMoreCollections = async (
    pageIndex: number
  ): Promise<SearchResults['collection']> => {
    if (!hasMoreData) return []

    try {
      // Map currentSort to MISO_ORDER_BY constants
      const orderBy =
        currentSort === MISO_ORDER_BY.PUBLISHED_AT
          ? 'PUBLISHED_AT'
          : 'RELEVANCE'

      const newCollections = (await searchWithPagination(
        'COLLECTION',
        query,
        pageIndex,
        MISO_SEARCH_PAGINATION.PAGE_SIZE,
        orderBy,
        collectionsGQLData
      )) as SearchResults['collection']

      // If we get fewer collections than page size, we've reached the end
      if (newCollections.length < MISO_SEARCH_PAGINATION.PAGE_SIZE) {
        setHasMoreData(false)
      }

      return newCollections
    } catch (error) {
      console.error('Error fetching more collections:', error)
      setHasMoreData(false)
      return []
    }
  }

  if (isNoResult) {
    return (
      <p className="pt-3 text-primary-500 sm:pt-5">
        {generateNoResultsMessage(query, '集錦')}
      </p>
    )
  }

  return (
    <InfiniteScrollList
      key={currentSort}
      initialList={initialCollections}
      pageSize={MISO_SEARCH_PAGINATION.PAGE_SIZE}
      amountOfElements={Math.min(
        totalCount,
        MISO_SEARCH_PAGINATION.MAX_ELEMENTS
      )}
      fetchListInPage={fetchMoreCollections}
      isAutoFetch={true}
    >
      {(renderList) => (
        <div className="grid grid-cols-2 gap-3 border-t-[0.5px] border-primary-100 pt-4 sm:grid-cols-4 xl:grid-cols-5 [&>*]:w-full">
          {renderList.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </InfiniteScrollList>
  )
}
