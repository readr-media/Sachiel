'use client'

import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'

import Icon from '@/components/icon'

import LoadMoreTransaction from './load-more-transaction'

type NextTransactionList = {
  month: number
  record: {
    id: number
    title: string
    type: string
    time: string
    amount: number
  }[]
}

export default function TransactionList({
  initialList,
  fetchMoreTransaction,
}: {
  initialList: NextTransactionList[]
  fetchMoreTransaction: () => Promise<NextTransactionList[]>
}) {
  // TODO: Update load more parameters with new UI and API specs

  return (
    <InfiniteScrollList
      initialList={initialList}
      pageSize={3}
      amountOfElements={6}
      fetchListInPage={fetchMoreTransaction}
      isAutoFetch={false}
      loader={<LoadMoreTransaction />}
    >
      {(renderList) =>
        renderList.map((data) => (
          <section key={data.month} className="px-5 py-4 sm:px-10">
            <h4 className="list-title pb-3 text-primary-700">{data.month}月</h4>
            {data.record.length === 0 ? (
              <p className="body-3 text-primary-500">沒有交易紀錄</p>
            ) : (
              data.record.map((record, index) => (
                <div
                  key={`${data.month}-${record.id}`}
                  className={`flex flex-row gap-2 ${
                    index === 0 ? 'pb-5' : 'py-5'
                  } ${
                    index !== data.record.length - 1
                      ? 'border-b-[0.5px] border-primary-200'
                      : ''
                  }`}
                >
                  <Icon
                    iconName={
                      record.type === 'sponsor'
                        ? 'icon-publisher-readr'
                        : 'icon-avatar-default'
                    }
                    size="2xl"
                    className="size-11"
                  />
                  <div className="flex w-full flex-col gap-1">
                    <div className="subtitle-2 flex justify-between gap-4">
                      <p className=" text-primary-700">{record.title}</p>
                      <p
                        className={`${
                          record.amount < 0
                            ? 'text-primary-700'
                            : 'text-custom-blue'
                        }`}
                      >
                        {record.amount < 0
                          ? record.amount
                          : `+${record.amount}`}
                      </p>
                    </div>
                    <p className="caption-1 text-primary-500">{record.time}</p>
                  </div>
                </div>
              ))
            )}
          </section>
        ))
      }
    </InfiniteScrollList>
  )
}
