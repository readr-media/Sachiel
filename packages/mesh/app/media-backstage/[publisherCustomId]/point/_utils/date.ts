import type { PointRecordDate } from '@/types/media-backstage'

export function getCurrentDate() {
  const currentDate = new Date() // Get the current date
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1 // Months are 0-indexed, so add 1
  return { year, month }
}

export function getDatesToPick() {
  const maxMonthCount = 12
  const minDate: PointRecordDate = {
    year: 2024,
    month: 5,
  }
  const result: PointRecordDate[] = []
  const currentDate = new Date()

  for (let i = 0; i < maxMonthCount; i++) {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1 // Months are 0-indexed, so add 1
    result.push({ year, month })

    if (year === minDate.year && month === minDate.month) {
      break
    }
    // Move to the previous month
    currentDate.setMonth(currentDate.getMonth() - 1)
  }

  return result
}

export function getFirstAndLastSeconds({
  year,
  month,
}: {
  year: number
  month: number
}) {
  // Get the first second of the month
  const firstSecond = new Date(year, month - 1, 1, 0, 0, 0)

  // Get the last second of the month
  const lastSecond = new Date(year, month, 0, 23, 59, 59)

  return {
    firstSecond: firstSecond.toISOString(),
    lastSecond: lastSecond.toISOString(),
  }
}
