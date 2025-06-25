/**
 * Miso AI 相關常數配置
 */

// API 基本設定
export const MISO_CONFIG = {
  API_KEY: 'IHtn9b9tfPsO1EQpGV74OMf2syhELb6XVZe8u9FT',
  BASE_URL: 'https://api.askmiso.com',
  ENDPOINTS: {
    HYBRID_SEARCH: '/v1/ask/search',
    GET_ANSWER: (questionId: string) =>
      `/v1/ask/questions/${questionId}/answer`,
  },
} as const

export const MISO_SEARCH_FQ = {
  STORY: 'product_id:/mirrordaily_.+/',
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
  PUBLISHED_AT_DESC: 'published_at desc',
  PUBLISHED_AT_ASC: 'published_at asc',
} as const

// 答案生成狀態
export const MISO_ANSWER_STAGES = {
  SEARCHING: '搜尋中',
  GENERATING: '產生摘要',
  COMPLETED: '完成',
} as const
