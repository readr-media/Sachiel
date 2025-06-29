'use client'

import { useEffect, useState } from 'react'

import { fetchTopCollector } from '@/app/actions/get-homepage'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import type { Collector } from '@/types/homepage'

import TopCollectorCard from './card'

export default function TopCollectorSection() {
  const { t } = useCustomTranslation()
  const [data, setData] = useState<Collector[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTopCollector()
      setData(result)
    }
    fetchData()
  }, [])

  if (!data) return null

  return (
    <section className="px-5 pt-8 md:px-[70px] lg:bg-multi-layer-light lg:px-10 lg:pb-10 xl:pb-8 xl:pt-[34px] xxl:pb-10 xxl:pt-8">
      <h2 className="list-title lg:title-1 mb-3 text-primary-700 lg:mb-4 lg:text-primary-500 xl:mb-[14px] xxl:mb-4">
        {t('Pages.Home.TopCollectorSection-title', '本週精選最多文章')}
      </h2>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-x-5">
        {data.map((person, index) => (
          <TopCollectorCard person={person} rank={index + 1} key={person.id} />
        ))}
      </div>
    </section>
  )
}
