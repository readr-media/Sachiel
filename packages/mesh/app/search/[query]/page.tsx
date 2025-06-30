import { getCollections } from '@/app/actions/collection'
import { getPublishers } from '@/app/actions/get-profile'
import { searchWithHybrid } from '@/app/actions/hybrid-search'
import { getStoriesCommentCounts } from '@/app/actions/story'
import {
  type SearchResultType,
  type SearchType,
  mapSortToOrderBy,
  MISO_BASE_SEARCH_OPTIONS,
  MISO_ORDER_BY,
  validateSortParam,
} from '@/constants/miso'
import type { HybridSearchResponse } from '@/types/miso'
import {
  extractIdsFromProductIds,
  filterProductsByType,
} from '@/utils/miso-id-parser'

import SearchResult from '../_components/search-result'

export default async function SearchResultPage({
  params,
  searchParams,
}: {
  params: { query: string }
  searchParams: { sort?: string; story_sort?: string; collection_sort?: string }
}) {
  const { query } = params
  const { sort, story_sort, collection_sort } = searchParams
  const decodedQuery = decodeURIComponent(query)

  const storySortBy = story_sort
    ? validateSortParam(story_sort)
    : validateSortParam(sort)

  const collectionSortBy = collection_sort
    ? validateSortParam(collection_sort)
    : validateSortParam(sort)

  const storyOrderBy = mapSortToOrderBy(storySortBy)
  const collectionOrderBy = mapSortToOrderBy(collectionSortBy)
  // 建立搜尋 promises
  const searchPromises: Record<
    SearchType,
    Promise<HybridSearchResponse | null>
  > = {
    'member-publisher': searchWithHybrid(
      decodedQuery,
      'USER_AND_PUBLISHER_PROFILE',
      { ...MISO_BASE_SEARCH_OPTIONS, order_by: MISO_ORDER_BY.RELEVANCE }
    ),
    story: searchWithHybrid(decodedQuery, 'STORY', {
      ...MISO_BASE_SEARCH_OPTIONS,
      order_by: storyOrderBy,
    }),
    collection: searchWithHybrid(decodedQuery, 'COLLECTION', {
      ...MISO_BASE_SEARCH_OPTIONS,
      order_by: collectionOrderBy,
    }),
  }

  // 把每個promise都放入
  const settledResults = await Promise.allSettled(Object.values(searchPromises))
  const searchPromisesKeys = Object.keys(searchPromises) as SearchType[]

  const hybridSearchResults: Record<SearchType, SearchResultType> =
    searchPromisesKeys.reduce((acc, key, index) => {
      const result = settledResults[index]
      acc[key] = {
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? (result.reason as Error) : null,
      }
      return acc
    }, {} as Record<SearchType, SearchResultType>)

  // 並行執行所有 GraphQL 查詢以減少 Total Blocking Time
  const [collectionsGQLData, publisherGQLData, storiesGQLData] =
    await Promise.allSettled([
      getCollections({
        collectionIds: extractIdsFromProductIds(
          hybridSearchResults.collection.data?.data.products.map(
            (product) => product.product_id
          ) ?? [],
          'COLLECTION'
        ),
      }),
      getPublishers({
        publisherCustomIds: extractIdsFromProductIds(
          filterProductsByType(
            hybridSearchResults['member-publisher'].data?.data.products ?? [],
            'PUBLISHER_PROFILE'
          ).map((product) => product.product_id),
          'PUBLISHER_PROFILE'
        ),
      }),
      getStoriesCommentCounts({
        storyIds: extractIdsFromProductIds(
          hybridSearchResults.story.data?.data.products.map(
            (product) => product.product_id
          ) ?? [],
          'STORY'
        ),
      }),
    ])

  // 處理 GraphQL 查詢結果
  const collectionsData =
    collectionsGQLData.status === 'fulfilled' ? collectionsGQLData.value : null
  const publisherData =
    publisherGQLData.status === 'fulfilled' ? publisherGQLData.value : null
  const storiesData =
    storiesGQLData.status === 'fulfilled' ? storiesGQLData.value : null

  const questionId = hybridSearchResults.story.data?.data.question_id ?? ''

  return (
    <main>
      <SearchResult
        query={decodedQuery}
        hybridSearchResults={hybridSearchResults}
        questionId={questionId}
        collectionsGQLData={collectionsData?.collections}
        publisherGQLData={publisherData}
        storiesGQLData={storiesData}
        currentStorySort={storySortBy}
        currentCollectionSort={collectionSortBy}
      />
    </main>
  )
}
