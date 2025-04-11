'use client'

import AdManager from '@/components/ad/ad-manager-ad'
import AdSense from '@/components/ad/adsense-ad'
import { useABTest } from '@/context/ab-test'

export function Ad() {
  const { version } = useABTest()

  if (!version) return null

  return version === 'A' ? (
    <AdSense pageKey="homepage" adKey="A2" className="mt-10" />
  ) : (
    <AdManager pageKey="homepage" adKey="A3" className="mt-10" />
  )
}
