import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'

import { type ProfileJSONType } from '@/utils/data-schema'

import PodcastCard from './podcast-card'

const pageSize = 10
const amountOfElements = 200
const fetchMoreSubscribeStories = async () => {
  return []
}
export default function PodcastList({
  list,
  source,
}: {
  list: ProfileJSONType['podcasts']
  source: ProfileJSONType['source']
}) {
  return (
    <div className="grow bg-white md:bg-multi-layer-light">
      <InfiniteScrollList
        initialList={list}
        pageSize={pageSize}
        amountOfElements={amountOfElements}
        fetchListInPage={fetchMoreSubscribeStories}
        isAutoFetch={true}
      >
        {(renderList) => (
          <ul className="grid justify-center p-5 md:gap-5 lg:grid-cols-2 lg:p-10">
            {renderList.map((data) => (
              <li
                key={data.id}
                className="border-b bg-white pb-4 pt-5 first:pt-0 last:border-b-0 md:h-[182px] md:max-w-[600px] md:rounded-md md:py-0 md:shadow-md lg:h-[174px]"
              >
                <PodcastCard data={data} source={source} />
              </li>
            ))}
          </ul>
        )}
      </InfiniteScrollList>
    </div>
  )
}
