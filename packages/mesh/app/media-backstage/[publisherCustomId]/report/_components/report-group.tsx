import { useTranslations } from 'next-intl'
import { useState } from 'react'

import Icon from '@/components/icon'

import type { Report } from './report-row'
import ReportRow from './report-row'

export default function ReportGroup({
  year,
  reports,
  initialIsExtend,
}: {
  year: string
  reports: Report[]
  initialIsExtend: boolean
}) {
  const t = useTranslations('Pages.Media-Backstage')
  const [isExtend, setIsExtend] = useState(initialIsExtend)
  return (
    <div key={year} className="rounded-xl bg-white px-5 py-2 shadow-card">
      <div
        className="flex cursor-pointer justify-between"
        onClick={() => setIsExtend(!isExtend)}
      >
        <span className="list-title font-medium text-primary-700">
          {t('ReportGroup-year-report', { year })}
        </span>
        <span className="">
          {isExtend ? (
            <Icon iconName="icon-up-arrow" size="xl" />
          ) : (
            <Icon iconName="icon-down-arrow" size="xl" />
          )}
        </span>
      </div>
      {isExtend && (
        <ul>
          {reports.map((report) => (
            <ReportRow key={report.id} report={report} />
          ))}
        </ul>
      )}
    </div>
  )
}
