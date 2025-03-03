'use client'

import { useEffect, useMemo } from 'react'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { HOUR } from '@/constants/time-unit'
import { useUser } from '@/context/user'

import ReportGroup from './report-group'
import type { Report } from './report-row'

export default function Reports({
  reports,
  publisherId,
}: {
  reports: Report[]
  publisherId: string
}) {
  const {
    user: { accessToken },
  } = useUser()

  const { yearlyGroupedReports, years } = useMemo(() => {
    const yearlyGroupedReports = reports.reduce(
      (acc: { [key: string]: Report[] }, report) => {
        const reportStartDate = new Date(report.start_date)
        const year = reportStartDate.getFullYear()
        const month = reportStartDate.getMonth()
        if (!acc[year]) acc[year] = []
        // Find the index where the statement should be inserted to maintain order by month
        const insertIndex = acc[year].findIndex(
          (existingItem) => new Date(existingItem.start_date).getMonth() > month
        )

        if (insertIndex === -1) {
          // If the index is -1, it means the statement should be inserted at the end
          acc[year].push(report)
        } else {
          // Insert at the calculated index to keep the array sorted by month
          acc[year].splice(insertIndex, 0, report)
        }
        return acc
      },
      {}
    )
    const years = Object.keys(yearlyGroupedReports).sort(
      (a, b) => Number(b) - Number(a)
    )
    return { yearlyGroupedReports, years }
  }, [reports])

  useEffect(() => {
    const fetchSignedCookie = async () => {
      // signed cookie set by response with set-cookie
      await fetch(RESTFUL_ENDPOINTS.publisherSignedCookie(publisherId), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      })
    }

    fetchSignedCookie()
    const timer = setInterval(() => {
      fetchSignedCookie()
    }, 1 * HOUR)

    return () => clearInterval(timer)
  }, [accessToken, publisherId])

  if (!reports.length)
    return (
      <div className="button-large flex h-[600px] items-center justify-center rounded-xl bg-white text-primary-400 shadow-card">
        目前沒有紀錄
      </div>
    )

  return (
    <div>
      <div className="flex flex-col gap-5">
        {years.map((year, i) => {
          const yearReports = yearlyGroupedReports[year]
          return (
            <ReportGroup
              key={year}
              year={year}
              reports={yearReports}
              initialIsExtend={i === 0}
            />
          )
        })}
      </div>
    </div>
  )
}
