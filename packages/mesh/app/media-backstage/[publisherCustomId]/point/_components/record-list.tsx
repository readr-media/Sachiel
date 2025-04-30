import { useEffect } from 'react'

import { useCustomTranslation } from '@/hooks/use-custom-translation'
import useInViewDynamicRef from '@/hooks/use-in-view-dynamic-ref'
import type { RecordData } from '@/types/media-backstage'

import RecordItem from './record-item'

export default function RecordList({
  recordData,
  loadMoreRecords,
}: {
  recordData: RecordData
  loadMoreRecords: () => void
}) {
  const { t } = useCustomTranslation()
  const { setTarget: triggerLoadmoreRef, isIntersecting: shouldStartLoadMore } =
    useInViewDynamicRef()
  const { records, totalCount, shouldLoadMore } = recordData

  useEffect(() => {
    if (shouldStartLoadMore && shouldLoadMore) {
      loadMoreRecords()
    }
  }, [loadMoreRecords, shouldLoadMore, shouldStartLoadMore])

  return (
    <section className="flex w-full grow flex-col px-10">
      {!totalCount ? (
        <p className="button-large flex grow items-center justify-center text-primary-400">
          {t('Pages.Media-Backstage.RecordList-no-record', '目前沒有紀錄')}
        </p>
      ) : (
        <ul>
          {records.map((record, i) => (
            <RecordItem
              key={`${record.createdAt}-${i}`}
              record={record}
              ref={i === records.length - 3 ? triggerLoadmoreRef : undefined}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
