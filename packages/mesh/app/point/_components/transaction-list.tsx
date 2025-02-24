'use client'

import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import Link from 'next/link'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Icon from '@/components/icon'
import { ImageCategory } from '@/constants/fallback-src'
import { displayTime } from '@/utils/story-display'
import { transformTransactionRecord } from '@/utils/transaction-records'

import LoadMoreTransaction from './load-more-transaction'
import { type Transaction } from './mesh-point'

export default function TransactionList({
  initialList,
  pageSize,
  amountOfElements,
  hasMoreData,
  fetchMoreTransaction,
}: {
  initialList: Transaction['combinedRecord']
  pageSize: number
  amountOfElements: number
  hasMoreData: boolean
  fetchMoreTransaction: (
    pageIndex: number
  ) => Promise<Transaction['combinedRecord']>
}) {
  return (
    <InfiniteScrollList
      initialList={initialList}
      pageSize={pageSize}
      amountOfElements={amountOfElements}
      fetchListInPage={fetchMoreTransaction}
      isAutoFetch={false}
      loader={hasMoreData ? <LoadMoreTransaction /> : null}
    >
      {(renderList) =>
        renderList.map((data, index) => {
          const response = transformTransactionRecord(data)
          const transactionTitle = response?.transactionTitle ?? ''
          const transactionAmount = response?.transactionAmount ?? 0

          return (
            <Link
              href={`/point/record/${data.tid}`}
              key={data.tid}
              className={`group flex flex-row gap-2 ${
                index === 0 ? 'pb-5' : 'py-5'
              } ${
                index !== renderList.length - 1
                  ? 'border-b-[0.5px] border-primary-200'
                  : ''
              }`}
            >
              {data.__typename === 'Sponsorship' ? (
                <>
                  <ImageWithFallback
                    className="size-11"
                    src={data.publisher?.logo ?? ''}
                    width={44}
                    height={44}
                    alt={`${transactionTitle}-logo`}
                    style={{
                      borderRadius: '8px',
                      backgroundColor: '#E0E0E0',
                    }}
                    fallbackCategory={ImageCategory.PUBLISHER}
                  />
                  <div className="flex w-full flex-col gap-1">
                    <div className="subtitle-2 flex justify-between gap-4">
                      <p className="text-primary-700 group-hover:text-primary-500 group-active:text-primary-500">
                        {transactionTitle}
                      </p>
                      <p className="text-primary-700">{transactionAmount}</p>
                    </div>
                    <p className="caption-1 text-primary-500">
                      {displayTime(data.createdAt)}
                    </p>
                  </div>
                </>
              ) : data.__typename === 'Transaction' ? (
                <>
                  {data.policy?.unlockSingle ? (
                    <ImageWithFallback
                      className="size-11"
                      src={data.unlockStory?.source?.logo ?? ''}
                      width={44}
                      height={44}
                      alt={`${data.unlockStory?.title}-logo`}
                      style={{
                        borderRadius: '8px',
                        backgroundColor: '#E0E0E0',
                      }}
                      fallbackCategory={ImageCategory.PUBLISHER}
                    />
                  ) : (
                    <Icon
                      iconName={'icon-readr-logo-simple'}
                      size="2xl"
                      className="size-11"
                    />
                  )}
                  <div className="flex w-full flex-col gap-1">
                    <div className="subtitle-2 flex justify-between gap-4">
                      <p className="text-primary-700 group-hover:text-primary-500 group-active:text-primary-500">
                        {transactionTitle}
                      </p>
                      {data.policy?.type === 'deposit' ? (
                        <p className="text-custom-blue">+{transactionAmount}</p>
                      ) : (
                        <p className="text-primary-700">{transactionAmount}</p>
                      )}
                    </div>
                    <p className="caption-1 text-primary-500">
                      {displayTime(data.createdAt)}
                    </p>
                  </div>
                </>
              ) : null}
            </Link>
          )
        })
      }
    </InfiniteScrollList>
  )
}
