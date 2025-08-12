'use client'

import AdManager from '@/components/ad/ad-manager-ad'
import { useABTest } from '@/context/ab-test'

export function AdAfterMainGroup() {
  const { version } = useABTest()

  if (version !== 'B') return null

  return <AdManager pageKey="homepage" adKey="A1" className="mb-10" />
}
