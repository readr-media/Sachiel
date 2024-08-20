'use server'

import {
  GetMemberSponsorShipsDocument,
  GetMemberTransactionsDocument,
  PublishersDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export async function getMemberSponsorRecord(memberId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const publishersData = await fetchGraphQL(
    PublishersDocument,
    undefined,
    globalLogFields,
    'Failed to get all publishers'
  )
  const allPublishers = publishersData?.publishers ?? []
  const publisherIdList = allPublishers.map((publisher) => publisher.id) ?? []
  const sponsorshipResponse = await fetchGraphQL(
    GetMemberSponsorShipsDocument,
    { memberId, publisherIdList },
    globalLogFields,
    'Failed to get member transaction record'
  )

  const sponsorshipData = sponsorshipResponse?.member?.sponsor ?? []
  const sponsorCountMap = sponsorshipData.reduce((acc, record) => {
    const publisherId = record.publisher?.id ?? 'none'
    if (publisherId !== 'none') {
      acc[publisherId] = (acc[publisherId] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  const result = allPublishers.map((publisher) => {
    return {
      publisherId: publisher.id,
      publisherTitle: publisher.title ?? '',
      publisherLogo: publisher.logo ?? '',
      sponsoredCount: sponsorCountMap[publisher.id] ?? 0,
    }
  })

  return result
}

export async function getMemberTransactionRecord(
  memberId: string,
  take: number,
  prev?: number
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const transactionsResponse = await fetchGraphQL(
    GetMemberTransactionsDocument,
    { memberId, take },
    globalLogFields,
    'Failed to get Transactions Data'
  )

  const totalSponsorCount = transactionsResponse?.member?.sponsorCount ?? 0
  const unlockStoriesCount = transactionsResponse?.transactions?.length ?? 0
  let transactionRecord = transactionsResponse?.member?.transaction ?? []
  let sponsorRecord = transactionsResponse?.member?.sponsor ?? []
  if (prev) {
    transactionRecord = transactionRecord.slice(prev)
    sponsorRecord = sponsorRecord.slice(prev)
  }

  const combinedRecord = [...transactionRecord, ...sponsorRecord].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return { totalSponsorCount, unlockStoriesCount, combinedRecord }
}
