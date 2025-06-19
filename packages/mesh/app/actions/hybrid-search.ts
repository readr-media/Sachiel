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

export interface AnswerSource {
  cover_image: string
  title: string
  published_at: string
  url: string
  custom_attributes: Record<string, any>
  product_id: string
  date: string
  child_title: string | null
  child_id: string | null
  boosted: boolean
  snippet: string
  highlight_text: string
  _attribution_length: number
  _attribution_length_percentage: number
}

export interface AnswerResponse {
  message: string
  data: {
    question: string
    question_id: string
    parent_question_id: string | null
    question_category: string | null
    answer_stage: string
    finished: boolean
    finish_reason: string
    blocked_reason: string
    answer: string
    sources: AnswerSource[]
    related_resources: AnswerSource[]
    followup_questions: any
    affiliation_products: any
    sovrn_aff: any
    images: any
    revision: number
    metadata: Record<string, any>
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

// 新增回調類型
export type AnswerProgressCallback = (partialAnswer: AnswerResponse) => void

// Get Answer API with Progress
export async function getAnswerWithProgress(
  questionId: string,
  onProgress?: AnswerProgressCallback
): Promise<AnswerResponse | null> {
  try {
    console.log('🤖 [Answer API] Making request for question_id:', questionId)

    const url = new URL(
      `https://api.askmiso.com/v1/ask/questions/${questionId}/answer`
    )
    url.searchParams.set('api_key', MISO_API_KEY)

    const maxRetries = 120 // 最多輪詢 120 次（60秒）
    const pollInterval = 500 // 每 0.5 秒輪詢一次
    let attempts = 0

    while (attempts < maxRetries) {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      })

      if (!response.ok) {
        console.error(
          '❌ [Answer API] HTTP error:',
          response.status,
          response.statusText
        )
        return null
      }

      const data = await response.json()
      console.log(
        `📝 [Answer API] Attempt ${attempts + 1}, finished: ${
          data.data.finished
        }, answer_stage: ${data.data.answer_stage}`
      )

      // 每次都回調，讓 UI 可以即時更新
      if (onProgress && data.data.answer) {
        onProgress(data)
      }

      // 如果完成了，直接返回
      if (data.data.finished) {
        console.log('✅ [Answer API] Answer completed:', data)
        return data
      }

      attempts++

      // 如果還沒完成且未達到最大重試次數，等待後繼續
      if (attempts < maxRetries) {
        console.log(
          `⏳ [Answer API] Waiting ${pollInterval}ms before next attempt...`
        )
        await new Promise((resolve) => setTimeout(resolve, pollInterval))
      }
    }

    // 超過最大重試次數，返回 null 或最後的結果
    console.warn(
      '⚠️ [Answer API] Max retries reached, answer may not be complete'
    )
    return null
  } catch (error) {
    console.error('❌ [Answer API] Request failed:', error)
    return null
  }
}

// 原始的 getAnswer 函數（向後兼容）
export async function getAnswer(
  questionId: string
): Promise<AnswerResponse | null> {
  return getAnswerWithProgress(questionId)
}
