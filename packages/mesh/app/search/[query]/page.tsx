import { getCollections } from '@/app/actions/collection'
import { getPublishers } from '@/app/actions/get-profile'
import {
  getAnswerWithProgress,
  searchWithHybrid,
} from '@/app/actions/hybrid-search'
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
import processAnswerText from '@/utils/miso-ask-process'

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

  const collectionsGQLData = await getCollections({
    collectionIds:
      hybridSearchResults.collection.data?.data.products.map((product) =>
        product.product_id.replace('mesh_profile_collection_', '')
      ) ?? [],
  })

  const publisherGQLData = await getPublishers({
    publisherCustomIds:
      hybridSearchResults['member-publisher'].data?.data.products
        .filter((product) =>
          product.product_id.startsWith('mesh_profile_publisher_')
        )
        .map((product) =>
          product.product_id.replace('mesh_profile_publisher_', '')
        ) ?? [],
  })

  const storiesGQLData = await getStoriesCommentCounts({
    storyIds:
      hybridSearchResults.story.data?.data.products.map((product) =>
        product.product_id.replace('mesh_story_', '')
      ) ?? [],
  })

  // 沒有使用try catch因為error handle實作在getAnswerWithProgress
  // 如果錯誤、無資料會回傳null
  const misoAskResult = await getAnswerWithProgress(
    hybridSearchResults.story.data?.data.question_id ?? ''
  )

  const processedMisoResult = misoAskResult
    ? {
        ...misoAskResult,
        data: {
          ...misoAskResult.data,
          answer: processAnswerText(misoAskResult.data.answer ?? ''),
        },
      }
    : null

  return (
    <main>
      <SearchResult
        query={decodedQuery}
        hybridSearchResults={hybridSearchResults}
        misoAskResult={processedMisoResult}
        collectionsGQLData={collectionsGQLData?.collections}
        publisherGQLData={publisherGQLData}
        storiesGQLData={storiesGQLData}
        currentStorySort={storySortBy}
        currentCollectionSort={collectionSortBy}
      />
    </main>
  )
}
