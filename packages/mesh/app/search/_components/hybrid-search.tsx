'use client'

import { useEffect, useRef, useState } from 'react'

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
  const [currentQuery, setCurrentQuery] = useState<string>('')

  // Answer 相關狀態
  const [answer, setAnswer] = useState<AnswerResponse | null>(null)
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
  const [answerError, setAnswerError] = useState<string | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  // 打字機效果狀態
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const hasSearch = useRef(false)

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    // 防止重複調用相同查詢
    if (isLoading || searchQuery === currentQuery) {
      console.log(
        '🚫 [HybridSearch] Skipping duplicate search for:',
        searchQuery
      )
      return
    }

    try {
      setCurrentQuery(searchQuery)
      setIsLoading(true)
      setError(null)
      // 清空之前的答案
      setAnswer(null)
      setAnswerError(null)
      setShowAnswer(false)
      setDisplayedText('')
      setIsTyping(false)
      previousAnswerRef.current = ''

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

      // 自動獲取 AI 答案
      if (response?.data.question_id) {
        console.log(
          '🤖 [HybridSearch] Auto-fetching answer for question:',
          response.data.question_id
        )
        fetchAnswer(response.data.question_id)
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
      setDisplayedText('')
      setIsTyping(false)
      previousAnswerRef.current = ''
      console.log('🤖 [HybridSearch] Fetching answer for question:', questionId)

      // 客戶端輪詢機制
      const maxRetries = 120 // 最多輪詢 120 次（60秒）
      const pollInterval = 500 // 每 0.5 秒輪詢一次
      let attempts = 0

      while (attempts < maxRetries) {
        const response = await getAnswer(questionId)

        if (response) {
          console.log(
            `📝 [HybridSearch] Attempt ${attempts + 1}, finished: ${
              response.data.finished
            }, stage: ${response.data.answer_stage}`
          )

          // 每次都更新答案內容（觸發打字機效果）
          setAnswer(response)
          setShowAnswer(true)

          // 如果完成了，退出迴圈
          if (response.data.finished) {
            console.log('✅ [HybridSearch] Answer completed!')
            break
          }
        } else {
          console.warn('⚠️ [HybridSearch] No response received')
        }

        attempts++

        // 如果還沒完成且未達到最大重試次數，等待後繼續
        if (attempts < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, pollInterval))
        }
      }

      if (attempts >= maxRetries) {
        console.warn('⚠️ [HybridSearch] Max retries reached')
        setAnswerError('答案生成超時，請重試')
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

  // 打字機效果邏輯
  const previousAnswerRef = useRef<string>('')

  useEffect(() => {
    if (!answer?.data.answer) {
      setDisplayedText('')
      return
    }

    const fullText = processAnswerText(answer.data.answer)

    // 如果內容沒變，不需要重新打字
    if (fullText === previousAnswerRef.current) return

    // 檢查是否是內容擴展
    const isExtension =
      fullText.startsWith(previousAnswerRef.current.replace(/<[^>]*>/g, '')) ||
      previousAnswerRef.current === ''

    if (isExtension) {
      setIsTyping(true)

      // 提取純文字來計算要打字的內容
      const plainText = fullText.replace(/<[^>]*>/g, '')
      const currentPlainText = displayedText.replace(/<[^>]*>/g, '')

      if (plainText.length > currentPlainText.length) {
        let index = currentPlainText.length
        const typingSpeed = 30 // 每字符間隔 30ms

        const typeNext = () => {
          if (index < plainText.length) {
            // 找到下一個要顯示的 HTML 位置
            let htmlIndex = 0
            let plainIndex = 0

            for (let i = 0; i < fullText.length; i++) {
              if (fullText[i] === '<') {
                // 跳過整個標籤
                while (i < fullText.length && fullText[i] !== '>') i++
                htmlIndex = i + 1
              } else {
                if (plainIndex === index) {
                  htmlIndex = i + 1
                  break
                }
                plainIndex++
              }
            }

            setDisplayedText(fullText.substring(0, htmlIndex))
            index++
            setTimeout(typeNext, typingSpeed)
          } else {
            setIsTyping(false)
            previousAnswerRef.current = fullText
          }
        }

        typeNext()
      } else {
        setDisplayedText(fullText)
        setIsTyping(false)
        previousAnswerRef.current = fullText
      }
    } else {
      // 全新內容，直接重新開始打字
      setDisplayedText('')
      setIsTyping(true)

      const plainText = fullText.replace(/<[^>]*>/g, '')
      let index = 0
      const typingSpeed = 30

      const typeNext = () => {
        if (index < plainText.length) {
          let htmlIndex = 0
          let plainIndex = 0

          for (let i = 0; i < fullText.length; i++) {
            if (fullText[i] === '<') {
              while (i < fullText.length && fullText[i] !== '>') i++
              htmlIndex = i + 1
            } else {
              if (plainIndex === index) {
                htmlIndex = i + 1
                break
              }
              plainIndex++
            }
          }

          setDisplayedText(fullText.substring(0, htmlIndex))
          index++
          setTimeout(typeNext, typingSpeed)
        } else {
          setIsTyping(false)
          previousAnswerRef.current = fullText
        }
      }

      typeNext()
    }
  }, [answer?.data.answer])

  useEffect(() => {
    if (hasSearch.current) return
    console.count('search')
    if (query && query !== currentQuery) {
      console.log('🔄 [HybridSearch] Query changed:', query)
      performSearch(query)
    }
    hasSearch.current = true
  }, [currentQuery, query, user.memberId])

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

          {answer && (
            <div className="space-y-4">
              {/* 答案內容 */}
              <div className="prose prose-sm text-gray-800">
                <div
                  dangerouslySetInnerHTML={{
                    __html: displayedText,
                  }}
                />
                {/* 打字機游標 */}
                {isTyping && (
                  <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-blue-600"></span>
                )}
              </div>

              {/* 顯示答案生成階段 */}
              {!answer.data.finished && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <div className="size-3 animate-spin rounded-full border border-blue-300 border-t-blue-600"></div>
                  <span>{answer.data.answer_stage}...</span>
                </div>
              )}

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
