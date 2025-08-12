'use client'

import AdManager from '@/components/ad/ad-manager-ad'

export default function StoryEndAd() {
  return (
    <div className="flex">
      <AdManager pageKey="story" adKey="E1" />
      <AdManager pageKey="story" adKey="E2" />
    </div>
  )
}
