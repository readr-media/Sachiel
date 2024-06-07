import Image from 'next/image'

import { type Publisher } from '@/graphql/query/publishers'
import { type Story } from '@/graphql/query/stories'

export type DisplayPublisher = Publisher & { stories: Story[] }

const PublisherStory = ({
  story,
  showImage,
}: {
  story: Story
  showImage: boolean
}) => {
  return (
    <article className="border-b py-3 last-of-type:border-b-0">
      {showImage && story.og_image && (
        <div className="relative aspect-[2/1]">
          <Image
            className="mb-3 object-cover"
            src={story.og_image}
            alt={story.title}
            fill
          />
        </div>
      )}
      <div className="subtitle-2">{story.title}</div>
      <div className="caption-1 mt-1">comment 數量。發布時間</div>
    </article>
  )
}

export default function Publisher({
  publisher,
}: {
  publisher: DisplayPublisher
}) {
  return (
    <section className="rounded-lg bg-primary-100 px-5 py-2 lg:py-3 xl:px-8">
      <div className="flex h-[68px] items-center justify-between gap-1">
        <div className="flex gap-3">
          <div>logo</div>
          <div>
            <div className="subtitle-2 text-primary-700">source title</div>
            <div className="caption-1 line-clamp-1 text-primary-500">
              本月獲得<span className="text-custom-blue">26</span>次贊助
            </div>
          </div>
        </div>
        <button>贊助</button>
      </div>
      {publisher.stories.map((story, i) => (
        <PublisherStory key={story.id} story={story} showImage={i === 0} />
      ))}
    </section>
  )
}
