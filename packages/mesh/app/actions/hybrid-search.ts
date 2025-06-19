'use server'

import { MISO_API_KEY } from '@/constants/config'

export interface HybridSearchRequest {
  anonymous_id: string
  user_id?: string
  q: string
  fq?: string
  facets?: string[]
  snippet_max_chars?: number
  fl?: string[]
  exclude?: string[]
  rows?: number
  order_by?: string
  answer?: boolean
  source_fl?: string[]
  cite_link?: number
  cite_start?: string
  cite_end?: string
}

export interface HybridSearchProduct {
  product_id: string
  cover_image?: string
  title: string
  published_at?: string
  url?: string
  custom_attributes?: Record<string, any>
  authors?: string[] | string
  snippet?: string
  _title_with_markups?: string
  _missing_keywords?: string[]
}

export interface HybridSearchResponse {
  message: string
  data: {
    miso_id: string
    question_id: string
    took: number
    total: number
    products: HybridSearchProduct[]
    facet_counts?: {
      facet_fields?: Record<string, Array<[string, number]>>
    }
  }
}

export async function hybridSearch(
  params: HybridSearchRequest
): Promise<HybridSearchResponse | null> {
  try {
    console.log('🔍 [HybridSearch API] Making request with params:', params)

    const url = new URL('https://api.askmiso.com/v1/ask/search')
    url.searchParams.set('api_key', MISO_API_KEY)

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      cache: 'no-cache',
    })

    if (!response.ok) {
      console.error(
        '❌ [HybridSearch API] HTTP error:',
        response.status,
        response.statusText
      )
      return null
    }

    const data = await response.json()
    console.log('📊 [HybridSearch API] Response received:', data)

    return data
  } catch (error) {
    console.error('❌ [HybridSearch API] Request failed:', error)
    return null
  }
}

// 便利函數：基本搜尋
export async function searchWithHybrid(
  query: string,
  userId?: string,
  options: Partial<HybridSearchRequest> = {}
): Promise<HybridSearchResponse | null> {
  const defaultParams: HybridSearchRequest = {
    anonymous_id: `anon_${Date.now()}`,
    q: query,
    rows: 20,
    fl: [
      'product_id',
      'cover_image',
      'url',
      'published_at',
      'title',
      'authors',
      'custom_attributes.*',
    ],
    snippet_max_chars: 200,
    answer: true,
    source_fl: [
      'cover_image',
      'url',
      'created_at',
      'updated_at',
      'published_at',
      'title',
      'authors',
      'custom_attributes.*',
    ],
    cite_link: 1,
    cite_start: '[',
    cite_end: ']',
    ...options,
  }

  if (userId) {
    defaultParams.user_id = userId
  }

  return hybridSearch(defaultParams)
}
