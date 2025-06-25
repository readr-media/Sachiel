'use client'
import { useState } from 'react'

import type { AnswerResponse } from '@/types/miso'

import type { SearchResult, SearchType } from '../[query]/page'
import HybridSearch from './hybrid-search'
import SearchFilter from './search-filter'

type SearchResultsProps = {
  hybridSearchResults: Record<SearchType, SearchResult>
  misoAskResult: null | AnswerResponse
  query: string
}
export type filterType = {
  id: 'story' | 'collection' | 'member-publisher'
  name: string
}

const filters: filterType[] = [
  {
    id: 'story',
    name: '新聞',
  },
  {
    id: 'collection',
    name: '集錦',
  },
  {
    id: 'member-publisher',
    name: '個人檔案',
  },
]

export default function SearchResult({
  query,
  hybridSearchResults,
  misoAskResult,
}: SearchResultsProps) {
  const [activeFilter, setActiveFilter] = useState<filterType['id']>(
    filters[0].id
  )
  return (
    <div>
      <SearchFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <HybridSearch
        activeFilter={activeFilter}
        query={query}
        hybridSearchResults={hybridSearchResults}
        misoAskResult={misoAskResult}
      />
    </div>
  )
}
