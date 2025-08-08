'use client'

import AdSense from '@/components/ad/adsense-ad'
import { useABTest } from '@/context/ab-test'

export function ReadrStoryAd() {
  const { version } = useABTest()

  if (version !== 'A') return null

  return <AdSense pageKey="homepage" adKey="A3" className="mt-5 lg:mt-10" />
}
