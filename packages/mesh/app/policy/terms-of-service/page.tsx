'use client'

import '@/styles/policy.css'

import { useEffect, useState } from 'react'

import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { processPolicy } from '@/utils/process-policy'

import { fetchTermsOfService } from '../../actions/policy'

export default function Page() {
  const { t, i18n } = useCustomTranslation()
  const [processedHtml, setProcessedHtml] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchTermsOfService(i18n.language)
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
  }, [i18n.language])

  if (isLoading) {
    return (
      <section className="px-5 pb-5 pt-6 sm:p-0">
        <div className="policy-content">
          <p>{t('Pages.Policy.loading', '載入中...')}</p>
        </div>
      </section>
    )
  }

  if (error || !processedHtml) {
    return (
      <section className="px-5 pb-5 pt-6 sm:p-0">
        <div className="policy-content">
          <p>{t('Pages.Policy.not-found', '找不到服務條款內容')}</p>
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
