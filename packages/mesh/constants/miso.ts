/**
 * Miso AI configuration constants
 * Organized by functional areas for better maintainability
 */

import { type HybridSearchResponse } from '@/types/miso'

// API Query Filters - Used for filtering search results by content type
export const MISO_SEARCH_FQ = {
  STORY: 'product_id:/mesh_story_.+/',
  COLLECTION: 'product_id:/mesh_profile_collection_.+/',
  USER_PROFILE: 'product_id:/mesh_profile_member_.+/',
  PUBLISHER_PROFILE: 'product_id:/mesh_publisher_.+/',
  USER_AND_PUBLISHER_PROFILE:
    'product_id:/(mesh_publisher|mesh_profile_member)_.+/',
} as const

// API Request Configuration - Default values for search requests
export const MISO_API_CONFIG = {
  SNIPPET_MAX_CHARS: 200,
  POLL_INTERVAL_MS: 500,
  MAX_RETRIES: 10,
  CITE_LINK: 1,
  CITE_START: '[',
  CITE_END: ']',
  DEFAULT_PAGE_SIZE: 20,
} as const

// Field Configurations - Define which fields to retrieve from API
export const MISO_FIELDS = {
  SEARCH_FL: [
    'product_id',
    'cover_image',
    'url',
    'published_at',
    'title',
    'authors',
    'custom_attributes.*',
  ],
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
  COMMON_FACETS: [
    'custom_attributes.article:section',
    'custom_attributes.article:tag',
    'custom_attributes.article:author',
  ],
} as const

// Sort Configuration - Centralized sorting options and mappings
export const MISO_SORT = {
  VALUES: ['relevance', 'published_at'] as const,
  ORDER_BY: {
    RELEVANCE: 'relevance',
    PUBLISHED_AT: 'published_at',
  } as const,
  UI_OPTIONS: [
    { value: 'relevance', label: '相關度' },
    { value: 'published_at', label: '最新發布' },
  ] as const,
} as const

// UI Configuration - Frontend display settings
export const MISO_UI_CONFIG = {
  CAROUSEL_ITEM_WIDTH: 212,
  MAX_SOURCES_DISPLAY: 3,
  PAGINATION: {
    MAX_ELEMENTS: 200,
    CAROUSEL_ITEMS_PER_PAGE: 5,
  },
  FILTERS: [
    { id: 'story', name: '新聞' },
    { id: 'collection', name: '集錦' },
    { id: 'member-publisher', name: '個人檔案' },
  ] as const,
  ANSWER_STAGES: {
    SEARCHING: '搜尋中',
    GENERATING: '產生摘要',
    COMPLETED: '完成',
  } as const,
} as const

// Utility Functions - Helper functions for validation and data transformation
export const validateSortParam = (
  sort: string | undefined
): typeof MISO_SORT.VALUES[number] => {
  return MISO_SORT.VALUES.includes(sort as typeof MISO_SORT.VALUES[number])
    ? (sort as typeof MISO_SORT.VALUES[number])
    : 'published_at'
}

export const getSortLabel = (sort: typeof MISO_SORT.VALUES[number]) => {
  return (
    MISO_SORT.UI_OPTIONS.find((option) => option.value === sort)?.label ||
    '相關度'
  )
}

export const mapSortToOrderBy = (sort: typeof MISO_SORT.VALUES[number]) => {
  return sort === 'relevance'
    ? MISO_SORT.ORDER_BY.RELEVANCE
    : MISO_SORT.ORDER_BY.PUBLISHED_AT
}

export const generateNoResultsMessage = (
  query: string,
  type: '新聞' | '集錦' | '個人檔案'
) => {
  return `找不到包含「${query}」的${type}，請換個關鍵字，再試一次。`
}

// Type Definitions - Shared types for search functionality
export type SearchResultType = {
  success: boolean
  data: HybridSearchResponse | null
  error: Error | null
}

export type SearchType = 'story' | 'collection' | 'member-publisher'

export type FilterType = {
  id: SearchType
  name: string
}

// Legacy Exports - Maintain backwards compatibility
export const MISO_SEARCH_DEFAULTS = MISO_API_CONFIG
export const MISO_ORDER_BY = MISO_SORT.ORDER_BY
export const MISO_VALID_SORTS = MISO_SORT.VALUES
export const MISO_SEARCH_SORT_OPTIONS = MISO_SORT.UI_OPTIONS
export const MISO_SEARCH_PAGINATION = {
  PAGE_SIZE: MISO_API_CONFIG.DEFAULT_PAGE_SIZE,
  MAX_ELEMENTS: MISO_UI_CONFIG.PAGINATION.MAX_ELEMENTS,
  ITEMS_PER_PAGE: MISO_UI_CONFIG.PAGINATION.CAROUSEL_ITEMS_PER_PAGE,
}
export const MISO_SEARCH_FILTERS = MISO_UI_CONFIG.FILTERS
export const MISO_SEARCH_UI = {
  CAROUSEL_ITEM_WIDTH: MISO_UI_CONFIG.CAROUSEL_ITEM_WIDTH,
  MAX_SOURCES_DISPLAY: MISO_UI_CONFIG.MAX_SOURCES_DISPLAY,
}
export const MISO_BASE_SEARCH_OPTIONS = {
  rows: MISO_API_CONFIG.DEFAULT_PAGE_SIZE,
}
export const MISO_ANSWER_STAGES = MISO_UI_CONFIG.ANSWER_STAGES
