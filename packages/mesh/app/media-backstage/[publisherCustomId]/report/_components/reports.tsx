'use client'

import { useEffect, useMemo } from 'react'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { HOUR } from '@/constants/time-unit'
import { useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

import ReportGroup from './report-group'
import type { Report } from './report-row'

export default function Reports({
  reports,
  publisherId,
}: {
  reports: Report[]
  publisherId: string
}) {
  const { t } = useCustomTranslation()
  const {
    user: { accessToken },
  } = useUser()

  const { yearlyGroupedReports, years } = useMemo(() => {
    const yearlyGroupedReports = reports.reduce(
      (acc: { [key: string]: Report[] }, report) => {
        const year = new Date(report.start_date).getFullYear()

        if (!acc[year]) acc[year] = []
        acc[year].push(report)

        return acc
      },
      {}
    )

    Object.keys(yearlyGroupedReports).forEach((year) => {
      yearlyGroupedReports[year].sort((a, b) => {
        const monthA = new Date(a.start_date).getMonth()
        const monthB = new Date(b.start_date).getMonth()

        if (monthA !== monthB) {
          return monthB - monthA
        }

        return Number(b.id) - Number(a.id)
      })
    })

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
        {t('Pages.Media-Backstage.Reports-no-report', '目前沒有紀錄')}
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
