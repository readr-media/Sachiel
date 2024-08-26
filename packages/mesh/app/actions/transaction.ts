'use server'

import {
  type GetMemberSingleTransactionQuery,
  GetMemberSingleTransactionDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

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

  return dataSelector(response)
}

const initialSingleTransaction = {
  isIncome: false,
  createdAt: '',
  transactionAmount: 0,
  transactionTitle: '',
}

type SingleTransaction = typeof initialSingleTransaction

const dataSelector = (
  data: GetMemberSingleTransactionQuery
): SingleTransaction => {
  const transaction = data.member?.transaction?.[0]
  const sponsor = data.member?.sponsor?.[0]

  if (transaction) {
    const isIncome = transaction.policy?.type === 'deposit'
    const amountMultiplier = isIncome ? 1 : -1
    let transactionTitle = ''

    if (
      transaction.policy?.type === 'unlock_one_publisher' &&
      transaction.policy.unlockSingle
    ) {
      transactionTitle = `單篇訂閱${
        transaction.unlockStory?.source?.title ?? ''
      } - ${transaction.unlockStory?.title ?? ''}`
    } else {
      transactionTitle = `訂閱${transaction.policy?.publisher?.title ?? ''}`
    }

    return {
      isIncome,
      createdAt: transaction.createdAt ?? '',
      transactionAmount: (transaction.policy?.charge ?? 0) * amountMultiplier,
      transactionTitle,
    }
  } else if (sponsor) {
    const isIncome = false
    return {
      isIncome,
      createdAt: sponsor.createdAt ?? '',
      transactionAmount: (sponsor.fee ?? 0) * -1,
      transactionTitle: `贊助${sponsor.publisher?.title}` ?? '',
    }
  }

  return initialSingleTransaction
}
