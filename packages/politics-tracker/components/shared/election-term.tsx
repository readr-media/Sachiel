import React from 'react'
import styled from 'styled-components'

const Term = styled.div`
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor.black};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  display: inline-block;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

type TermDate = {
  start_date_day: string | null
  start_date_month: string | null
  start_date_year: string | null
  end_date_day: string | null
  end_date_month: string | null
  end_date_year: string | null
}
type ElectionTermProps = {
  termDate: TermDate
  isElected?: boolean
  isIncumbent?: boolean
}

export default function ElectionTerm({
  termDate,
  isElected = false,
  isIncumbent = false,
}: ElectionTermProps): JSX.Element | null {
  const isValuesNull = Object.values(termDate).every((value) => value === null)

  //不顯示任期狀況：（1)未當選 (2) termDate 為空物件 (3)有 termDate 但所有任期時間皆為 null
  if (!isElected || Object.keys(termDate).length === 0 || isValuesNull) {
    return null
  }

  const {
    start_date_day,
    start_date_month,
    start_date_year,
    end_date_day,
    end_date_month,
    end_date_year,
  } = termDate

  type Props = {
    year: string | null
    month: string | null
    day: string | null
  }
  const formatDateString = ({ year, month, day }: Props): string => {
    if (year && month && day) {
      return `${year}-${month}-${day}`
    } else if (year && month) {
      return `${year}-${month}`
    } else if (year) {
      return year
    } else {
      return ''
    }
  }

  const startTime = formatDateString({
    year: start_date_year,
    month: start_date_month,
    day: start_date_day,
  })

  const endTime = isIncumbent
    ? ''
    : formatDateString({
        year: end_date_year,
        month: end_date_month,
        day: end_date_day,
      })

  return (
    <Term>
      任期 {startTime} ~ {endTime}
    </Term>
  )
}