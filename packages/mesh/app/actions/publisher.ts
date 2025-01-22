'use server'

import {
  GetPublisherWalletDocument,
  PublishersDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export type AllPublisherData = Awaited<ReturnType<typeof getAllPublishers>>

export async function getAllPublishers(limit?: number) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const itemCount = limit ? Math.floor(Math.abs(limit)) : undefined
  const data = await queryGraphQL(
    PublishersDocument,
    undefined,
    globalLogFields,
    'Failed to get all publishers'
  )

  const transformedData =
    data?.publishers
      ?.map((data) => ({
        ...data,
        createdAt: new Date(data.createdAt).getTime(),
        isHidden: false,
      }))
      .sort((a, b) => b.createdAt - a.createdAt) ?? []

  return itemCount ? transformedData.slice(0, itemCount) : transformedData
}

export type PublisherWalletData = Awaited<ReturnType<typeof getPublisherWallet>>
export async function getPublisherWallet(publisherId: string) {
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
