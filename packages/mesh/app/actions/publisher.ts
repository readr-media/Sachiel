'use server'

import type { z } from 'zod'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import {
  AddExcludePublisherDocument,
  GetMemberExcludePublisherDocument,
  GetPublisherWalletDocument,
  RemoveExcludePublisherDocument,
} from '@/graphql/__generated__/graphql'
import { PublisherListSchema } from '@/utils/data-schema'
import queryGraphQL from '@/utils/fetch-graphql'
import { mutateGraphQL } from '@/utils/fetch-graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export type AllPublisherData = Awaited<ReturnType<typeof getAllPublishers>>

async function getAllPublishers(limit?: number) {
  const itemCount = limit ? Math.floor(Math.abs(limit)) : undefined
  const response = await fetchStatic<z.infer<typeof PublisherListSchema>>(
    STATIC_FILE_ENDPOINTS.publisherList
  )
  const publisherListJSON = PublisherListSchema.parse(response)
  const rawData = Object.values(publisherListJSON)
  const transformedData =
    rawData
      .map((data) => ({
        ...data,
        createdAt: new Date(data.createdAt).getTime(),
        isHidden: false,
      }))
      .sort((a, b) => b.createdAt - a.createdAt) ?? []

  return itemCount ? transformedData.slice(0, itemCount) : transformedData
}

export type PublisherWalletData = Awaited<ReturnType<typeof getPublisherWallet>>
async function getPublisherWallet(publisherId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    GetPublisherWalletDocument,
    { id: publisherId },
    globalLogFields,
    'Failed to get publisher admin wallet'
  )

  if (!data?.publisher?.admin?.wallet) {
    return null
  }

  return data.publisher
}

async function getExcludePublishers(memberId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    GetMemberExcludePublisherDocument,
    { memberId },
    globalLogFields,
    'Failed to get exclude publishers'
  )

  return data?.member?.exclude_publisher ?? []
}

async function updateExcludePublisher(
  memberId: string,
  action: 'add' | 'remove',
  publisherId: string
) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  if (action === 'add') {
    return await mutateGraphQL(
      AddExcludePublisherDocument,
      { memberId, publisherId },
      globalLogFields,
      'Failed to Add exclude publisher'
    )
  } else {
    return await mutateGraphQL(
      RemoveExcludePublisherDocument,
      { memberId, publisherId },
      globalLogFields,
      'Failed to Remove exclude publisher'
    )
  }
}

export {
  getAllPublishers,
  getExcludePublishers,
  getPublisherWallet,
  updateExcludePublisher,
}
