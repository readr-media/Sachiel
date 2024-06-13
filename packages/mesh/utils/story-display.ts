import { DAY, HOUR, MINUTE } from '@/constants/time-unit'
import { UserActionStoryFragment } from '@/graphql/__generated__/graphql'

export const displayTimeFromNow = (date: string) => {
  const differenceInMilliseconds = Date.now() - new Date(date).getTime()
  const differenceInMinutes = differenceInMilliseconds / MINUTE
  const differenceInHours = differenceInMilliseconds / HOUR
  const differenceInDays = differenceInMilliseconds / DAY

  const fullDisplayTime = (date: string) => {
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
    return Math.floor(differenceInMinutes) + ' 分鐘前'
  } else if (differenceInMilliseconds < 24 * HOUR) {
    return Math.floor(differenceInHours) + ' 小時前'
  } else if (differenceInMilliseconds < 7 * DAY) {
    return Math.floor(differenceInDays) + ' 天前'
  } else {
    return fullDisplayTime(date)
  }
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
