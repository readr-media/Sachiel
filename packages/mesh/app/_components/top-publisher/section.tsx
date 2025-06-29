'use client'

import { useEffect, useState } from 'react'

import { fetchMostSponsoredPublisher } from '@/app/actions/get-homepage'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import type { SponsoredStory } from '@/types/homepage'

import { Ad } from './ad'
import TopPublisherCard from './card'

export default function TopPublisherSection() {
  const { t } = useCustomTranslation()
  const [data, setData] = useState<SponsoredStory[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMostSponsoredPublisher()
      setData(result)
    }
    fetchData()
  }, [])

  if (!data) return null

  return (
    <section className="px-5 pb-10 pt-8 sm:pb-[22px] md:px-[70px] lg:px-10 lg:pb-15 lg:pt-10 xxl:pb-[43px]">
      <h2 className="list-title lg:title-1 mb-3 text-primary-700 lg:mb-4">
        {t('Pages.Home.TopPublisherSection-title', '獲得最多次贊助')}
      </h2>
      <div
        className="lg:grid-row-3 flex flex-col gap-y-5 lg:grid
      lg:auto-rows-min lg:grid-cols-2 lg:gap-5"
      >
        {data.map((publisher, index) => (
          <>
            {index === 2 && <Ad />}
            <TopPublisherCard key={publisher.id} publisher={publisher} />
          </>
        ))}
      </div>
    </section>
  )
}
