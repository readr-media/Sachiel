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

type SingleTransaction = {
  isIncome: boolean
  createdAt: string
  transactionAmount: number
  transactionTitle: string
} | null

const dataSelector = (
  data: GetMemberSingleTransactionQuery
): SingleTransaction => {
  const transaction = data.member?.transaction?.[0]
  const sponsor = data.member?.sponsor?.[0]

  if (transaction) {
    const isIncome = transaction.policy?.type === 'deposit'
    let transactionTitle = ''
    let transactionAmount = 0

    switch (transaction.policy?.type) {
      case 'deposit':
        //TODO: check deposit use cases
        transactionTitle = '分潤'
        transactionAmount = (transaction.depositVolume ?? 0) * 1
        break
      case 'unlock_one_publisher':
        if (transaction.policy.unlockSingle) {
          transactionTitle = `單篇訂閱${
            transaction.unlockStory?.source?.title ?? ''
          } - ${transaction.unlockStory?.title ?? ''}`
          transactionAmount = (transaction.policy?.charge ?? 0) * -1
        } else {
          transactionTitle = `訂閱${transaction.policy?.publisher?.title ?? ''}`
          transactionAmount = (transaction.policy?.charge ?? 0) * -1
        }
        break
      case 'unlock_all_publishers':
        transactionTitle = '訂閱所有媒體'
        transactionAmount = (transaction.policy?.charge ?? 0) * -1
        break
      default:
        transactionTitle = ''
        transactionAmount = 0
        break
    }

    return {
      isIncome,
      createdAt: transaction.createdAt ?? '',
      transactionAmount,
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

  return null
}
