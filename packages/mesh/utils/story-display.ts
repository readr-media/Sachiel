import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { DAY, HOUR, MINUTE } from '@/constants/time-unit'
import { type UserActionStoryFragment } from '@/graphql/__generated__/graphql'

export const displayTimeFromNow = (date: string | Date) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('Utils.displayTimeFromNow')
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
}

export const displayExpireTimeFromNow = (date: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('Utils.displayExpireTimeFromNow')

  const differenceInMilliseconds = new Date(date).getTime() - Date.now()
  const differenceInDays = differenceInMilliseconds / DAY
  const daysToExpire = Math.max(1, Math.ceil(differenceInDays))
  const chineseNumbers = ['', t('one'), t('two'), t('three')]
  const dayInChinese =
    chineseNumbers[daysToExpire] ?? chineseNumbers[chineseNumbers.length - 1]

  return `${dayInChinese}${t('day-unit')}`
}

type Picks = UserActionStoryFragment['pick']

export const getDisplayPicks = (
  picks: Picks,
  followingMemberIds: Set<string>
) => {
  const picksFromFollowingMember: Picks = []
  const picksFromStranger: Picks = []

  picks?.forEach((pick) =>
    followingMemberIds.has(pick.member?.id ?? '')
      ? picksFromFollowingMember.push(pick)
      : picksFromStranger.push(pick)
  )

  const displayPicks = [
    ...picksFromFollowingMember,
    ...picksFromStranger,
  ].slice(0, 4)

  return displayPicks
}

export const displayTime = (date: string | Date) => {
  if (!date) return
  const targetDate = new Date(date)
  const year = targetDate.getFullYear()
  const month = String(targetDate.getMonth() + 1).padStart(2, '0')
  const day = String(targetDate.getDate()).padStart(2, '0')
  const hour = String(targetDate.getHours()).padStart(2, '0')
  const second = String(targetDate.getMinutes()).padStart(2, '0')

  return `${year}/${month}/${day} ${hour}:${second}`
}

export const clientSideDisplayDateWithWeekday = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('Utils.displayDateWithWeekday')
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

  const currentTime = `${month}${t('month')}${date}${t('date')}(${dayString})`

  return currentTime
}

export const displayDateWithWeekday = async () => {
  const t = await getTranslations('Utils.displayDateWithWeekday')
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

  const currentTime = `${month}${t('month')}${date}${t('date')}(${dayString})`

  return currentTime
}

export const formatAudioTime = (seconds: number): string => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const secs = String(Math.floor(seconds % 60)).padStart(2, '0')

  return `${hours}:${minutes}:${secs}`
}
