'use server'

import { searchWithHybrid } from '@/app/actions/hybrid-search'
import type { GetStoriesCommentCountsQuery } from '@/graphql/__generated__/graphql'
import type { SearchResults } from '@/utils/data-schema'
import { convertMisoToStory } from '@/utils/miso-response-mapper'

/**
 * Search stories with pagination support for infinite scroll
 * @param query - Search query string
 * @param pageIndex - Page index (1-based)
 * @param pageSize - Number of items per page
 * @param orderBy - Sort order ('relevance' | 'published_at')
 * @param storiesGQLData - Additional GraphQL data for story conversion
 * @returns Promise<SearchResults['story']> - Array of story results
 */
export async function searchStoriesWithPagination(
  query: string,
  pageIndex: number,
  pageSize: number = 20,
  orderBy: 'relevance' | 'published_at' = 'relevance',
  storiesGQLData?: GetStoriesCommentCountsQuery['stories']
): Promise<SearchResults['story']> {
  try {
    // Calculate offset for pagination (pageIndex is 1-based)
    const start = (pageIndex - 1) * pageSize

    // Call the hybrid search API with pagination parameters
    const response = await searchWithHybrid(query, 'STORY', {
      rows: pageSize,
      start,
      order_by: orderBy === 'published_at' ? 'published_at' : undefined,
    })

    if (!response) {
      return []
    }

    // Convert Miso response to story format
    const stories = convertMisoToStory(response, storiesGQLData)
    return stories
  } catch (error) {
    console.error('Failed to search stories with pagination:', error)
    return []
  }
}
