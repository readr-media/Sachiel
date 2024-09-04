import { type GetMemberSingleTransactionQuery } from '@/graphql/__generated__/graphql'

export const recordSelector = (data: GetMemberSingleTransactionQuery) => {
  if (data.member?.transaction && data.member.transaction.length > 0) {
    return data.member?.transaction?.[0]
  } else if (data.member?.sponsor && data.member.sponsor.length > 0) {
    return data.member?.sponsor?.[0]
  }
  return null
}
type SelectedData = ReturnType<typeof recordSelector>

export const transformTransactionRecord = (data: SelectedData) => {
  if (!data) return null

  let transactionTitle = ''
  let transactionAmount = 0
  const createdAt = data.createdAt

  if (data.__typename === 'Transaction') {
    const isIncome = data.policy?.type === 'deposit'
    switch (data.policy?.type) {
      case 'deposit':
        transactionTitle = '分潤'
        transactionAmount = (data.depositVolume ?? 0) * 1
        break
      case 'unlock_one_publisher':
        if (data.policy.unlockSingle) {
          transactionTitle = `單篇訂閱${
            data.unlockStory?.source?.title ?? ''
          } - ${data.unlockStory?.title ?? ''}`
          transactionAmount = (data.policy.charge ?? 0) * -1
        } else {
          transactionTitle = `訂閱${data.policy?.publisher?.title ?? ''}`
          transactionAmount = (data.policy.charge ?? 0) * -1
        }
        break
      case 'unlock_all_publishers':
        transactionTitle = '訂閱所有媒體'
        transactionAmount = (data.policy.charge ?? 0) * -1
        break
      default:
        transactionTitle = ''
        transactionAmount = 0
        break
    }
    return {
      isIncome,
      createdAt,
      transactionAmount,
      transactionTitle,
    }
  } else if (data.__typename === 'Sponsorship') {
    return {
      isIncome: false,
      createdAt: data.createdAt ?? '',
      transactionAmount: (data.fee ?? 0) * -1,
      transactionTitle: `贊助${data.publisher?.title}` ?? '',
    }
  }

  return null
}
