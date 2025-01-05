import type { RecordData } from '@/types/media-backstage'

import RecordItem from './record-item'

export default function RecordList({ recordData }: { recordData: RecordData }) {
  const { records, totalCount } = recordData

  return (
    <section className="flex w-full grow flex-col px-10">
      {!totalCount ? (
        <p className="button-large flex grow items-center justify-center text-primary-400">
          目前沒有紀錄
        </p>
      ) : (
        <ul>
          {records.map((record) => (
            <RecordItem key={record.createdAt} record={record} />
          ))}
        </ul>
      )}
    </section>
  )
}
