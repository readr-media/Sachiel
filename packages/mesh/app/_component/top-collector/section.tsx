import { fetchTopCollector } from '@/app/actions/get-homepage'

import TopCollectorCard from './card'

export default async function TopCollectorSection() {
  const data = await fetchTopCollector()
  if (!data) return null

  return (
    <section className="px-5 pb-5 pt-8 md:px-[70px] lg:bg-[#F6F6F6] lg:px-10 lg:pb-10 xl:pb-8 xl:pt-[34px] xxl:pb-10 xxl:pt-8">
      <p className="list-title lg:title-1 mb-1 text-primary-700 lg:mb-4 lg:text-primary-500 xl:mb-[14px]">
        精選最多文章
      </p>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-x-5">
        {data.map((person, index) => (
          <TopCollectorCard person={person} rank={index + 1} key={person.id} />
        ))}
      </div>
    </section>
  )
}
