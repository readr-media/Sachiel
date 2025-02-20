'use server'

import { cookies } from 'next/headers'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import {
  GetPublisherExchangesDocument,
  GetPublisherReportsDocument,
  GetPublisherSponsorshipsDocument,
  GetPublisherTransactionsDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulGet } from '@/utils/fetch-restful'
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

export async function getPublisherReports({
  publisherCustomId,
}: {
  publisherCustomId: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const response = await fetchGraphQL(
    GetPublisherReportsDocument,
    {
      publisherCustomId,
    },
    globalLogFields,
    'Failed to get Publisher Reports'
  )
  return response
}

export async function getPublisherSignedCookie({
  publisherId,
}: {
  publisherId: string
}) {
  const url = RESTFUL_ENDPOINTS.publisherSignedCookie(publisherId)
  const accessToken = cookies().get('token')?.value
  const response = await fetchRestfulGet<string>(
    url,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    `Failed to get publisher id=${publisherId} signed cookie`
  )

  return response
}
