import type {
  GetCurrentUserMemberIdQuery,
  GetPublisherExchangesQuery,
  GetPublisherSponsorshipsQuery,
  GetPublisherTransactionsQuery,
} from '@/graphql/__generated__/graphql'

export type Media = NonNullable<
  NonNullable<GetCurrentUserMemberIdQuery['member']>['publishers']
>[number]

export enum RecordType {
  Sponsor = 'sponsor',
  Transaction = 'transaction',
  MutualFund = 'mutual-fund',
  Redeem = 'redeem',
}

export type SponsorRecord = NonNullable<
  GetPublisherSponsorshipsQuery['sponsorships']
>[number]
export type TransactionRecord = NonNullable<
  GetPublisherTransactionsQuery['transactions']
>[number]
export type RedeemRecord = NonNullable<
  GetPublisherExchangesQuery['redeems']
>[number]

export type Record = SponsorRecord | TransactionRecord | RedeemRecord
export type RecordData = {
  totalCount: number
  records: Record[]
  initialized: boolean
  shouldLoadMore: boolean
}

export type PointRecordDate = {
  year: number
  month: number
}
