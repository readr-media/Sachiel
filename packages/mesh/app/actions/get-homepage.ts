'use server'

import { z } from 'zod'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import { GetAllCategoriesDocument } from '@/graphql/__generated__/graphql'
import type {
  CategoryStory,
  Collector,
  Comment,
  DailyStory,
  MostPickedStory,
  ReadrStory,
  SponsoredStory,
} from '@/types/homepage'
import {
  rawCategoryStorySchema,
  rawCommentSchema,
  rawDailyHighlightSchema,
  rawFeaturedStorySchema,
  rawMostSponsoredPublisherStoryByCategorySchema,
  rawMostSponsoredPublisherStorySchema,
  rawReadrStorySchema,
  rawTopCollectorSchema,
} from '@/utils/data-schema'
import queryGraphQL from '@/utils/fetch-graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

async function fetchMostPickedStory(): Promise<MostPickedStory | null> {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const schema = z.object({ story: rawFeaturedStorySchema })

  try {
    const response = await fetchStatic<z.infer<typeof schema>>(
      STATIC_FILE_ENDPOINTS.mostPopularStory
    )
    const result = schema.parse(response)
    const { story } = result
    return story
  } catch (err) {
    logServerSideError(
      err,
      'Error occurs while fetching most picked story on the homepage',
      globalLogFields
    )
    return null
  }
}

async function fetchRecentReadrStory(): Promise<ReadrStory | null> {
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const response = await fetchStatic<z.infer<typeof rawReadrStorySchema>>(
      STATIC_FILE_ENDPOINTS.recentReadrStory
    )
    const result = rawReadrStorySchema.parse(response)
    return result
  } catch (err) {
    logServerSideError(
      err,
      'Error occurs while fetching recent READr story on the homepage',
      globalLogFields
    )
    return null
  }
}

async function fetchMostSponsoredPublisher(): Promise<SponsoredStory[] | null> {
  const schema = z.array(rawMostSponsoredPublisherStorySchema)
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const response = await fetchStatic<z.infer<typeof schema>>(
      STATIC_FILE_ENDPOINTS.mostSponsorPublishersOnHomepage
    )
    const result = schema.parse(response)
    return result
  } catch (err) {
    logServerSideError(
      err,
      'Error occurs while fetching most sponsored publisher on the homepage',
      globalLogFields
    )

    return null
  }
}

async function fetchMostLikedComment(): Promise<Comment[] | null> {
  const schema = z.array(rawCommentSchema)
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const response = await fetchStatic<z.infer<typeof schema>>(
      STATIC_FILE_ENDPOINTS.mostLikeComments
    )
    const result = schema.parse(response)
    return result
  } catch (err) {
    logServerSideError(
      err,
      'Error occurs while fetching most liked comments on the homepage',
      globalLogFields
    )
    return null
  }
}

async function fetchDailyHighlightGroup(): Promise<DailyStory[] | null> {
  const schema = z.array(rawDailyHighlightSchema)
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const response = await fetchStatic<z.infer<typeof schema>>(
      STATIC_FILE_ENDPOINTS.dailyHighlightGroup
    )
    const result = schema.parse(response)
    return result
  } catch (err) {
    logServerSideError(
      err,
      'Error occurs while fetching daily highlight group on the homepage',
      globalLogFields
    )
    return null
  }
}

async function fetchDailyHighlightNoGroup(): Promise<DailyStory[] | null> {
  const schema = z.array(rawDailyHighlightSchema)
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const response = await fetchStatic<z.infer<typeof schema>>(
      STATIC_FILE_ENDPOINTS.dailyHighlightNoGroup
    )
    const result = schema.parse(response)
    return result
  } catch (err) {
    logServerSideError(
      err,
      'Error occurs while fetching daily highlight no group on the homepage',
      globalLogFields
    )
    return null
  }
}

async function fetchTopCollector(): Promise<Collector[] | null> {
  const schema = z.array(rawTopCollectorSchema)
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const response = await fetchStatic<z.infer<typeof schema>>(
      STATIC_FILE_ENDPOINTS.mostReadMembers
    )
    const result = schema.parse(response)
    return result
  } catch (err) {
    logServerSideError(
      err,
      'Error occurs while fetching top collector on the homepage',
      globalLogFields
    )
    return null
  }
}

async function fetchAllCategory() {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const data = await queryGraphQL(
    GetAllCategoriesDocument,
    undefined,
    globalLogFields
  )

  return data
}

async function fetchCategoryStory(
  slug: string | undefined | null
): Promise<CategoryStory[] | null> {
  const schema = z.array(rawCategoryStorySchema)
  const globalLogFields = getLogTraceObjectFromHeaders()

  if (slug) {
    try {
      const response = await fetchStatic<z.infer<typeof schema>>(
        STATIC_FILE_ENDPOINTS.mostPickStoriesInCategoryFn(slug)
      )
      const result = schema.parse(response)
      return result.slice(0, 4)
    } catch (err) {
      logServerSideError(
        err,
        'Error occurs while fetching category story on the homepage',
        globalLogFields
      )
      return null
    }
  } else return null
}

async function fetchGroupAndOtherStories(slug: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const schema = z.object({
    group: z.array(rawDailyHighlightSchema).optional(),
    others: z.array(rawDailyHighlightSchema),
  })

  try {
    const response = await fetchStatic<z.infer<typeof schema>>(
      STATIC_FILE_ENDPOINTS.groupAndOtherStoriesInCategeoryfn(slug)
    )
    const result = schema.parse(response)
    return result
  } catch (err) {
    logServerSideError(
      err,
      `Error occurs while fetching category ${slug} stories on the homepage-related subpage`,
      globalLogFields
    )
    return null
  }
}

export default async function fetchMostSponsoredPublishersByCategory(
  slug: string
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const schema = z.array(rawMostSponsoredPublisherStoryByCategorySchema)

  try {
    const response = await fetchStatic(
      STATIC_FILE_ENDPOINTS.categoryMostSponsoredPublishersfn(slug)
    )
    const result = schema.parse(response)
    return result
  } catch (err) {
    logServerSideError(
      err,
      `Error occurs while fetching most sponsored publishers for the ${slug} category on the homepage-related subpage`,
      globalLogFields
    )
    return null
  }
}

export {
  fetchAllCategory,
  fetchCategoryStory,
  fetchDailyHighlightGroup,
  fetchDailyHighlightNoGroup,
  fetchGroupAndOtherStories,
  fetchMostLikedComment,
  fetchMostPickedStory,
  fetchMostSponsoredPublisher,
  fetchMostSponsoredPublishersByCategory,
  fetchRecentReadrStory,
  fetchTopCollector,
}
