'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getMemberTransactionRecord } from '@/app/actions/sponsorship'
import { useUser } from '@/context/user'

import Loading from './loading'
import MeshPointInfo from './mesh-point-info'
import TransactionList from './transaction-list'

export type Transaction = Awaited<ReturnType<typeof getMemberTransactionRecord>>

export default function MeshPoint({
  balance,
}: {
  balance: number | undefined
}) {
  const { user } = useUser()
  const [transactionData, setTransactionData] = useState<Transaction | null>(
    null
  )
  const [hasMoreData, setHasMoreData] = useState(true)
  const transactionRecordTake = 7

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMemberTransactionRecord(
        user.memberId,
        transactionRecordTake
      )

      if (response) {
        setTransactionData(response)
      }
    }

    fetchData()
  }, [user.memberId])

  if (!transactionData) return <Loading />

  return (
    <div className="bg-white sm:rounded-md sm:drop-shadow">
      <section className="flex h-[190px] flex-col justify-center border-b-[0.5px] border-primary-200 sm:h-[128px] sm:flex-row sm:justify-between sm:px-10 sm:py-8">
        <MeshPointInfo balance={balance} />
        <div className="flex flex-row items-center justify-center gap-4 pt-6 sm:gap-5 sm:self-end sm:pt-0">
          <Link href={'/point/sponsorship'}>
            <div className="group flex flex-col items-center gap-1 sm:flex-row">
              <p className="profile-title-2 text-primary-700 group-hover:text-primary-500 group-active:text-primary-500">
                {transactionData.totalSponsorCount || 0}次
              </p>
              <p className="profile-subtitle text-primary-500">已贊助次數</p>
            </div>
          </Link>
          <div className="h-5 w-0 border-[0.5px] border-primary-200 sm:hidden"></div>
          <Link href={'/point/subscribe-stories'}>
            <div className="group flex flex-col items-center gap-1 sm:flex-row">
              <p className="profile-title-2 text-center text-primary-700 group-hover:text-primary-500 group-active:text-primary-500">
                {transactionData?.unlockStoriesCount || 0}篇
              </p>
              <p className="profile-subtitle text-primary-500">訂閱中文章</p>
            </div>
          </Link>
        </div>
      </section>

      {transactionData?.combinedRecord.length === 0 ? (
        <section className="flex h-[calc(100vh-313px)] w-full items-center justify-center bg-multi-layer-light sm:h-[calc(100vh-591px)] sm:rounded-md sm:bg-white">
          <p className="body-3 text-primary-500">沒有交易紀錄</p>
        </section>
      ) : (
        <section className="p-5 sm:px-10">
          <TransactionList
            initialList={transactionData['combinedRecord']}
            pageSize={transactionRecordTake}
            amountOfElements={200}
            hasMoreData={hasMoreData}
            fetchMoreTransaction={async (pageIndex: number) => {
              if (!hasMoreData) return []
              const { combinedRecord } = await getMemberTransactionRecord(
                user.memberId,
                transactionRecordTake * pageIndex,
                transactionRecordTake * (pageIndex - 1)
              )
              if (combinedRecord.length) {
                return combinedRecord
              } else {
                setHasMoreData(false)
                return []
              }
            }}
          />
        </section>
      )}
    </div>
  )
}
