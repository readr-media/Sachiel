'use client'

import '@/styles/policy.css'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useT } from '@/app/i18n/client'
import { processPolicy } from '@/utils/process-policy'

import { fetchPrivacyPolicy } from '../../actions/policy'

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
        const data = await fetchPrivacyPolicy(lng)
        if (data) {
          const processed = await processPolicy(data)
          setProcessedHtml(processed)
        } else {
          setError('Failed to load privacy policy')
        }
      } catch (error) {
        console.error('Failed to fetch privacy policy:', error)
        setError('Failed to load privacy policy')
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
          <p>{t('not-found', '找不到隱私政策內容')}</p>
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
