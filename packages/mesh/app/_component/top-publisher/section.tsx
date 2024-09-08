import { fetchMostSponsoredPublisher } from '@/app/actions/get-homepage'

import TopPublisherCard from './card'

export default async function TopPublisherSection() {
  const data = await fetchMostSponsoredPublisher()
  if (!data) return null

  return (
    <section className="px-5 pb-10 pt-4 sm:pb-[22px] md:px-[70px] lg:px-10 lg:pb-15 lg:pt-10 xl:pt-4">
      <h2 className="list-title lg:title-1 mb-3 text-primary-700 lg:mb-4">
        獲得最多次贊助
      </h2>
      <div className="flex flex-col gap-y-5 lg:grid lg:auto-rows-min lg:grid-cols-2 lg:gap-5">
        {data.map((publisher) => (
          <TopPublisherCard key={publisher.id} publisher={publisher} />
        ))}
      </div>
    </section>
  )
}
