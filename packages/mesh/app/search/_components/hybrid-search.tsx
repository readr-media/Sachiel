'use client'

import { useEffect, useRef, useState } from 'react'

import Icon from '@/components/icon'
import useHybridSearchWithAnswer from '@/hooks/use-hybrid-search-with-answer'
import { displayTimeFromNow } from '@/utils/story-display'

interface HybridSearchProps {
  query?: string
}

const sortOptions = [
  { value: 'relevance', label: '相關度' },
  { value: 'date', label: '發布時間' },
  { value: 'popularity', label: '熱門度' },
]

export default function HybridSearch({ query }: HybridSearchProps) {
  const {
    // hybridSearch狀態
    isLoading: isHybridSearchLoading,
    error: hybridSearchError,
    results: hybridSearchResults,
    currentQuery,
    // AI answer狀態
    answer,
    isLoadingAnswer,
    answerError,
    displayedText,
    isTyping,
    // 操作函數
    performSearch,
    retrySearch,
    retryAnswer,
  } = useHybridSearchWithAnswer()

  const hasSearch = useRef(false)

  // 排序下拉選單狀態
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState('relevance')

  // 處理排序選擇
  const handleSortChange = (sortValue: string) => {
    setSelectedSort(sortValue)
    setIsDropdownOpen(false)
    // TODO: 重新執行搜尋with新的排序參數
  }

  // 獲取當前選中的排序標籤
  const getCurrentSortLabel = () => {
    return (
      sortOptions.find((option) => option.value === selectedSort)?.label ||
      '相關度'
    )
  }

  useEffect(() => {
    if (hasSearch.current) return
    console.count('search')
    if (query && query !== currentQuery) {
      console.log('🔄 [HybridSearch] Query changed:', query)
      performSearch(query)
    }
    hasSearch.current = true
  }, [currentQuery, query])

  if (hybridSearchError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">搜尋發生錯誤</p>
          <p className="text-sm text-gray-500">{hybridSearchError}</p>
          <button
            onClick={retrySearch}
            className="mt-2 rounded bg-primary-700 px-4 py-2 text-white hover:bg-primary-800"
          >
            重試
          </button>
        </div>
      </div>
    )
  }

  if (isHybridSearchLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 size-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary-700"></div>
          <p className="text-gray-500">搜尋中...</p>
        </div>
      </div>
    )
  }

  if (!hybridSearchResults || !hybridSearchResults.data.products.length) {
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
    <div className="space-y-6 p-4 px-5">
      {/* AI 答案區塊 */}
      {hybridSearchResults?.data.question_id && (
        <div className="flex flex-col  border border-blue-200">
          <div className="flex items-center justify-between">
            <h3 className="list-title flex items-center text-primary-700">
              <Icon iconName="icon-mesh-ai" size="xl" />由 READr Mesh AI 生成
            </h3>
            <span className="body-3 text-primary-500">瞭解更多</span>
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
                onClick={retryAnswer}
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
                  className="body-1"
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

              {/* 回答資料來源 */}
              {answer.data.sources.length > 0 && (
                <div>
                  <h4 className="caption-1 mb-2 text-primary-500">
                    回答資料來源
                  </h4>
                  <div className="flex gap-2 overflow-x-auto">
                    {answer.data.sources.slice(0, 3).map((source, index) => (
                      <a
                        key={source.product_id}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-[114px] w-[280px] min-w-[280px] flex-col gap-3 rounded-md border-primary-200 bg-primary-100 px-4 py-3"
                      >
                        <div className="flex min-w-0 flex-1 flex-col gap-y-2">
                          <p className="caption-1 flex size-5 flex-wrap items-center justify-center rounded-full bg-primary-200 text-primary-700">
                            {index + 1}
                          </p>
                          <p className="subtitle-2 line-clamp-2 text-primary-700">
                            {source.title}
                          </p>
                          <p className="caption-1 flex items-center text-primary-500">
                            {source.custom_attributes?.['og:site_name'] ??
                              '資料來源'}
                            <span className="mx-1 inline-block size-[2px] rounded-full bg-primary-500 text-center"></span>
                            <span>
                              {displayTimeFromNow(source.published_at ?? '')}
                            </span>
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
      <div className="list-title text-primary-500">
        <p>
          <span className="text-primary-700">{query}</span>
          的搜尋結果：
        </p>
        <div className="flex items-center justify-between">
          <span className="body-3">
            找到 {hybridSearchResults.data.total} 筆結果
          </span>
          <div className="flex items-center gap-1">
            <span className="button text-primary-500">排序依</span>
            <div className="relative">
              {/* 下拉觸發按鈕 */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="button flex items-center gap-1 text-primary-500 transition-colors hover:text-primary-700"
              >
                <span>{getCurrentSortLabel()}</span>
                <Icon
                  iconName="icon-down-arrow"
                  size="s"
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* 下拉選項列表 */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full z-10 mt-1 min-w-[100px] rounded-md border border-gray-200 bg-white shadow-lg">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                        selectedSort === option.value
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 搜尋結果列表 */}
      <div className="grid gap-4">
        {hybridSearchResults.data.products.map((product) => (
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
                      作者:
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
      {hybridSearchResults.data.facet_counts?.facet_fields && (
        <div className="mt-6 border-t pt-4">
          <h4 className="mb-2 font-semibold">分類統計</h4>
          {Object.entries(
            hybridSearchResults.data.facet_counts.facet_fields
          ).map(([field, counts]) => (
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
          ))}
        </div>
      )}
    </div>
  )
}
