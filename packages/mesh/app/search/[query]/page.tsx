import type { HybridSearchResponse } from '@/types/miso'

import HybridSearch from '../_components/hybrid-search'
import SearchFilter from '../_components/search-filter'

export default function SearchResultPage({
  params,
}: {
  params: { query: string }
}) {
  const { query } = params
  const decodedQuery = decodeURIComponent(query)

  return (
    <main>
      <SearchFilter />
      <HybridSearch query={decodedQuery} />
    </main>
  )
}
