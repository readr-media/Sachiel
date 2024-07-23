import { redirect } from 'next/navigation'

import Icon from '@/components/icon'

import { getCurrentUser } from '../actions/auth'
import MeshPointHelper from './_components/mesh-point-helper'
import TransactionList from './_components/transaction-list'

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) redirect('/login')

  //TODO: update mock data to sync with server
  const transactionData = [
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
            <TransactionList
              initialList={transactionData}
              fetchMoreTransaction={async () => {
                'use server'
                //TODO: update fetching logic
                return transactionData
              }}
            />
          )}
        </>
      </div>
    </main>
  )
}
