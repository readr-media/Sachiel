import { fetchMostSponsoredPublisher } from '@/app/actions/get-homepage'

import { Ad } from './ad'
import TopPublisherCard from './card'
import Title from './title'

export default async function TopPublisherSection() {
  const data = await fetchMostSponsoredPublisher()
  if (!data) return null

  return (
    <section className="px-5 pb-10 pt-8 sm:pb-[22px] md:px-[70px] lg:px-10 lg:pb-15 lg:pt-10 xxl:pb-[43px]">
      <Title />
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
