'use server'

import { MISO_API_KEY, MISO_ENDPOINTS } from '@/constants/config'
import {
  MISO_FIELDS,
  MISO_ORDER_BY,
  MISO_SEARCH_DEFAULTS,
  MISO_SEARCH_FQ,
} from '@/constants/miso'
import type {
  AnswerResponse,
  HybridSearchRequest,
  HybridSearchResponse,
} from '@/types/miso'
import { AnswerResponseSchema, HybridSearchResponseSchema } from '@/types/miso'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export async function hybridSearch(
  params: HybridSearchRequest
): Promise<HybridSearchResponse | null> {
  try {
    const url = new URL(MISO_ENDPOINTS.hybridSearch)
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
        '[HybridSearch API] HTTP error:',
        response.status,
        response.statusText
      )
      return null
    }

    const rawData = await response.json()

    const parseResult = HybridSearchResponseSchema.safeParse(rawData)

    if (!parseResult.success) {
      console.error(
        '[HybridSearch API] Response validation failed:',
        parseResult.error.format()
      )
      return null
    }

    return parseResult.data
  } catch (error) {
    const traceObject = getLogTraceObjectFromHeaders()
    const fallbackErrorMessage =
      'Miso hybridSearch failed, info: ' + JSON.stringify({ params })
    logServerSideError(error, fallbackErrorMessage, traceObject)
    return null
  }
}

// 基本搜尋
export async function searchWithHybrid(
  query: string,
  fq: keyof typeof MISO_SEARCH_FQ,
  options: Partial<HybridSearchRequest> = {},
  userId?: string
): Promise<HybridSearchResponse | null> {
  const defaultParams: HybridSearchRequest = {
    anonymous_id: `anon_${Date.now()}`,
    q: query,
    fq: MISO_SEARCH_FQ[fq],
    rows: options.rows,
    fl: MISO_FIELDS.SEARCH_FL,
    snippet_max_chars: MISO_SEARCH_DEFAULTS.SNIPPET_MAX_CHARS,
    answer: true,
    source_fl: MISO_FIELDS.SOURCE_FL,
    cite_link: MISO_SEARCH_DEFAULTS.CITE_LINK,
    cite_start: MISO_SEARCH_DEFAULTS.CITE_START,
    cite_end: MISO_SEARCH_DEFAULTS.CITE_END,
    order_by: options.order_by ?? MISO_ORDER_BY.PUBLISHED_AT,
    ...options,
  }

  if (userId) {
    defaultParams.user_id = userId
  }

  return hybridSearch(defaultParams)
}

// Get Answer API with Progress
export async function getAnswerWithProgress(
  questionId: string
): Promise<AnswerResponse | null> {
  try {
    const url = new URL(MISO_ENDPOINTS.getAnswerWithProgress(questionId))
    url.searchParams.set('api_key', MISO_API_KEY)

    const maxRetries = MISO_SEARCH_DEFAULTS.MAX_RETRIES
    const pollInterval = MISO_SEARCH_DEFAULTS.POLL_INTERVAL_MS
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
          '[Answer API] HTTP error:',
          response.status,
          response.statusText
        )
        return null
      }

      const rawData = await response.json()

      // 使用 Zod schema 驗證response data
      const parseResult = AnswerResponseSchema.safeParse(rawData)

      if (!parseResult.success) {
        console.error(
          `[Answer API] Response validation failed at attempt ${attempts + 1}:`,
          parseResult.error.format()
        )
        attempts++
        if (attempts < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, pollInterval))
        }
        continue
      }

      const data = parseResult.data

      // 如果完成了，直接return
      if (data.data.finished) {
        return data
      }

      attempts++

      // 如果還沒完成且未達到最大重試次數，等待後繼續
      if (attempts < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval))
      }
    }

    // 超過最大重試次數，返回 null 或最後的結果
    console.warn('[Answer API] Max retries reached, answer may not be complete')
    return null
  } catch (error) {
    console.error('[Answer API] Request failed:', error)
    return null
  }
}
