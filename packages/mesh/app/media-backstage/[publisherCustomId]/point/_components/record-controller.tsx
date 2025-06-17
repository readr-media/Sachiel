import { type Dispatch, type SetStateAction } from 'react'

import { useCustomTranslation } from '@/hooks/use-custom-translation'
import type { PointRecordDate } from '@/types/media-backstage'
import { RecordType } from '@/types/media-backstage'

import DatePicker from './date-picker'

const recordTypes = Object.values(RecordType)

const recordTypeWordingKeys = {
  [RecordType.Sponsor]: {
    key: 'RecordController-record-type-sponsor',
    name: '贊助',
  },
  [RecordType.Transaction]: {
    key: 'RecordController-record-type-transaction',
    name: '付費解鎖',
  },
  [RecordType.MutualFund]: {
    key: 'RecordController-record-type-mutual-fund',
    name: '共同基金池',
  },
  [RecordType.Redeem]: {
    key: 'RecordController-record-type-redeem',
    name: '點數兌換',
  },
} as const

export default function RecordController({
  currentRecordType,
  setRecordType,
  date,
  setDate,
}: {
  currentRecordType: RecordType
  setRecordType: Dispatch<SetStateAction<RecordType>>
  date: PointRecordDate
  setDate: Dispatch<SetStateAction<PointRecordDate>>
}) {
  const { t } = useCustomTranslation()

  return (
    <div className="flex justify-between">
      <nav className="flex gap-2">
        {recordTypes.map((recordType) => (
          <RecordFilter
            key={recordType}
            text={t(
              `Pages.Media-Backstage.${recordTypeWordingKeys[recordType].key}`,
              recordTypeWordingKeys[recordType].name
            )}
            isActive={currentRecordType === recordType}
            onClick={() => {
              setRecordType(recordType)
            }}
          />
        ))}
      </nav>
      <DatePicker date={date} setDate={setDate} />
    </div>
  )
}

const RecordFilter = ({
  text,
  isActive,
  onClick,
}: {
  text: string
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <button
      className={`button-large rounded-[100px] border px-4 py-2
        ${
          isActive
            ? 'border-primary-700 bg-primary-700 text-white'
            : 'border-primary-200 bg-white text-primary-700 hover:border-primary-400 hover:bg-primary-100 active:border-primary-700 active:bg-primary-700 active:text-white'
        }`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
