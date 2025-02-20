import { useState } from 'react'

import Icon from '@/components/icon'

import type { Report } from './report-row'
import ReportRow from './report-row'

export default function ReportGroup({
  year,
  reports,
  signedCookie,
  initialIsFolded,
}: {
  year: string
  reports: Report[]
  signedCookie: string
  initialIsFolded: boolean
}) {
  const [isFolded, setIsFolded] = useState(initialIsFolded)
  return (
    <div key={year} className="rounded-xl bg-white px-5 py-2 shadow-card">
      <div
        className="flex cursor-pointer justify-between"
        onClick={() => setIsFolded(!isFolded)}
      >
        <span className="list-title font-medium text-primary-700">
          {year} 收益報表
        </span>
        <span className="">
          {isFolded ? (
            <Icon iconName="icon-up-arrow" size="xl" />
          ) : (
            <Icon iconName="icon-down-arrow" size="xl" />
          )}
        </span>
      </div>
      {isFolded && (
        <ul>
          {reports.map((report) => (
            <ReportRow
              key={report.id}
              report={report}
              signedCookie={signedCookie}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
