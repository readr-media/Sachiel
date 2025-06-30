import DOMPurify from 'isomorphic-dompurify'

type SanitizeConfig = {
  ALLOWED_TAGS: string[]
  ALLOWED_ATTR: string[]
  ALLOWED_URI_REGEXP: RegExp
}

const DEFAULT_CONFIG: SanitizeConfig = {
  ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'p', 'br', 'a', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  ALLOWED_URI_REGEXP: /^https?:\/\//,
}

export const AI_ANSWER_CONFIG: SanitizeConfig = {
  ALLOWED_TAGS: ['strong', 'li', 'ul', 'br', 'a'],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  ALLOWED_URI_REGEXP: /^https?:\/\//,
}

export const STORY_TITLE_CONFIG: SanitizeConfig = {
  ALLOWED_TAGS: ['strong', 'em'],
  ALLOWED_ATTR: [],
  ALLOWED_URI_REGEXP: /^$/,
}

/**
 * 通用的 HTML sanitizer
 */
export function sanitizeHtml(
  html: string,
  config: SanitizeConfig = DEFAULT_CONFIG
): string {
  // 輸入驗證
  if (!html || typeof html !== 'string') {
    return ''
  }

  try {
    // 使用 isomorphic-dompurify 進行清理，自動處理 SSR/CSR 環境
    const sanitized = DOMPurify.sanitize(html, config)
    return typeof sanitized === 'string' ? sanitized : String(sanitized)
  } catch (error) {
    console.error('HTML sanitization failed:', error)
    return ''
  }
}

export function sanitizeAiAnswer(html: string): string {
  return sanitizeHtml(html, AI_ANSWER_CONFIG)
}

export function sanitizeStoryTitle(html: string): string {
  return sanitizeHtml(html, STORY_TITLE_CONFIG)
}
