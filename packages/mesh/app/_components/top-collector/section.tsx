import { fetchTopCollector } from '@/app/actions/get-homepage'

import TopCollectorCard from './card'
import Title from './title'

export default async function TopCollectorSection() {
  const data = await fetchTopCollector()
  if (!data) return null

  return (
    <section className="px-5 pt-8 md:px-[70px] lg:bg-multi-layer-light lg:px-10 lg:pb-10 xl:pb-8 xl:pt-[34px] xxl:pb-10 xxl:pt-8">
      <Title />
      <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-x-5">
        {data.map((person, index) => (
          <TopCollectorCard person={person} rank={index + 1} key={person.id} />
        ))}
      </div>
    </section>
  )
}
