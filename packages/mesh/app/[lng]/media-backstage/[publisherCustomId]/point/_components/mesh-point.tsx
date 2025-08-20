'use client'

import { useState } from 'react'

import PointExchange from './point-exchange'
import PointRecord from './point-record'

enum PageMode {
  Record = 'record',
  Exchange = 'exchange',
}

export default function MeshPoint({
  balance,
  publisherCustomId,
}: {
  balance: number | undefined
  publisherCustomId: string
}) {
  const [pageMode, setPageMode] = useState(PageMode.Record)

  const goExchange = () => {
    setPageMode(PageMode.Exchange)
  }

  switch (pageMode) {
    case PageMode.Record:
      return (
        <PointRecord
          balance={balance}
          publisherCustomId={publisherCustomId}
          goExchange={goExchange}
        />
      )
    case PageMode.Exchange:
      return (
        <PointExchange
          balance={balance}
          publisherCustomId={publisherCustomId}
        />
      )
    default:
      return null
  }
}
