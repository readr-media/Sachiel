'use client'

import AdManager from '@/components/ad/ad-manager-ad'
import AdSense from '@/components/ad/adsense-ad'
import { useABTest } from '@/context/ab-test'

export function AdAfterNoGroup() {
  const { version } = useABTest()

  if (!version) return null

  return version === 'A' ? (
    <AdSense pageKey="homepage" adKey="A1" className="my-5 lg:mb-0" />
  ) : (
    <AdManager pageKey="homepage" adKey="A2" className="my-5" />
  )
}
