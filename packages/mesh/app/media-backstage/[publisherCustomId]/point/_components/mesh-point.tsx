'use client'

import { useEffect, useRef, useState } from 'react'

import { getPublisherTransactionRecord } from '@/app/actions/media-backstage'
import type { RecordData, TransactionData } from '@/types/media-backstage'
import { RecordType } from '@/types/media-backstage'

import Loading from './loading'
import MeshPointInfo from './mesh-point-info'
import RecordList from './record-list'

export default function MeshPoint({
  balance,
  publisherCustomId,
}: {
  balance: number | undefined
  publisherCustomId: string
}) {
  const [recordType] = useState(RecordType.Sponsor)
  const [recordData, setRecordData] = useState<RecordData | null>()
  const transactionDataRef = useRef<TransactionData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPublisherTransactionRecord(publisherCustomId)

      if (response) {
        transactionDataRef.current = response
        setRecordData(response[recordType])
      }
    }

    fetchData()
  }, [publisherCustomId, recordType])

  if (!recordData) return <Loading />

  return (
    <div className="flex grow flex-col rounded-xl bg-white drop-shadow">
      <MeshPointInfo balance={balance} />
      <RecordList recordData={recordData} />
    </div>
  )
}
