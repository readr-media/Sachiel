import type { getPublisherTransactionRecord } from '@/app/actions/media-backstage'
import type { GetCurrentUserMemberIdQuery } from '@/graphql/__generated__/graphql'

export type Media = NonNullable<
  NonNullable<GetCurrentUserMemberIdQuery['member']>['publishers']
>[number]

export enum RecordType {
  Transaction = 'transaction',
  Sponsor = 'sponsor',
  Redeem = 'redeem',
}

export type TransactionData = Awaited<
  ReturnType<typeof getPublisherTransactionRecord>
>

type SponsorRecordData = TransactionData[RecordType.Sponsor]
type TransactionRecordData = TransactionData[RecordType.Transaction]
type RedeemRecordData = TransactionData[RecordType.Redeem]

export type RecordData =
  | SponsorRecordData
  | TransactionRecordData
  | RedeemRecordData

export type SponsorRecord = SponsorRecordData['records'][number]
export type TransactionRecord = TransactionRecordData['records'][number]
export type RedeemRecord = RedeemRecordData['records'][number]

export type Record = SponsorRecord | TransactionRecord | RedeemRecord
