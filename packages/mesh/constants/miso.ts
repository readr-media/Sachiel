/**
 * Miso AI 相關常數配置
 */

import { type HybridSearchResponse } from '@/types/miso'

// API 基本設定
export const MISO_CONFIG = {
  API_KEY: process.env.MISO_API_KEY || '',
  BASE_URL: 'https://api.askmiso.com',
  ENDPOINTS: {
    HYBRID_SEARCH: '/v1/ask/search',
    GET_ANSWER: (questionId: string) =>
      `/v1/ask/questions/${questionId}/answer`,
  },
} as const

export const MISO_SEARCH_FQ = {
  STORY: 'product_id:/mesh_story_.+/',
  COLLECTION: 'product_id:/mesh_profile_collection_.+/',
  USER_PROFILE: 'product_id:/mesh_profile_member_.+/',
  PUBLISHER_PROFILE: 'product_id:/mesh_publisher_.+/',
  USER_AND_PUBLISHER_PROFILE:
    'product_id:/(mesh_publisher|mesh_profile_member)_.+/',
} as const

// 搜尋預設參數
export const MISO_SEARCH_DEFAULTS = {
  SNIPPET_MAX_CHARS: 200,
  POLL_INTERVAL_MS: 500,
  MAX_RETRIES: 10,
  CITE_LINK: 1,
  CITE_START: '[',
  CITE_END: ']',
} as const

// 搜尋欄位配置
export const MISO_FIELDS = {
  // 搜尋結果欄位
  SEARCH_FL: [
    'product_id',
    'cover_image',
    'url',
    'published_at',
    'title',
    'authors',
    'custom_attributes.*',
  ],
  // 來源欄位
  SOURCE_FL: [
    'cover_image',
    'url',
    'created_at',
    'updated_at',
    'published_at',
    'title',
    'authors',
    'custom_attributes.*',
  ],
  // 常用 facets
  COMMON_FACETS: [
    'custom_attributes.article:section',
    'custom_attributes.article:tag',
    'custom_attributes.article:author',
  ],
} as const

// 向後相容的匯出
export const MISO_SEARCH_FL = MISO_FIELDS.SEARCH_FL
export const MISO_SOURCE_FL = MISO_FIELDS.SOURCE_FL

// 排序選項
export const MISO_ORDER_BY = {
  RELEVANCE: 'relevance',
  PUBLISHED_AT: 'published_at',
} as const

// 答案生成狀態
export const MISO_ANSWER_STAGES = {
  SEARCHING: '搜尋中',
  GENERATING: '產生摘要',
  COMPLETED: '完成',
} as const
// 搜尋排序選項
export const MISO_SEARCH_SORT_OPTIONS = [
  { value: 'relevance', label: '相關度' },
  { value: 'published_at', label: '最新發布' },
] as const

export const MISO_VALID_SORTS = ['relevance', 'published_at'] as const

// 搜尋分頁設定
export const MISO_SEARCH_PAGINATION = {
  PAGE_SIZE: 20,
  MAX_ELEMENTS: 200,
  ITEMS_PER_PAGE: 5, // for carousel
} as const

// 搜尋過濾器設定
export const MISO_SEARCH_FILTERS = [
  { id: 'story', name: '新聞' },
  { id: 'collection', name: '集錦' },
  { id: 'member-publisher', name: '個人檔案' },
] as const

// 搜尋 UI 設定
export const MISO_SEARCH_UI = {
  CAROUSEL_ITEM_WIDTH: 212,
  MAX_SOURCES_DISPLAY: 3,
} as const

// 搜尋基本選項
export const MISO_BASE_SEARCH_OPTIONS = {
  rows: 20,
} as const

// 排序驗證與映射函式
export const validateSortParam = (
  sort: string | undefined
): typeof MISO_VALID_SORTS[number] => {
  return MISO_VALID_SORTS.includes(sort as typeof MISO_VALID_SORTS[number])
    ? (sort as typeof MISO_VALID_SORTS[number])
    : 'published_at'
}

export const mapSortToOrderBy = (sort: typeof MISO_VALID_SORTS[number]) => {
  return sort === 'relevance'
    ? MISO_ORDER_BY.RELEVANCE
    : MISO_ORDER_BY.PUBLISHED_AT
}

// 無結果訊息生成
export const generateNoResultsMessage = (
  query: string,
  type: '新聞' | '集錦' | '個人檔案'
) => {
  return `找不到包含「${query}」的${type}，請換個關鍵字，再試一次。`
}

// 排序標籤獲取
export const getSortLabel = (sort: typeof MISO_VALID_SORTS[number]) => {
  return (
    MISO_SEARCH_SORT_OPTIONS.find((option) => option.value === sort)?.label ||
    '相關度'
  )
}

// 定義搜尋結果
export type SearchResultType = {
  success: boolean
  data: HybridSearchResponse | null
  error: Error | null
}

// 定義搜尋類型
export type SearchType = 'story' | 'collection' | 'member-publisher'

// 定義過濾器類型
export type FilterType = {
  id: SearchType
  name: string
}
