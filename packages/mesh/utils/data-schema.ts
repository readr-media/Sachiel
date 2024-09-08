import { z } from 'zod'

const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
})

const sourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  customId: z.string(),
})

const categorySchema = z.object({
  slug: z.string(),
})

const storySchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  published_date: z.string(),
  summary: z.string(),
  og_title: z.string(),
  og_image: z.string(),
  og_description: z.string(),
  full_content: z.boolean(),
  commentCount: z.number(),
  paywall: z.boolean(),
  full_screen_ad: z.string(),
  isMember: z.boolean(),
  pickCount: z.number(),
  picks: z.array(
    z.object({
      createdAt: z.string().optional(),
      member: memberSchema.nullable(),
    })
  ),
})

export const rawFeaturedStorySchema = storySchema.extend({
  source: sourceSchema,
})

export const rawReadrStorySchema = sourceSchema.extend({
  stories: z.array(storySchema),
})

export const rawMostSponsoredPublisherStorySchema = z.object({
  ...sourceSchema.shape,
  sponsoredCount: z.number(),
  stories: z.array(storySchema.omit({ picks: true, pickCount: true })),
})

export const rawCommentSchema = z.object({
  id: z.string(),
  member: memberSchema,
  content: z.string(),
  likeCount: z.number(),
  story: z
    .object({
      id: z.string(),
      title: z.string(),
      source: sourceSchema,
      published_date: z.string(),
    })
    .nullable(),
})

export const rawDailyHighlightSchema = storySchema
  .omit({
    //TODO : need full_screen_ad
    full_screen_ad: true,
    isMember: true,
    summary: true,
  })
  .extend({ source: sourceSchema })
  .extend({ category: categorySchema })

export const rawTopCollectorSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string(),
  email: z.string(),
  nickname: z.string(),
  pickCount: z.number(),
})

export const rawCategoryStorySchema = storySchema
  .extend({
    picksCount: z.number(),
    content: z.string(),
    category: z.object({
      id: z.string(),
      slug: z.string(),
    }),
    source: sourceSchema.omit({ customId: true }),
  })
  .omit({ isMember: true, pickCount: true })
