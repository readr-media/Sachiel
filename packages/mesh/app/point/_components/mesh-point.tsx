'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getMemberTransactionRecord } from '@/app/actions/sponsorship'
import Spinner from '@/components/spinner'
import { useUser } from '@/context/user'
import { useIsLoggedIn } from '@/utils/dynamic'

import DynamicPanel from './dynamic-panel'
import MeshPointInfo from './mesh-point-info'
import TransactionList from './transaction-list'

export type Transaction = Awaited<ReturnType<typeof getMemberTransactionRecord>>

export default function MeshPoint() {
  const { user } = useUser()
  const isLoggedInDynamic = useIsLoggedIn()
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
  }, [isLoggedInDynamic, user.memberId])

  if (!transactionData) return <Spinner />

  return (
    <>
      {isLoggedInDynamic ? (
        <div className="bg-white sm:rounded-md sm:drop-shadow">
          <section className="flex h-[190px] flex-col justify-center border-b-[0.5px] border-primary-200 sm:h-[128px] sm:flex-row sm:justify-between sm:px-10 sm:py-8">
            <MeshPointInfo />
            <div className="flex flex-row items-center justify-center gap-4 pt-6 sm:gap-5 sm:self-end sm:pt-0">
              <div className="flex flex-col items-center gap-1 sm:flex-row">
                <Link href={'/point/sponsorship'}>
                  <p className="profile-title-2 text-center text-primary-700">
                    {transactionData.totalSponsorCount || 0}次
                  </p>
                  <p className="profile-subtitle text-primary-500">
                    已贊助次數
                  </p>
                </Link>
              </div>
              <div className="h-5 w-0 border-[0.5px] border-primary-200 sm:hidden"></div>
              <div className="flex flex-col items-center gap-1 sm:flex-row">
                <p className="profile-title-2 text-primary-700">
                  {transactionData?.unlockStoriesCount || 0}篇
                </p>
                <p className="profile-subtitle text-primary-500">訂閱中文章</p>
              </div>
            </div>
          </section>
          <section className="p-5 sm:px-10">
            {transactionData?.combinedRecord.length === 0 ? (
              <section className="flex h-[calc(100vh-313px)] w-full items-center justify-center bg-multi-layer-light sm:h-[calc(100vh-591px)] sm:rounded-md sm:bg-white">
                <p className="body-3 text-primary-500">沒有交易紀錄</p>
              </section>
            ) : (
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
            )}
          </section>
        </div>
      ) : (
        <DynamicPanel
          description="為維護交易安全，請重新登入 Dynamic 以查看讀選點數交易紀錄。"
          isHelperText={false}
        />
      )}
    </>
  )
}
