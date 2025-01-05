import ImageWithFallback from '@/app/_components/image-with-fallback'
import Avatar from '@/components/story-card/avatar'
import { ImageCategory } from '@/constants/fallback-src'
import type {
  Record,
  RedeemRecord,
  TransactionRecord,
} from '@/types/media-backstage'
import type { SponsorRecord } from '@/types/media-backstage'
import { displayTime } from '@/utils/story-display'

export default function RecordItem({ record }: { record: Record }) {
  switch (record.__typename) {
    case 'Transaction':
      return <TransactionRecordItem record={record} />
    case 'Sponsorship':
      return <SponsorRecordItem record={record} />
    case 'Exchange':
      return <RedeemRecordItem record={record} />

    default:
      return null
  }
}

const TransactionRecordItem = ({ record }: { record: TransactionRecord }) => {
  const { member, policy, unlockStory, createdAt } = record

  if (!(policy?.type === 'unlock_one_publisher' && policy.unlockSingle)) {
    console.error(
      `媒體有不支援的交易紀錄，交易id:${record.id}, ${policy?.explanation}`,
      record
    )
    return null
  }

  const transactionTitle = `${member?.name ?? '會員'} - 付費解鎖 - ${
    unlockStory?.title ?? '文章'
  }`
  return (
    <li className="flex gap-2 py-5">
      <Avatar size="l" src={member?.avatar ?? ''} />
      <div className="flex w-full flex-col gap-1">
        <div className="subtitle-2 flex justify-between gap-4">
          <p className="text-primary-700 group-hover:text-primary-500 group-active:text-primary-500">
            {transactionTitle}
          </p>
          {policy?.charge && (
            <p className="subtitle-2 w-12 text-custom-blue">{`+${policy.charge}`}</p>
          )}
        </div>
        <p className="caption-1 text-primary-500">{displayTime(createdAt)}</p>
      </div>
    </li>
  )
}

const SponsorRecordItem = ({ record }: { record: SponsorRecord }) => {
  const { sponsor, fee, createdAt } = record

  const transactionTitle = `${sponsor?.name ?? '會員'} - 贊助`
  return (
    <li className="flex gap-2 py-5">
      <Avatar size="l" src={sponsor?.avatar ?? ''} />
      <div className="flex w-full flex-col gap-1">
        <div className="subtitle-2 flex justify-between gap-4">
          <p className="text-primary-700 group-hover:text-primary-500 group-active:text-primary-500">
            {transactionTitle}
          </p>
          {fee && (
            <p className="subtitle-2 w-12 text-custom-blue">{`+${fee}`}</p>
          )}
        </div>
        <p className="caption-1 text-primary-500">{displayTime(createdAt)}</p>
      </div>
    </li>
  )
}

const RedeemRecordItem = ({ record }: { record: RedeemRecord }) => {
  const { publisher, exchangeVolume, createdAt } = record

  const transactionTitle = '點數兌換'
  return (
    <li className="flex gap-2 py-5">
      <div className="relative size-11 overflow-hidden rounded-lg border-primary-200">
        <ImageWithFallback
          src={publisher?.logo ?? ''}
          fill
          alt={publisher?.title ?? ''}
          fallbackCategory={ImageCategory.PUBLISHER}
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="subtitle-2 flex justify-between gap-4">
          <p className="text-primary-700 group-hover:text-primary-500 group-active:text-primary-500">
            {transactionTitle}
          </p>
          {exchangeVolume && (
            <p className="subtitle-2 w-12 text-primary-700">{`-${exchangeVolume}`}</p>
          )}
        </div>
        <p className="caption-1 text-primary-500">{displayTime(createdAt)}</p>
      </div>
    </li>
  )
}
