'use client'

import MeshPointInfo from './mesh-point-info'
import TransactionList from './transaction-list'

type Transaction = {
  balance: number
  sponsoredCount: number
  subscribedArticleCount: number
  transactionData: any[]
  //TODO: sync with api response data type
}

import { DynamicWidget, useIsLoggedIn } from '@/utils/dynamic'

export default function MeshPoint() {
  const isLoggedInDynamic = useIsLoggedIn()
  const mockData = {}
  /*
  const mockData = {
    id: 1,
    name: 'brad pitt',
    balance: 9245.5902,
    sponsoredCount: 129,
    subscribedArticleCount: 17,
    transactionData: [
      {
        month: 12,
        record: [
          {
            id: 1,
            title: '廣告分潤',
            type: 'ad',
            time: '2024/12/31 16:33',
            amount: 1000,
          },
          {
            id: 2,
            title:
              '單篇訂閱鏡週刊 - 合法攻防還是政治惡鬥？那些年被癱瘓的國會：回顧十大爭議法案審查全記錄',
            type: 'sponsor',
            time: '2024/12/19 06:29',
            amount: -5,
          },
          {
            id: 3,
            title: '系統獎勵',
            type: 'reward',
            time: '2024/12/31 16:33',
            amount: 0.01,
          },
          {
            id: 4,
            title: '贊助 READr',
            type: 'sponsor',
            time: '2024/12/19 06:29',
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
            time: '2024/10/20 10:00',
            amount: 0.02,
          },
          {
            id: 6,
            title: '贊助報導者',
            type: 'sponsor',
            time: '2024/10/19 06:29',
            amount: -10,
          },
        ],
      },
      {
        month: 9,
        record: [
          {
            id: 5,
            title: '系統獎勵',
            type: 'reward',
            time: '2024/9/20 10:00',
            amount: 0.02,
          },
          {
            id: 6,
            title:
              '單篇訂閱鏡週刊 - CrowdStrike更新釀微軟當機 專家稱可能檢查不善',
            type: 'sponsor',
            time: '2024/9/19 06:29',
            amount: -5,
          },
        ],
      },
      {
        month: 8,
        record: [
          {
            id: 5,
            title: '系統獎勵',
            type: 'reward',
            time: '2024/8/20 10:00',
            amount: 0.02,
          },
          {
            id: 6,
            title: '廣告分潤',
            type: 'ad',
            time: '2024/8/31 16:33',
            amount: 0.5,
          },
        ],
      },
      {
        month: 7,
        record: [
          {
            id: 5,
            title: '贊助鏡週刊',
            type: 'sponsor',
            time: '2024/7/20 10:00',
            amount: -100000,
          },
          {
            id: 6,
            title: '首度連結錢包',
            type: 'reward',
            time: '2024/7/15 14:20',
            amount: 100,
          },
        ],
      },
    ],
  }
*/

  const {
    balance = 0,
    sponsoredCount = 0,
    subscribedArticleCount = 0,
    transactionData = [],
  } = mockData as Transaction

  return (
    <>
      {isLoggedInDynamic ? (
        <>
          <section className="flex h-[190px] flex-col justify-center border-b-[0.5px] border-primary-200 sm:h-[128px] sm:flex-row sm:justify-between sm:px-10 sm:py-8">
            <MeshPointInfo />
            <div className="flex flex-row items-center justify-center gap-4 pt-6 sm:gap-5 sm:self-end sm:pt-0">
              <div className="flex flex-col items-center gap-1 sm:flex-row">
                <p className="profile-title-2 text-primary-700">
                  {sponsoredCount}次
                </p>
                <p className="profile-subtitle text-primary-500">已贊助次數</p>
              </div>
              <div className="h-5 w-0 border-[0.5px] border-primary-200 sm:hidden"></div>
              <div className="flex flex-col items-center gap-1 sm:flex-row">
                <p className="profile-title-2 text-primary-700">
                  {subscribedArticleCount}篇
                </p>
                <p className="profile-subtitle text-primary-500">訂閱中文章</p>
              </div>
            </div>
          </section>
          <section>
            {transactionData.length === 0 ? (
              <section className="flex h-[calc(100vh-313px)] w-full items-center justify-center bg-multi-layer-light sm:h-[calc(100vh-591px)] sm:rounded-md sm:bg-white">
                <p className="body-3 text-primary-500">沒有交易紀錄</p>
              </section>
            ) : (
              <TransactionList
                initialList={transactionData}
                fetchMoreTransaction={async () => {
                  // 'use server'
                  //TODO: update fetching logic
                  return transactionData
                }}
              />
            )}
          </section>
        </>
      ) : (
        <div className="flex h-[calc(100vh-123px)] items-center justify-center sm:h-[calc(100vh-424px)]">
          <DynamicWidget
            buttonClassName=""
            buttonContainerClassName=""
            innerButtonComponent={
              <div className="inline-flex flex-row">
                <p>以Dynamic繼續</p>
              </div>
            }
          />
        </div>
      )}
    </>
  )
}
