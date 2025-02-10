'use client'

import { useCallback, useEffect, useState } from 'react'

import {
  getPublisherRedeems,
  getPublisherSponsorships,
  getPublisherTransactions,
} from '@/app/actions/media-backstage'
import Spinner from '@/components/spinner'
import type { PointRecordDate, RecordData } from '@/types/media-backstage'
import { RecordType } from '@/types/media-backstage'

import { getCurrentDate, getFirstAndLastSeconds } from '../_utils/date'
import MeshPointInfo from './mesh-point-info'
import RecordController from './record-controller'
import RecordList from './record-list'

type PageData = Record<RecordType, RecordData>

const recordTypes = Object.values(RecordType)
const getInitialPageData = () => {
  return recordTypes.reduce((acc, curr) => {
    acc[curr] = {
      totalCount: 0,
      records: [],
      initialized: false,
      shouldLoadMore: false,
    }
    return acc
  }, {} as PageData)
}

const recordTake = 10

export default function PointRecord({
  balance,
  publisherCustomId,
  goExchange,
}: {
  balance: number | undefined
  publisherCustomId: string
  goExchange: () => void
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [recordType, setRecordType] = useState(RecordType.Sponsor)
  const [shouldLoadMore, setShouldLoadMore] = useState(false)
  const [date, setDate] = useState<PointRecordDate>(getCurrentDate())
  const [pageDataInRecordTypes, setPageDataInRecordTypes] = useState(
    getInitialPageData()
  )
  const recordData = pageDataInRecordTypes?.[recordType]

  const getRecordsInPage = useCallback(
    async ({
      take,
      skip,
      recordType,
    }: {
      take: number
      skip: number
      recordType: RecordType
    }): Promise<RecordData> => {
      const { firstSecond: gte, lastSecond: lte } = getFirstAndLastSeconds(date)
      switch (recordType) {
        case RecordType.Sponsor: {
          const response = await getPublisherSponsorships({
            publisherCustomId,
            take,
            skip,
            gte,
            lte,
          })
          return {
            totalCount: response?.sponsorshipsCount ?? 0,
            records: response?.sponsorships ?? [],
            initialized: true,
            shouldLoadMore:
              response?.sponsorshipsCount !== response?.sponsorships?.length,
          }
        }
        case RecordType.Transaction: {
          const response = await getPublisherTransactions({
            publisherCustomId,
            take,
            skip,
            gte,
            lte,
          })
          return {
            totalCount: response?.transactionsCount ?? 0,
            records: response?.transactions ?? [],
            initialized: true,
            shouldLoadMore:
              response?.transactionsCount !== response?.transactions?.length,
          }
        }
        case RecordType.Redeem: {
          const response = await getPublisherRedeems({
            publisherCustomId,
            take,
            skip,
            gte,
            lte,
          })
          return {
            totalCount: response?.redeemsCount ?? 0,
            records: response?.redeems ?? [],
            initialized: true,
            shouldLoadMore:
              response?.redeemsCount !== response?.redeems?.length,
          }
        }
        case RecordType.MutualFund:
          // TODO: implement wehn mutualfund feature is ready
          return {
            totalCount: 0,
            records: [],
            initialized: true,
            shouldLoadMore: false,
          }
        default:
          return {
            totalCount: 0,
            records: [],
            initialized: true,
            shouldLoadMore: false,
          }
      }
    },
    [date, publisherCustomId]
  )

  // Trigger loadmore (set flag instead of calling loadmore fn to prevent this function change cause RecordList rerender)
  const triggerLoadMoreRecords = useCallback(() => {
    setShouldLoadMore(true)
  }, [])

  // Reset page data if date changes
  useEffect(() => {
    setPageDataInRecordTypes(getInitialPageData())
  }, [date])

  // Actually fetch more records
  useEffect(() => {
    const loadMoreRecords = async () => {
      // keep the recordType in closure in case it change while fetching
      const currentRecordType = recordType

      const newRecordData = await getRecordsInPage({
        take: recordTake,
        skip: recordData.records.length,
        recordType: currentRecordType,
      })

      setPageDataInRecordTypes((pageDataInRecordTypes) => {
        const newRecords = [
          ...pageDataInRecordTypes[currentRecordType].records,
          ...newRecordData.records,
        ]
        return {
          ...pageDataInRecordTypes,
          [currentRecordType]: {
            totalCount: newRecordData.totalCount,
            records: newRecords,
            initialized: true,
            shouldLoadMore: newRecordData.totalCount !== newRecords.length,
          },
        }
      })
    }

    if (shouldLoadMore) {
      loadMoreRecords()
      setShouldLoadMore(false)
    }
  }, [getRecordsInPage, recordData.records.length, recordType, shouldLoadMore])

  // Fetch when pageData is not initialized
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      // keep the recordType in closure in case it change while fetching
      const currentRecordType = recordType

      const newRecordData = await getRecordsInPage({
        take: recordTake,
        skip: recordData.records.length,
        recordType: currentRecordType,
      })

      setPageDataInRecordTypes((pageDataInRecordTypes) => ({
        ...pageDataInRecordTypes,
        [currentRecordType]: newRecordData,
      }))
      setIsLoading(false)
    }
    if (!recordData.initialized) {
      fetchData()
    }
  }, [
    getRecordsInPage,
    publisherCustomId,
    recordData.initialized,
    recordData.records.length,
    recordType,
  ])

  return (
    <div className="flex min-w-[800px] max-w-[1040px] grow flex-col gap-5 p-10 pb-[134px]">
      <RecordController
        currentRecordType={recordType}
        setRecordType={setRecordType}
        date={date}
        setDate={setDate}
      />
      <div className="flex grow flex-col rounded-xl bg-white drop-shadow">
        <MeshPointInfo balance={balance} goExchange={goExchange} />
        {isLoading ? (
          <Spinner />
        ) : (
          <RecordList
            recordData={recordData}
            loadMoreRecords={triggerLoadMoreRecords}
          />
        )}
      </div>
    </div>
  )
}
