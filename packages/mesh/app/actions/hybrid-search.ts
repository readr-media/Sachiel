'use server'

import { MISO_API_KEY, MISO_ENDPOINTS } from '@/constants/config'
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
        '❌ [HybridSearch API] HTTP error:',
        response.status,
        response.statusText
      )
      return null
    }

    const rawData = await response.json()

    const parseResult = HybridSearchResponseSchema.safeParse(rawData)

    if (!parseResult.success) {
      console.error(
        '❌ [HybridSearch API] Response validation failed:',
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

    const url = new URL(MISO_ENDPOINTS.getAnswerWithProgress(questionId))
    url.searchParams.set('api_key', MISO_API_KEY)

    const maxRetries = 10 // 最多輪詢 120 次（60秒）
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

      const rawData = await response.json()

      // 使用 Zod schema 驗證回應資料
      const parseResult = AnswerResponseSchema.safeParse(rawData)

      if (!parseResult.success) {
        console.error(
          `❌ [Answer API] Response validation failed at attempt ${
            attempts + 1
          }:`,
          parseResult.error.format()
        )
        attempts++
        if (attempts < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, pollInterval))
        }
        continue
      }

      const data = parseResult.data
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
