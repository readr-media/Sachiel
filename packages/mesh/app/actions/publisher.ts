'use server'

import {
  GetExchangePublisherInfoDocument,
  GetPublisherWalletDocument,
  PublishersDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export type PublisherData = NonNullable<
  Awaited<ReturnType<typeof getPublisherWallet>>
>

export async function getAllPublishers() {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    PublishersDocument,
    undefined,
    globalLogFields,
    'Failed to get all publishers'
  )
  return data?.publishers ?? []
}

export async function getPublisherWallet(publisherId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    GetPublisherWalletDocument,
    { id: publisherId },
    globalLogFields,
    'Failed to get publisher admin wallet'
  )
  return data?.publisher
}

export async function getExchangePublisherInfo(publisherCustomId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    GetExchangePublisherInfoDocument,
    { customId: publisherCustomId },
    globalLogFields,
    `Failed to get publisher exchange through publisherCustomId: ${publisherCustomId}`
  )
  return {
    publisher: data?.publishers?.[0],
    officialWalletAddress: data?.officialWallet?.[0].admin?.wallet,
  }
}
