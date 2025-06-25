import {
  getAnswerWithProgress,
  searchWithHybrid,
} from '@/app/actions/hybrid-search'
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
}: {
  params: { query: string }
}) {
  const { query } = params
  const decodedQuery = decodeURIComponent(query)
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
      baseSearchOptions
    ),
    story: searchWithHybrid(decodedQuery, 'STORY', baseSearchOptions),
    collection: searchWithHybrid(decodedQuery, 'COLLECTION', baseSearchOptions),
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
      />
    </main>
  )
}
