'use server'

import {
  GetPublisherExchangesDocument,
  GetPublisherSponsorshipsDocument,
  GetPublisherTransactionsDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export async function getPublisherTransactions({
  publisherCustomId,
  take,
  skip,
  gte,
  lte,
}: {
  publisherCustomId: string
  take: number
  skip: number
  gte: string
  lte: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const response = await fetchGraphQL(
    GetPublisherTransactionsDocument,
    { publisherCustomId, take, skip, gte, lte },
    globalLogFields,
    'Failed to get Publisher Transactions'
  )
  return response
}

export async function getPublisherSponsorships({
  publisherCustomId,
  take,
  skip,
  gte,
  lte,
}: {
  publisherCustomId: string
  take: number
  skip: number
  gte: string
  lte: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const response = await fetchGraphQL(
    GetPublisherSponsorshipsDocument,
    { publisherCustomId, take, skip, gte, lte },
    globalLogFields,
    'Failed to get Publisher Sponsorships'
  )
  return response
}

export async function getPublisherRedeems({
  publisherCustomId,
  take,
  skip,
  gte,
  lte,
}: {
  publisherCustomId: string
  take: number
  skip: number
  gte: string
  lte: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const response = await fetchGraphQL(
    GetPublisherExchangesDocument,
    { publisherCustomId, take, skip, gte, lte },
    globalLogFields,
    'Failed to get Publisher Transactions Data'
  )
  return response
}
