'use server'

import { GetPublisherTransactionsDocument } from '@/graphql/__generated__/graphql'
import { RecordType } from '@/types/media-backstage'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export async function getPublisherTransactionRecord(publisherCustomId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const transactionsResponse = await fetchGraphQL(
    GetPublisherTransactionsDocument,
    { publisherCustomId },
    globalLogFields,
    'Failed to get Publisher Transactions Data'
  )

  const totalSponsorCount =
    transactionsResponse?.publishers?.[0]?.sponsoredCount ?? 0
  const sponsorRecords = transactionsResponse?.publishers?.[0]?.sponsored ?? []
  const totalTransactionCount = transactionsResponse?.transactionsCount ?? 0
  const transactionRecords = transactionsResponse?.transactions ?? []
  const totalRedeemCount = transactionsResponse?.redeemsCount ?? 0
  const redeemRecords = transactionsResponse?.redeems ?? []

  return {
    [RecordType.Sponsor]: {
      type: RecordType.Sponsor,
      totalCount: totalSponsorCount,
      records: sponsorRecords,
    },
    [RecordType.Transaction]: {
      type: RecordType.Transaction,
      totalCount: totalTransactionCount,
      records: transactionRecords,
    },
    [RecordType.Redeem]: {
      type: RecordType.Redeem,
      totalCount: totalRedeemCount,
      records: redeemRecords,
    },
  }
}
