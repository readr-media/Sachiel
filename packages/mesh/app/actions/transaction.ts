'use server'

import { GetMemberSingleTransactionDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'
import {
  recordSelector,
  transformTransactionRecord,
} from '@/utils/transaction-records'

export async function getMemberSingleTransaction(
  memberId: string,
  tid: string
) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await fetchGraphQL(
    GetMemberSingleTransactionDocument,
    {
      memberId,
      tid,
    },
    globalLogFields,
    'Failed to get member transaction record'
  )

  if (!response) {
    return null
  }

  const data = recordSelector(response)

  return transformTransactionRecord(data)
}
