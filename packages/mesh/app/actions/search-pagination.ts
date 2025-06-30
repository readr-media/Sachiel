'use server'

import { searchWithHybrid } from '@/app/actions/hybrid-search'
import { MISO_ORDER_BY, MISO_SEARCH_PAGINATION } from '@/constants/miso'
import type {
  GetCollectionsQuery,
  GetStoriesCommentCountsQuery,
} from '@/graphql/__generated__/graphql'
import type { SearchResults } from '@/utils/data-schema'
import {
  convertMisoToCollection,
  convertMisoToStory,
} from '@/utils/miso-response-mapper'

type OrderByType = keyof typeof MISO_ORDER_BY

/**
 * Search stories with pagination support for infinite scroll
 */
export async function searchWithPagination(
  searchType: 'STORY',
  query: string,
  pageIndex: number,
  pageSize: number,
  orderBy: OrderByType,
  gqlData?: GetStoriesCommentCountsQuery['stories']
): Promise<SearchResults['story']>

/**
 * Search collections with pagination support for infinite scroll
 */
export async function searchWithPagination(
  searchType: 'COLLECTION',
  query: string,
  pageIndex: number,
  pageSize: number,
  orderBy: OrderByType,
  gqlData?: GetCollectionsQuery['collections']
): Promise<SearchResults['collection']>

export async function searchWithPagination(
  searchType: 'STORY' | 'COLLECTION',
  query: string,
  pageIndex: number,
  pageSize: number = MISO_SEARCH_PAGINATION.PAGE_SIZE,
  orderBy: OrderByType = 'RELEVANCE',
  gqlData?:
    | GetStoriesCommentCountsQuery['stories']
    | GetCollectionsQuery['collections']
): Promise<SearchResults['story'] | SearchResults['collection']> {
  try {
    // Calculate offset for pagination (pageIndex is 1-based)
    const start = (pageIndex - 1) * pageSize

    // Call the hybrid search API with pagination parameters
    const response = await searchWithHybrid(query, searchType, {
      rows: pageSize,
      start,
      order_by:
        orderBy === 'PUBLISHED_AT' ? MISO_ORDER_BY.PUBLISHED_AT : undefined,
    })

    if (!response) {
      return []
    }

    // Convert Miso response based on search type
    if (searchType === 'STORY') {
      const stories = convertMisoToStory(
        response,
        gqlData as GetStoriesCommentCountsQuery['stories']
      )
      return stories
    } else if (searchType === 'COLLECTION') {
      const { collectionResult } = convertMisoToCollection(
        response,
        gqlData as GetCollectionsQuery['collections']
      )
      return collectionResult
    }

    return []
  } catch (error) {
    console.error(
      `Failed to search ${searchType.toLowerCase()}s with pagination:`,
      error
    )
    return []
  }
}
