'use client'

import { useEffect, useState } from 'react'

import { getPublisherTransactionRecord } from '@/app/actions/media-backstage'
import type { TransactionData } from '@/types/media-backstage'
import { RecordType } from '@/types/media-backstage'

import Loading from './loading'
import MeshPointInfo from './mesh-point-info'
import RecordController from './record-controller'
import RecordList from './record-list'

export default function MeshPoint({
  balance,
  publisherCustomId,
}: {
  balance: number | undefined
  publisherCustomId: string
}) {
  const [recordType, setRecordType] = useState(RecordType.Sponsor)
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null)
  const recordData = transactionData?.[recordType]

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPublisherTransactionRecord(publisherCustomId)

      if (response) {
        setTransactionData(response)
      }
    }
    fetchData()
  }, [publisherCustomId, recordType])

  if (!recordData) return <Loading />

  return (
    <div className="flex grow flex-col gap-5">
      <RecordController
        currentRecordType={recordType}
        setRecordType={setRecordType}
      />
      <div className="flex grow flex-col rounded-xl bg-white drop-shadow">
        <MeshPointInfo balance={balance} />
        <RecordList recordData={recordData} />
      </div>
    </div>
  )
}
