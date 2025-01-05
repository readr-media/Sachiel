import type { Dispatch, SetStateAction } from 'react'

import { RecordType } from '@/types/media-backstage'

const recordTypes = Object.values(RecordType)

const recordTypeWordings = {
  [RecordType.Sponsor]: '贊助',
  [RecordType.Transaction]: '付費解鎖',
  [RecordType.MutualFund]: '共同基金池',
  [RecordType.Redeem]: '點數兌換',
} as const

export default function RecordController({
  currentRecordType,
  setRecordType,
}: {
  currentRecordType: RecordType
  setRecordType: Dispatch<SetStateAction<RecordType>>
}) {
  return (
    <div className="flex justify-between">
      <nav className="flex gap-2">
        {recordTypes.map((recordType) => (
          <RecordFilter
            key={recordType}
            text={recordTypeWordings[recordType]}
            isActive={currentRecordType === recordType}
            onClick={() => {
              setRecordType(recordType)
            }}
          />
        ))}
      </nav>
      <div></div>
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
