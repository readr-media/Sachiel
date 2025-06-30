import { z } from 'zod'

export type HybridSearchRequest = {
  anonymous_id: string
  user_id?: string
  q: string
  fq?: string
  facets?: readonly string[]
  snippet_max_chars?: number
  fl?: readonly string[]
  exclude?: readonly string[]
  rows?: number
  order_by?: string
  answer?: boolean
  source_fl?: readonly string[]
  cite_link?: number
  cite_start?: string
  cite_end?: string
  start?: number
}

export const CustomAttributesSchema = z
  .object({
    // Article 相關屬性
    'article:published_time': z.string().datetime().optional(),
    'article:section': z.string().optional(),
    'article:tag': z.string().optional(),
    'article:author': z.string().optional(),

    // Open Graph 元數據
    'og:title': z.string().optional(),
    'og:description': z.string().optional(),
    'og:image': z.string().url().optional(),
    'og:url': z.string().url().optional(),
    'og:type': z.enum(['website', 'article', 'video', 'book']).optional(),
    'og:site_name': z.string().optional(),
    'og:locale': z.string().optional(),
    'og:image:width': z.string().optional(),
    'og:image:height': z.string().optional(),
    'og:image:secure_url': z.string().url().optional(),
    'og:image:type': z.string().optional(),
    'og:slug': z.string().optional(),

    // Twitter Card 相關
    'twitter:card': z
      .enum(['summary', 'summary_large_image', 'app', 'player'])
      .optional(),
    'twitter:title': z.string().optional(),
    'twitter:description': z.string().optional(),
    'twitter:image': z.string().url().optional(),
    'twitter:image:width': z.string().optional(),
    'twitter:image:height': z.string().optional(),
    'twitter:url': z.string().optional(),

    // Facebook 相關
    'fb:app_id': z.string().optional(),
    'fb:pages': z.string().optional(),

    // Dable 追蹤系統
    'dable:item_id': z.string().optional(),
    'dable:author': z.string().optional(),

    // Google 服務
    'google-adsense-account': z.string().optional(),
    'google-site-verification': z.string().optional(),

    // 網站配置
    viewport: z.string().optional(),
    'theme-color': z.string().optional(),
    'msapplication-TileColor': z.string().optional(),
    robots: z.string().optional(),
    'next-head-count': z.string().optional(),

    // 網站特定屬性
    'section:color': z.string().optional(),
    'section:name': z.string().optional(),
    'section:slug': z.string().optional(),
    'category:name': z.string().optional(),
    'page-image': z.string().url().optional(),
    'page-slug': z.string().optional(),
    'page-type': z.string().optional(),
    'application-name': z.string().optional(),

    // 作者和來源相關
    author: z.string().optional(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    news_keywords: z.string().optional(),

    // 其他可能的屬性（保持彈性）
  })
  .catchall(z.unknown())

export type CustomAttributes = z.infer<typeof CustomAttributesSchema>

// Zod schema for HybridSearchProduct
export const HybridSearchProductSchema = z
  .object({
    product_id: z.string(),
    cover_image: z.string().url().optional(),
    title: z.string(),
    published_at: z.string().optional(), // 更寬鬆的日期驗證，因為格式可能不同
    url: z.string().url().optional(),
    custom_attributes: CustomAttributesSchema.optional(),
    authors: z.union([z.array(z.string()), z.string()]).optional(),
    snippet: z.string().optional(),
    _title_with_markups: z.string().optional(),
    _missing_keywords: z.array(z.string()).optional(),
    // 新增實際回應中的欄位
    _order_by: z
      .array(
        z.object({
          field: z.string(),
          value: z.number(),
          tie_break_level: z.number().optional(),
        })
      )
      .optional(),
  })
  .passthrough() // 允許額外的欄位通過驗證

export type HybridSearchProduct = z.infer<typeof HybridSearchProductSchema>

export const HybridSearchResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    miso_id: z.string(),
    question_id: z.string().uuid(),
    took: z.number(),
    total: z.number(),
    products: z.array(HybridSearchProductSchema),
    facet_counts: z
      .object({
        facet_fields: z
          .record(z.array(z.tuple([z.string(), z.number()])))
          .optional(),
      })
      .optional(),
  }),
})

export type HybridSearchResponse = z.infer<typeof HybridSearchResponseSchema>

export const AnswerSourceSchema = z
  .object({
    cover_image: z.string().optional(),
    title: z.string(),
    published_at: z.string().nullable().optional(),
    url: z.string().url(),
    custom_attributes: CustomAttributesSchema.optional(),
    product_id: z.string(),
    date: z.string().nullable().optional(),
    child_title: z.string().nullable(),
    child_id: z.string().nullable(),
    boosted: z.boolean(),
    snippet: z.string(),
    highlight_text: z.string(),
    _attribution_length: z.number().optional(), // related_resources 中可能沒有這個欄位
    _attribution_length_percentage: z.number().optional(), // related_resources 中可能沒有這個欄位
  })
  .passthrough() // 允許額外欄位通過

export type AnswerSource = z.infer<typeof AnswerSourceSchema>

// Zod schema for AnswerResponse
export const AnswerResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    question: z.string(),
    question_id: z.string().uuid(),
    parent_question_id: z.string().uuid().nullable(),
    question_category: z.string().nullable(),
    answer_stage: z.string(),
    finished: z.boolean(),
    finish_reason: z.string(),
    blocked_reason: z.string(),
    answer: z.string(),
    sources: z.array(AnswerSourceSchema),
    related_resources: z.array(AnswerSourceSchema),
    followup_questions: z.unknown().nullable(),
    affiliation_products: z.unknown().nullable(),
    sovrn_aff: z.unknown().nullable(),
    images: z.unknown().nullable(),
    revision: z.number(),
    metadata: z.record(z.unknown()),
  }),
})

export type AnswerResponse = z.infer<typeof AnswerResponseSchema>
