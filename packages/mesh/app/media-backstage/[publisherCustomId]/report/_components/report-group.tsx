import { useState } from 'react'

import Icon from '@/components/icon'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

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
  const { t } = useCustomTranslation()
  const [isExtend, setIsExtend] = useState(initialIsExtend)

  return (
    <div key={year} className="rounded-xl bg-white px-5 py-2 shadow-card">
      <div
        className="flex cursor-pointer justify-between"
        onClick={() => setIsExtend(!isExtend)}
      >
        <span className="list-title font-medium text-primary-700">
          {t(
            'Pages.Media-Backstage.ReportGroup-year-report',
            '{{year}} 收益報表',
            { year }
          )}
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
