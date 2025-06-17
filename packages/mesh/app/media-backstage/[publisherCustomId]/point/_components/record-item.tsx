import { forwardRef } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Avatar from '@/components/story-card/avatar'
import { ImageCategory } from '@/constants/fallback-src'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import type {
  Record,
  RedeemRecord,
  SponsorRecord,
  TransactionRecord,
} from '@/types/media-backstage'
import { displayTime } from '@/utils/story-display'

export default forwardRef(function RecordItem(
  { record }: { record: Record },
  ref
) {
  switch (record.__typename) {
    case 'Transaction':
      return <TransactionRecordItem record={record} ref={ref} />
    case 'Sponsorship':
      return <SponsorRecordItem record={record} ref={ref} />
    case 'Exchange':
      return <RedeemRecordItem record={record} ref={ref} />

    default:
      return null
  }
})

const TransactionRecordItem = forwardRef(
  ({ record }: { record: TransactionRecord }, ref) => {
    const { t } = useCustomTranslation()
    const { member, policy, unlockStory, createdAt } = record

    if (!(policy?.type === 'unlock_one_publisher' && policy.unlockSingle)) {
      console.error(
        `媒體有不支援的交易紀錄，交易id:${record.id}, ${policy?.explanation}`,
        record
      )
      return null
    }

    const transactionTitle = t(
      'Pages.Media-Backstage.RecordItem-transaction-title',
      '{{name}} - 付費解鎖 - {{title}}',
      {
        name: member?.name ?? '會員',
        title: unlockStory?.title ?? '文章',
      }
    )
    return (
      <li
        className="flex gap-2 py-5"
        ref={ref as React.RefObject<HTMLLIElement>}
      >
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
)
TransactionRecordItem.displayName = 'TransactionRecordItem'

const SponsorRecordItem = forwardRef(
  ({ record }: { record: SponsorRecord }, ref) => {
    const { t } = useCustomTranslation()
    const { sponsor, fee, createdAt } = record

    const transactionTitle = t(
      'Pages.Media-Backstage.RecordItem-sponsor-title',
      '{{name}} - 贊助',
      {
        name:
          sponsor?.name ??
          t('Pages.Media-Backstage.RecordItem-sponsor-name-fallback', '會員'),
      }
    )
    return (
      <li
        className="flex gap-2 py-5"
        ref={ref as React.RefObject<HTMLLIElement>}
        id={displayTime(createdAt)}
      >
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
)
SponsorRecordItem.displayName = 'SponsorRecordItem'

const RedeemRecordItem = forwardRef(
  ({ record }: { record: RedeemRecord }, ref) => {
    const { t } = useCustomTranslation()
    const { publisher, exchangeVolume, createdAt } = record

    const transactionTitle = t(
      'Pages.Media-Backstage.RecordItem-redeem-title',
      '點數兌換'
    )
    return (
      <li
        className="flex gap-2 py-5"
        ref={ref as React.RefObject<HTMLLIElement>}
      >
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
)
RedeemRecordItem.displayName = 'RedeemRecordItem'
