'use client'

import { useEffect, useState } from 'react'

import {
  type AnswerResponse,
  type HybridSearchResponse,
  getAnswer,
  searchWithHybrid,
} from '@/app/actions/hybrid-search'
import { useUser } from '@/context/user'

interface HybridSearchProps {
  query?: string
  onResultsChange?: (results: HybridSearchResponse | null) => void
}

export default function HybridSearch({
  query,
  onResultsChange,
}: HybridSearchProps) {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<HybridSearchResponse | null>(null)

  // Answer 相關狀態
  const [answer, setAnswer] = useState<AnswerResponse | null>(null)
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
  const [answerError, setAnswerError] = useState<string | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    try {
      setIsLoading(true)
      setError(null)
      // 清空之前的答案
      setAnswer(null)
      setAnswerError(null)
      setShowAnswer(false)

      console.log('🔍 [HybridSearch] Performing search for:', searchQuery)

      const response = await searchWithHybrid(searchQuery, user?.memberId, {
        // 可以根據需求調整參數
        rows: 20,
        facets: ['custom_attributes.article:section'],
        order_by: 'relevance',
      })

      console.log('📊 [HybridSearch] Search completed:', response)
      setResults(response)

      if (onResultsChange) {
        onResultsChange(response)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed'
      console.error('❌ [HybridSearch] Search error:', err)
      setError(errorMessage)
      setResults(null)

      if (onResultsChange) {
        onResultsChange(null)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAnswer = async (questionId: string) => {
    try {
      setIsLoadingAnswer(true)
      setAnswerError(null)
      console.log('🤖 [HybridSearch] Fetching answer for question:', questionId)

      const response = await getAnswer(questionId)

      if (response) {
        console.log('📝 [HybridSearch] Answer received:', response)
        setAnswer(response)
        setShowAnswer(true)
      } else {
        setAnswerError('無法獲取答案')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to get answer'
      console.error('❌ [HybridSearch] Answer error:', err)
      setAnswerError(errorMessage)
    } finally {
      setIsLoadingAnswer(false)
    }
  }

  // 處理答案中的引用連結
  const processAnswerText = (text: string) => {
    return text.replace(
      /\[\[(\d+)\]\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-1 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors">[$1]</a>'
    )
  }

  useEffect(() => {
    if (query) {
      console.log('🔄 [HybridSearch] Query changed:', query)
      performSearch(query)
    }
  }, [query, user?.memberId])

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">搜尋發生錯誤</p>
          <p className="text-sm text-gray-500">{error}</p>
          <button
            onClick={() => query && performSearch(query)}
            className="mt-2 rounded bg-primary-700 px-4 py-2 text-white hover:bg-primary-800"
          >
            重試
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 size-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary-700"></div>
          <p className="text-gray-500">搜尋中...</p>
        </div>
      </div>
    )
  }

  if (!results || !results.data.products.length) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">
            {query ? `找不到「${query}」的相關結果` : '請輸入搜尋關鍵字'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* AI 答案區塊 */}
      {results?.data.question_id && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-900">
              <span className="rounded bg-blue-600 px-2 py-1 text-xs text-white">
                AI
              </span>
              智能答案
            </h3>
            {!showAnswer && (
              <button
                onClick={() => fetchAnswer(results.data.question_id)}
                disabled={isLoadingAnswer}
                className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoadingAnswer ? '生成中...' : '獲取 AI 答案'}
              </button>
            )}
          </div>

          {isLoadingAnswer && (
            <div className="flex items-center gap-2 text-blue-700">
              <div className="size-4 animate-spin rounded-full border-2 border-blue-300 border-t-blue-700"></div>
              <span>AI 正在分析搜尋結果...</span>
            </div>
          )}

          {answerError && (
            <div className="text-red-600">
              <p>答案生成失敗：{answerError}</p>
              <button
                onClick={() => fetchAnswer(results.data.question_id)}
                className="mt-2 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                重試
              </button>
            </div>
          )}

          {showAnswer && answer && (
            <div className="space-y-4">
              {/* 答案內容 */}
              <div
                className="prose prose-sm text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: processAnswerText(answer.data.answer),
                }}
              />

              {/* 來源文章 */}
              {answer.data.sources.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-blue-900">
                    來源文章
                  </h4>
                  <div className="grid gap-2">
                    {answer.data.sources.slice(0, 3).map((source, index) => (
                      <a
                        key={source.product_id}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-3 rounded border bg-white p-3 hover:shadow-sm"
                      >
                        {source.cover_image && (
                          <img
                            src={source.cover_image}
                            alt={source.title}
                            className="h-12 w-16 rounded object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <h5 className="truncate text-sm font-medium text-gray-900">
                            [{index + 1}] {source.title}
                          </h5>
                          <p className="text-xs text-gray-500">
                            {new Date(source.published_at).toLocaleDateString(
                              'zh-TW'
                            )}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 搜尋結果統計 */}
      <div className="text-sm text-gray-500">
        找到 {results.data.total} 筆結果，耗時 {results.data.took}ms
      </div>

      {/* 搜尋結果列表 */}
      <div className="grid gap-4">
        {results.data.products.map((product) => (
          <div
            key={product.product_id}
            className="rounded-lg border p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex gap-4">
              {product.cover_image && (
                <img
                  src={product.cover_image}
                  alt={product.title}
                  className="h-16 w-24 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <h3
                  className="mb-2 text-lg font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: product._title_with_markups || product.title,
                  }}
                />
                {product.snippet && (
                  <p
                    className="mb-2 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: product.snippet }}
                  />
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {product.published_at && (
                    <span>
                      {new Date(product.published_at).toLocaleDateString(
                        'zh-TW'
                      )}
                    </span>
                  )}
                  {product.authors && (
                    <span>
                      作者:{' '}
                      {Array.isArray(product.authors)
                        ? product.authors.join(', ')
                        : product.authors}
                    </span>
                  )}
                  {product.custom_attributes?.['article:section'] && (
                    <span className="rounded bg-gray-100 px-2 py-1">
                      {product.custom_attributes['article:section']}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Facet 資訊 */}
      {results.data.facet_counts?.facet_fields && (
        <div className="mt-6 border-t pt-4">
          <h4 className="mb-2 font-semibold">分類統計</h4>
          {Object.entries(results.data.facet_counts.facet_fields).map(
            ([field, counts]) => (
              <div key={field} className="mb-2">
                <span className="text-sm font-medium">{field}:</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {counts.map(([value, count]) => (
                    <span
                      key={value}
                      className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                    >
                      {value} ({count})
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
