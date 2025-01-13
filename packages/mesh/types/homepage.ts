import type { z } from 'zod'

import type {
  rawCategoryStorySchema,
  rawCommentSchema,
  rawDailyHighlightSchema,
  rawFeaturedStorySchema,
  rawMostSponsoredPublisherStoryByCategorySchema,
  rawMostSponsoredPublisherStorySchema,
  rawReadrStorySchema,
  rawTopCollectorSchema,
  storySchema,
} from '@/utils/data-schema'

export type Story = z.infer<typeof storySchema>

export type MostPickedStory = z.infer<typeof rawFeaturedStorySchema>

export type ReadrStory = z.infer<typeof rawReadrStorySchema>

export type DailyStory = z.infer<typeof rawDailyHighlightSchema>

export type SponsoredStory = z.infer<
  typeof rawMostSponsoredPublisherStorySchema
>

// TODO: null story
export type Comment = z.infer<typeof rawCommentSchema>

export type Collector = z.infer<typeof rawTopCollectorSchema>

export type CategoryStory = z.infer<typeof rawCategoryStorySchema>

export type SponsoredStoryByCategory = z.infer<
  typeof rawMostSponsoredPublisherStoryByCategorySchema
>

export type GtmTags = {
  story: string
  pick: string
}
