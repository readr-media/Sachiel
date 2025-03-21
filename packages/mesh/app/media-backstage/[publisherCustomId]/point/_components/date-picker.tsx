import { useTranslations } from 'next-intl'
import type { Dispatch, SetStateAction } from 'react'
import { useMemo, useRef, useState } from 'react'

import Icon from '@/components/icon'
import useClickOutside from '@/hooks/use-click-outside'
import type { PointRecordDate } from '@/types/media-backstage'

import { getDatesToPick } from '../_utils/date'

export default function DatePicker({
  date,
  setDate,
}: {
  date: PointRecordDate
  setDate: Dispatch<SetStateAction<PointRecordDate>>
}) {
  const [showDropdown, setShowDropdown] = useState(false)
  const PickerRef = useRef(null)

  useClickOutside(PickerRef, () => {
    closeDropdown()
  })

  const closeDropdown = () => {
    setShowDropdown(false)
  }

  return (
    <div className="relative w-[180px]" ref={PickerRef}>
      <button
        className="flex rounded-md border border-primary-200 bg-white px-3 py-2 hover:border-primary-400 hover:bg-primary-100"
        onClick={() => {
          setShowDropdown(!showDropdown)
        }}
      >
        <Icon iconName="icon-calendar" size="l" />
        <div className="body-2 ml-2 text-nowrap text-primary-700">{`${date.year} 年 ${date.month} 月`}</div>
        {showDropdown ? (
          <Icon iconName="icon-fold-month-picker" size="l" />
        ) : (
          <Icon iconName="icon-expand-month-picker" size="l" />
        )}
      </button>
      {showDropdown && (
        <MonthPickerDropdown
          onClick={(date) => {
            setDate(date)
            closeDropdown()
          }}
        />
      )}
    </div>
  )
}

const MonthPickerDropdown = ({
  onClick,
}: {
  onClick: (date: PointRecordDate) => void
}) => {
  const t = useTranslations('Pages.Media-Backstage')
  const dates = useMemo(() => {
    return getDatesToPick()
  }, [])
  return (
    <ul
      className="absolute inset-x-0 top-[43px] z-modal rounded-md bg-white py-2 shadow-light-box"
      onClick={(evt) => {
        evt.stopPropagation()
      }}
    >
      {dates.map((date) => {
        const dateStr = t('DatePicker-date-format', {
          year: date.year,
          month: date.month,
        })
        return (
          <MonthPickerDropdownItem
            key={dateStr}
            dateStr={dateStr}
            onClick={() => onClick(date)}
          />
        )
      })}
    </ul>
  )
}

const MonthPickerDropdownItem = ({
  dateStr,
  onClick,
}: {
  dateStr: string
  onClick: () => void
}) => {
  return (
    <li
      className="button-large text-700 h-[38px] cursor-pointer px-5 py-2 text-primary-700 hover:bg-primary-100"
      onClick={onClick}
    >
      {dateStr}
    </li>
  )
}
