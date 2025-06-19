'use client'
import { notFound } from 'next/navigation'

import { search } from '@/app/actions/search'

import SearchFilter from '../_components/search-filter'
import HybridSearch from '../_components/hybrid-search'
import { useState } from 'react'
import { HybridSearchResponse } from '@/app/actions/hybrid-search'

export default function SearchResultPage({
  params,
}: {
  params: { query: string }
}) {
  const { query } = params
  const decodedQuery = decodeURIComponent(query)
  const [searchResults, setSearchResults] =
    useState<HybridSearchResponse | null>(null)
  const handleResultsChange = (results: HybridSearchResponse | null) => {
    setSearchResults(results)
    console.log('📊 [SearchPage] Results updated:', results)
  }
  return (
    <main>
      {/* <SearchFilter query={decodedQuery} results={results} /> */}
      <HybridSearch
        query={decodedQuery}
        onResultsChange={handleResultsChange}
      />
    </main>
  )
}
