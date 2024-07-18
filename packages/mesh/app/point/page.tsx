import Icon from '@/components/icon'

import LoadMoreTransaction from './_components/load-more-transaction'
import MeshPointHelper from './_components/mesh-point-helper'

export default async function Page() {
  //TODO: update mock data to sync with server
  const transactionData = [
    {
      month: 12,
      record: [
        {
          id: 1,
          title: '廣告分潤',
          type: 'ad',
          time: '2022/12/31 16:33',
          amount: 1000,
        },
        {
          id: 2,
          title:
            '單篇訂閱鏡週刊 - 合法攻防還是政治惡鬥？那些年被癱瘓的國會：回顧十大爭議法案審查全記錄',
          type: 'sponsor',
          time: '2022/5/19 06:29',
          amount: -5,
        },
        {
          id: 3,
          title: '系統獎勵',
          type: 'reward',
          time: '2022/12/31 16:33',
          amount: 0.01,
        },
        {
          id: 4,
          title: '贊助 READr',
          type: 'sponsor',
          time: '2022/5/19 06:29',
          amount: -10,
        },
      ],
    },
    {
      month: 11,
      record: [],
    },
    {
      month: 10,
      record: [
        {
          id: 5,
          title: '系統獎勵',
          type: 'reward',
          time: '2022/10/20 10:00',
          amount: 0.02,
        },
        {
          id: 6,
          title: '首度連結錢包',
          type: 'reward',
          time: '2022/10/15 14:20',
          amount: 100,
        },
      ],
    },
  ]
  return (
    <main className="sm:p-5 md:px-[70px] md:py-10 lg:p-10">
      <div className="bg-white sm:rounded-md sm:drop-shadow">
        <section className="flex h-[190px] flex-col justify-center border-b-[0.5px] border-primary-200 sm:h-[128px] sm:flex-row sm:justify-between sm:px-10 sm:py-8">
          <div className="flex flex-col justify-center gap-2 sm:flex-col-reverse sm:self-end">
            <div className="flex flex-row items-center justify-center gap-1">
              <Icon iconName="icon-mesh-point" size="m" className="h-6 w-6" />
              <p className="hero-title text-primary-700">9,245.5902</p>
            </div>
            <MeshPointHelper />
          </div>
          <div className="flex flex-row items-center justify-center gap-4 pt-6 sm:gap-5 sm:self-end sm:pt-0">
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <p className="profile-title-2 text-primary-700">129次</p>
              <p className="profile-subtitle text-primary-500">已贊助次數</p>
            </div>
            <div className="h-5 w-0 border-[0.5px] border-primary-200 sm:hidden"></div>
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <p className="profile-title-2 text-primary-700">17篇</p>
              <p className="profile-subtitle text-primary-500">訂閱中文章</p>
            </div>
          </div>
        </section>
        <>
          {transactionData.length === 0 ? (
            <section className="flex h-[calc(100vh-313px)] w-full items-center justify-center bg-multi-layer-light sm:h-[calc(100vh-591px)] sm:rounded-md sm:bg-white">
              <p className="body-3 text-primary-500">沒有交易紀錄</p>
            </section>
          ) : (
            transactionData.map((data) => (
              <section key={data.month} className="px-5 py-4 sm:px-10">
                <h4 className="list-title pb-3 text-primary-700">
                  {data.month}月
                </h4>
                {data.record.length === 0 ? (
                  <p className="body-3 text-primary-500">沒有交易紀錄</p>
                ) : (
                  data.record.map((record, index) => (
                    <div
                      key={record.id}
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
                        className="h-11 w-11"
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
                        <p className="caption-1 text-primary-500">
                          {record.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </section>
            ))
          )}
        </>
        {transactionData.length === 0 ? null : <LoadMoreTransaction />}
      </div>
    </main>
  )
}
