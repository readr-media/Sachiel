import { useRef } from 'react'
import * as XLSX from 'xlsx'

import Icon from '@/components/icon'
import InteractiveIcon from '@/components/interactive-icon'
import type { GetPublisherReportsQuery } from '@/graphql/__generated__/graphql'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export type Report = NonNullable<
  NonNullable<
    NonNullable<GetPublisherReportsQuery['publishers']>[number]['statements']
  >[number]
>

export default function ReportRow({ report }: { report: Report }) {
  const { t } = useCustomTranslation()
  const isLoadingRef = useRef(false)
  const fileBlobRef = useRef<Blob | null>(null)
  const { title, start_date, end_date, url } = report
  const { startMonth, endMonth } = formatMonthRange(start_date, end_date)

  const fetchReportFile = async (fileUrl: string) => {
    if (!fileBlobRef.current) {
      isLoadingRef.current = true
      const response = await fetch(fileUrl, {
        credentials: 'include',
      })
      if (!response.ok) throw new Error('Failed to download report file')
      fileBlobRef.current = await response.blob()
    }
    return fileBlobRef.current
  }

  const handleDownload = async (fileUrl: string | null | undefined) => {
    if (!fileUrl || isLoadingRef.current) return
    try {
      const blob = await fetchReportFile(fileUrl)
      const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1)
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Failed to download report:', error)
    } finally {
      isLoadingRef.current = false
    }
  }

  const handlePrint = async (fileUrl: string | null | undefined) => {
    if (!fileUrl || isLoadingRef.current) return

    try {
      const blob = await fetchReportFile(fileUrl)
      const data = await blob.arrayBuffer()
      const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const htmlContent = XLSX.utils.sheet_to_html(worksheet)

      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${fileName}</title>
              <style>
                @media print {
                  body * { visibility: hidden; }
                  #excelContent, #excelContent * { visibility: visible; }
                  #excelContent { position: absolute; left: 0; top: 0; width: 100%; }
                  table { width: 100%; border-collapse: collapse; }
                  th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                }
              </style>
            </head>
            <body>
              <div id="excelContent">${htmlContent}</div>
              <script>
                window.onload = () => {
                  window.focus();
                  window.print();
                  window.onafterprint = () => window.close();
                }
              </script>
            </body>
          </html>
        `)
        printWindow.document.close()
      } else {
        throw new Error('open print window failed')
      }
    } catch (error) {
      console.error('Failed to print:', error)
    } finally {
      isLoadingRef.current = false
    }
  }

  return (
    <li className="flex h-12 justify-between gap-2 border-b p-2 last-of-type:border-none">
      <div className="flex w-10 items-center justify-center">
        <Icon iconName="icon-file" size="l" />
      </div>
      <div className="flex flex-1 items-center">
        <span
          className="subtitle-1 cursor-pointer text-primary-700 active:text-primary-500"
          onClick={handleDownload.bind(null, url)}
        >
          {t(
            'Pages.Media-Backstage.ReportRow-month-range',
            '{{startMonth}}-{{endMonth}} 月',
            {
              startMonth,
              endMonth,
            }
          )}{' '}
          : {title}
        </span>
      </div>
      <div className="flex gap-4">
        <button
          className="subtitle-1 group flex items-center gap-1 rounded-md px-2 py-1 text-primary-600 hover:bg-primary-100 hover:text-primary-700"
          onClick={handleDownload.bind(null, url)}
        >
          <InteractiveIcon
            icon={{ default: 'icon-download', hover: 'icon-download-hover' }}
            size="l"
          />
          {t('Pages.Media-Backstage.ReportRow-download', '下載')}
        </button>
        <button
          className="subtitle-1 group flex items-center gap-1 rounded-md px-2 py-1 text-primary-600 hover:bg-primary-100 hover:text-primary-700"
          onClick={handlePrint.bind(null, url)}
        >
          <InteractiveIcon
            icon={{ default: 'icon-print', hover: 'icon-print-hover' }}
            size="l"
          />
          {t('Pages.Media-Backstage.ReportRow-print', '列印')}
        </button>
      </div>
    </li>
  )
}

function formatMonthRange(start: string, end: string) {
  const startMonth = new Date(start).getMonth() + 1
  const endMonth = new Date(end).getMonth() + 1
  return { startMonth, endMonth }
}
