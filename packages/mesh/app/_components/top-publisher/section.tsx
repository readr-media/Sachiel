import { fetchMostSponsoredPublisher } from '@/app/actions/get-homepage'
import AdManager from '@/components/ad/ad-manager-ad'

import TopPublisherCard from './card'

type Props = {
  version: 'A' | 'B'
}

export default async function TopPublisherSection({ version }: Props) {
  const data = await fetchMostSponsoredPublisher()
  if (!data) return null

  const shouldShowGAMAds = version === 'B'

  return (
    <section className="px-5 pb-10 pt-8 sm:pb-[22px] md:px-[70px] lg:px-10 lg:pb-15 lg:pt-10 xxl:pb-[43px]">
      <h2 className="list-title lg:title-1 mb-3 text-primary-700 lg:mb-4">
        獲得最多次贊助
      </h2>
      <div
        className="lg:grid-row-3 flex flex-col gap-y-5 lg:grid
      lg:auto-rows-min lg:grid-cols-2 lg:gap-5"
      >
        {data.map((publisher, index) => (
          <>
            {index === 2 && shouldShowGAMAds && (
              <AdManager pageKey="homepage" adKey="A4" className="col-span-2" />
            )}
            <TopPublisherCard key={publisher.id} publisher={publisher} />
          </>
        ))}
      </div>
    </section>
  )
}
