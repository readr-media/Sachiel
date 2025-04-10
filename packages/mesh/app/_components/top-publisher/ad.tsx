'use client'

import AdManager from '@/components/ad/ad-manager-ad'
import { useABTest } from '@/context/ab-test'

export function Ad() {
  const { version } = useABTest()

  if (version !== 'B') return null

  return <AdManager pageKey="homepage" adKey="A4" className="col-span-2" />
}
