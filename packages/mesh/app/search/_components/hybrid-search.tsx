'use client'

import { useEffect, useState } from 'react'

import {
  searchWithHybrid,
  type HybridSearchResponse,
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

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    try {
      setIsLoading(true)
      setError(null)
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
    <div className="space-y-4">
      <div className="text-sm text-gray-500">
        找到 {results.data.total} 筆結果，耗時 {results.data.took}ms
      </div>

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
