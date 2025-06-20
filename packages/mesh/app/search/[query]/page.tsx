'use client'

import type { HybridSearchResponse } from '@/types/miso'

import HybridSearch from '../_components/hybrid-search'

export default function SearchResultPage({
  params,
}: {
  params: { query: string }
}) {
  const { query } = params
  const decodedQuery = decodeURIComponent(query)
  const handleResultsChange = (_results: HybridSearchResponse | null) => {
    // Handle results update if needed
  }
  return (
    <main>
      <HybridSearch
        query={decodedQuery}
        onResultsChange={handleResultsChange}
      />
    </main>
  )
}
