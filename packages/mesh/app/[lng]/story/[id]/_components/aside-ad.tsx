'use client'
import AdManager from '@/components/ad/ad-manager-ad'

export default function AsideAd() {
  return (
    <div className="lg:absolute lg:left-0 lg:top-[calc(theme(height.header.sm)+36px)] lg:flex lg:flex-col xl:left-[calc((100vw-1440px)/2+((1440px-theme(width.articleMain))/2-theme(width.articleAside.xl))/2)]">
      <AdManager pageKey="story" adKey="E0" />
    </div>
  )
}
