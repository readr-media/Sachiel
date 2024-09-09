'use server'

import { z } from 'zod'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import {
  GetAllCategoriesDocument,
  GetMemberDocument,
} from '@/graphql/__generated__/graphql'
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
  rawMostSponsoredPublisherStorySchema,
  rawReadrStorySchema,
  rawTopCollectorSchema,
} from '@/utils/data-schema'
import queryGraphQL from '@/utils/fetch-graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

const globalLogFields = getLogTraceObjectFromHeaders()

async function fetchMostPickedStory(): Promise<MostPickedStory | null> {
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

async function fetchMemberInfo(memberId: string) {
  const memberData = await queryGraphQL(
    GetMemberDocument,
    { memberId },
    globalLogFields
  )

  return memberData
}

async function fetchMostSponsoredPublisher(): Promise<SponsoredStory[] | null> {
  const schema = z.array(rawMostSponsoredPublisherStorySchema)

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
  const schema = z.record(z.string(), z.array(rawDailyHighlightSchema))
  try {
    const response = await fetchStatic<z.infer<typeof schema>>(
      STATIC_FILE_ENDPOINTS.dailyHighlightGroup
    )
    const result = schema.parse(response)
    const { '1': stories } = result
    return stories
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

export {
  fetchAllCategory,
  fetchCategoryStory,
  fetchDailyHighlightGroup,
  fetchDailyHighlightNoGroup,
  fetchMemberInfo,
  fetchMostLikedComment,
  fetchMostPickedStory,
  fetchMostSponsoredPublisher,
  fetchRecentReadrStory,
  fetchTopCollector,
}
