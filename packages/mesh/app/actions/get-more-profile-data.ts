'use server'
import { z } from 'zod'

import {
  GetMoreBookmarksDocument,
  GetMoreCollectionsDocument,
  GetMorePicksDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

const DEFAULT_TAKES = 20
const DEFAULT_START_INDEX = 20

const getMoreMemberDataArgsSchema = z.object({
  customId: z.string(),
  takes: z.number().default(DEFAULT_TAKES),
  start: z.number().default(DEFAULT_START_INDEX),
  filterIds: z.set(z.string()).nullable(),
})

async function getMoreMemberData(
  document:
    | typeof GetMorePicksDocument
    | typeof GetMoreBookmarksDocument
    | typeof GetMoreCollectionsDocument,
  params: z.infer<typeof getMoreMemberDataArgsSchema>,
  errorMessage: string
) {
  const parseResult = getMoreMemberDataArgsSchema.safeParse(params)
  const globalLogFields = getLogTraceObjectFromHeaders()
  if (!parseResult.success) {
    logServerSideError(parseResult.error, 'Invalid parameters', globalLogFields)
    return []
  }

  const { customId, takes, start, filterIds } = parseResult.data
  try {
    const response = await fetchGraphQL(
      document,
      {
        customId,
        takes,
        start,
        filterIds: filterIds ? Array.from(filterIds) : undefined,
      },
      globalLogFields,
      errorMessage
    )
    return response?.picks ?? []
  } catch (error) {
    logServerSideError(error, errorMessage, globalLogFields)
    return []
  }
}

/**
 * 在個人檔案頁中無限滾動拿取更多精選
 */
export const getMoreMemberPicks = async (
  params: z.infer<typeof getMoreMemberDataArgsSchema>
) => {
  const response = await getMoreMemberData(
    GetMorePicksDocument,
    params,
    'Failed to get more member picks'
  )
  return (
    response.filter(
      (item) => item.objective === 'story' && item.story !== null
    ) ?? []
  )
}

/**
 * 在個人檔案頁中無限滾動拿取更多集錦
 */
export const getMoreMemberBookmarks = async (
  params: z.infer<typeof getMoreMemberDataArgsSchema>
) => {
  return getMoreMemberData(
    GetMoreBookmarksDocument,
    params,
    'Failed to get more member bookmarks'
  )
}

export const getMoreMemberCollections = async (
  params: z.infer<typeof getMoreMemberDataArgsSchema>
) => {
  return getMoreMemberData(
    GetMoreCollectionsDocument,
    params,
    'Failed to get more member collections'
  )
}
