'use client'

import '@/styles/policy.css'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useT } from '@/app/i18n/client'
import { processPolicy } from '@/utils/process-policy'

import { fetchTermsOfService } from '../../actions/policy'

export default function Page() {
  const { lng } = useParams() as { lng: string }
  const { t } = useT('pages/policy')
  const [processedHtml, setProcessedHtml] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchTermsOfService(lng)
        if (data) {
          const processed = await processPolicy(data)
          setProcessedHtml(processed)
        } else {
          setError('Failed to load terms of service')
        }
      } catch (error) {
        console.error('Failed to fetch terms of service:', error)
        setError('Failed to load terms of service')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [lng])

  if (isLoading) {
    return (
      <section className="px-5 pb-5 pt-6 sm:p-0">
        <div className="policy-content">
          <p>{t('loading', '載入中...')}</p>
        </div>
      </section>
    )
  }

  if (error || !processedHtml) {
    return (
      <section className="px-5 pb-5 pt-6 sm:p-0">
        <div className="policy-content">
          <p>{t('terms-not-found', '找不到服務條款內容')}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="px-5 pb-5 pt-6 sm:p-0">
      <div
        className="policy-content"
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </section>
  )
}
