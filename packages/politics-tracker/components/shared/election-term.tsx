import styled from 'styled-components'

import type { PersonElectionTerm } from '~/types/politics'

const Term = styled.div`
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor.black};
  width: fit-content;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  display: inline-block;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

type ElectionTermProps = {
  termDate: PersonElectionTerm
  isElected?: boolean
  isIncumbent?: boolean
}
export default function ElectionTerm({
  termDate,
  isElected = false,
  isIncumbent = false,
}: ElectionTermProps): JSX.Element | null {
  if (!termDate || termDate === null) {
    return null
  }
  //不顯示任期狀況：（1)候選人未當選 (2) termDate 為空物件 (3)有 termDate 但所有任期時間皆為 null (4)政黨頁面
  const isValuesNull = Object.values(termDate).every((value) => value === null)

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

  type Props<T> = {
    year: T
    month: T
    day: T
  }
  const formatDateString = <T extends unknown>({
    year,
    month,
    day,
  }: Props<T>): string => {
    if (year && month && day) {
      return `${year}-${month}-${day}`
    } else if (year && month) {
      return `${year}-${month}`
    } else if (year) {
      return `${year}`
    } else {
      return ''
    }
  }

  const startTime = formatDateString<typeof start_date_year>({
    year: start_date_year,
    month: start_date_month,
    day: start_date_day,
  })

  const endTime = isIncumbent
    ? ''
    : formatDateString<typeof end_date_year>({
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
