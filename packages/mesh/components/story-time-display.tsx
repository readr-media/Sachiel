'use client'

import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { DAY, HOUR, MINUTE } from '@/constants/time-unit'
import { displayTime } from '@/utils/story-display'

export const DisplayTimeFromNow = ({ date }: { date: string | Date }) => {
  const t = useTranslations('Components.DisplayTimeFromNow')

  const displayTime = useMemo(() => {
    const differenceInMilliseconds = Date.now() - new Date(date).getTime()
    const differenceInMinutes = differenceInMilliseconds / MINUTE
    const differenceInHours = differenceInMilliseconds / HOUR
    const differenceInDays = differenceInMilliseconds / DAY

    const fullDisplayTime = (date: string | Date) => {
      const targetDate = new Date(date)
      const currentYear = new Date().getFullYear()
      const year = targetDate.getFullYear()
      const month = String(targetDate.getMonth() + 1).padStart(2, '0')
      const day = String(targetDate.getDate()).padStart(2, '0')

      if (year === currentYear) {
        return `${month}/${day}`
      } else {
        return `${year}/${month}/${day}`
      }
    }

    if (differenceInMilliseconds < 0) {
      return fullDisplayTime(date)
    } else if (differenceInMilliseconds < HOUR) {
      return Math.floor(differenceInMinutes) + t('mins-ago')
    } else if (differenceInMilliseconds < 24 * HOUR) {
      return Math.floor(differenceInHours) + t('hours-ago')
    } else if (differenceInMilliseconds < 7 * DAY) {
      return Math.floor(differenceInDays) + t('days-ago')
    } else {
      return fullDisplayTime(date)
    }
  }, [date, t])

  return <>{displayTime}</>
}

export const DisplayExpireTimeFromNow = ({ date }: { date: string | Date }) => {
  const t = useTranslations('Components.DisplayExpireTimeFromNow')

  const displayTime = useMemo(() => {
    const differenceInMilliseconds = new Date(date).getTime() - Date.now()
    const differenceInDays = differenceInMilliseconds / DAY
    const daysToExpire = Math.max(1, Math.ceil(differenceInDays))
    const chineseNumbers = ['', t('one'), t('two'), t('three')]
    const dayInChinese =
      chineseNumbers[daysToExpire] ?? chineseNumbers[chineseNumbers.length - 1]

    return `${dayInChinese}${t('day-unit')}`
  }, [date, t])

  return <>{displayTime}</>
}

export const DisplayTime = ({ date }: { date: string | Date }) => {
  const time = useMemo(() => displayTime(date), [date])

  return <>{time}</>
}

export const DisplayDateWithWeekday = () => {
  const t = useTranslations('Components.DisplayDateWithWeekday')

  const displayDate = useMemo(() => {
    const today = new Date()
    const month = String(today.getMonth() + 1)
    const date = String(today.getDate())
    const day = today.getDay()
    const daysOfWeek = [
      t('sunday'),
      t('monday'),
      t('tuesday'),
      t('wednesday'),
      t('thursday'),
      t('friday'),
      t('saturday'),
    ]
    const dayString = daysOfWeek[day]

    const currentTime = t('time-template', {
      month,
      date,
      dayString,
    })

    return currentTime
  }, [t])

  return <>{displayDate}</>
}
