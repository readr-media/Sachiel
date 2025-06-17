'use client'

import { useMemo } from 'react'

import { DAY, HOUR, MINUTE } from '@/constants/time-unit'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { displayTime } from '@/utils/story-display'

export const DisplayTimeFromNow = ({ date }: { date: string | Date }) => {
  const { t } = useCustomTranslation()

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
      return (
        Math.floor(differenceInMinutes) +
        t('Components.DisplayTimeFromNow.mins-ago', '分鐘前')
      )
    } else if (differenceInMilliseconds < 24 * HOUR) {
      return (
        Math.floor(differenceInHours) +
        t('Components.DisplayTimeFromNow.hours-ago', '小時前')
      )
    } else if (differenceInMilliseconds < 7 * DAY) {
      return (
        Math.floor(differenceInDays) +
        t('Components.DisplayTimeFromNow.days-ago', '天前')
      )
    } else {
      return fullDisplayTime(date)
    }
  }, [date, t])

  return <>{displayTime}</>
}

export const DisplayExpireTimeFromNow = ({ date }: { date: string | Date }) => {
  const { t } = useCustomTranslation()

  const displayTime = useMemo(() => {
    const differenceInMilliseconds = new Date(date).getTime() - Date.now()
    const differenceInDays = differenceInMilliseconds / DAY
    const daysToExpire = Math.max(1, Math.ceil(differenceInDays))
    const chineseNumbers = [
      '',
      t('Components.DisplayExpireTimeFromNow.one', '一'),
      t('Components.DisplayExpireTimeFromNow.two', '二'),
      t('Components.DisplayExpireTimeFromNow.three', '三'),
    ]
    const dayInChinese =
      chineseNumbers[daysToExpire] ?? chineseNumbers[chineseNumbers.length - 1]

    return `${dayInChinese}${t(
      'Components.DisplayExpireTimeFromNow.day-unit',
      '天'
    )}`
  }, [date, t])

  return <>{displayTime}</>
}

export const DisplayTime = ({ date }: { date: string | Date }) => {
  const time = useMemo(() => displayTime(date), [date])

  return <>{time}</>
}

export const DisplayDateWithWeekday = () => {
  const { t } = useCustomTranslation()

  const displayDate = useMemo(() => {
    const today = new Date()
    const month = String(today.getMonth() + 1)
    const date = String(today.getDate())
    const day = today.getDay()
    const daysOfWeek = [
      t('Components.DisplayDateWithWeekday.sunday', '日'),
      t('Components.DisplayDateWithWeekday.monday', '一'),
      t('Components.DisplayDateWithWeekday.tuesday', '二'),
      t('Components.DisplayDateWithWeekday.wednesday', '三'),
      t('Components.DisplayDateWithWeekday.thursday', '四'),
      t('Components.DisplayDateWithWeekday.friday', '五'),
      t('Components.DisplayDateWithWeekday.saturday', '六'),
    ]
    const dayString = daysOfWeek[day]

    const currentTime = t(
      'Components.DisplayDateWithWeekday.time-template',
      '{{month}}月{{date}}日({{dayString}})',
      {
        month,
        date,
        dayString,
      }
    )

    return currentTime
  }, [t])

  return <>{displayDate}</>
}
