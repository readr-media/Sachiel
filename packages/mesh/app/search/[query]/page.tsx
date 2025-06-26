import { getCollections } from '@/app/actions/collection'
import { getPublishers } from '@/app/actions/get-profile'
import {
  getAnswerWithProgress,
  searchWithHybrid,
} from '@/app/actions/hybrid-search'
import { getStoriesCommentCounts } from '@/app/actions/story'
import { MISO_ORDER_BY } from '@/constants/miso'
import type { HybridSearchResponse } from '@/types/miso'
import processAnswerText from '@/utils/miso-ask-process'

import SearchResult from '../_components/search-result'
// 定義搜尋結果
export type SearchResult = {
  success: boolean
  data: HybridSearchResponse | null
  error: Error | null
}

// 定義搜尋類型
export type SearchType = 'story' | 'collection' | 'member-publisher'

export default async function SearchResultPage({
  params,
  searchParams,
}: {
  params: { query: string }
  searchParams: { sort?: string }
}) {
  const { query } = params
  const { sort } = searchParams
  const decodedQuery = decodeURIComponent(query)

  // Validate and set sort parameter
  const validSorts = ['relevance', 'published_at'] as const
  const sortBy = validSorts.includes(sort as typeof validSorts[number])
    ? (sort as typeof validSorts[number])
    : 'published_at'
  const orderBy =
    sortBy === 'relevance'
      ? MISO_ORDER_BY.RELEVANCE
      : MISO_ORDER_BY.PUBLISHED_AT

  const baseSearchOptions = {
    rows: 20,
  }
  // 建立搜尋 promises
  const searchPromises: Record<
    SearchType,
    Promise<HybridSearchResponse | null>
  > = {
    'member-publisher': searchWithHybrid(
      decodedQuery,
      'USER_AND_PUBLISHER_PROFILE',
      { ...baseSearchOptions, order_by: MISO_ORDER_BY.RELEVANCE }
    ),
    story: searchWithHybrid(decodedQuery, 'STORY', {
      ...baseSearchOptions,
      order_by: orderBy,
    }),
    collection: searchWithHybrid(decodedQuery, 'COLLECTION', {
      ...baseSearchOptions,
      order_by: orderBy,
    }),
  }

  // 把每個promise都放入
  const settledResults = await Promise.allSettled(Object.values(searchPromises))
  const searchPromisesKeys = Object.keys(searchPromises) as SearchType[]

  const hybridSearchResults: Record<SearchType, SearchResult> =
    searchPromisesKeys.reduce((acc, key, index) => {
      const result = settledResults[index]
      acc[key] = {
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? (result.reason as Error) : null,
      }
      return acc
    }, {} as Record<SearchType, SearchResult>)

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
        currentSort={sortBy}
      />
    </main>
  )
}
