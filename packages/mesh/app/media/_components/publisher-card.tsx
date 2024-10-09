import Image from 'next/image'
import Link from 'next/link'

import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryMeta from '@/components/story-card/story-meta'

import { type DisplayPublisher, type Story } from './media-stories'

const PublisherStory = ({
  story,
  showImage,
}: {
  story: Story
  showImage: boolean
}) => {
  return (
    <article className="border-b py-3 last-of-type:border-b-0">
      <Link href={`/story/${story.id}`}>
        {showImage && story.og_image && (
          <div className="relative mb-3 aspect-[2/1]">
            <Image
              className="object-cover"
              src={story.og_image}
              alt={story.title ?? ''}
              fill
            />
          </div>
        )}
        <div className="subtitle-2">{story.title ?? ''}</div>
      </Link>
      <div className="caption-1 mt-1">
        <StoryMeta
          commentCount={story.commentCount ?? 0}
          publishDate={story.published_date}
          paywall={story.paywall ?? false}
          fullScreenAd={story.full_screen_ad ?? ''}
        />
      </div>
    </article>
  )
}

export default function PublisherCard({
  publisher,
}: {
  publisher: DisplayPublisher
}) {
  return (
    <section className="rounded-lg bg-primary-100 px-5 py-2 lg:py-3 xl:px-8">
      <div className="flex h-[68px] items-center justify-between gap-1">
        <div className="flex gap-3">
          {/* TODO: render logo of publisher */}
          <div>logo</div>
          <div>
            <div className="subtitle-2 text-primary-700">
              {publisher.title ?? ''}
            </div>
            <div className="footnote line-clamp-1 text-primary-500">
              {/* TODO: use real sponsor count */}
              已獲得
              <span className="text-custom-blue">
                {` ${publisher.sponsorCount ?? 0} `}
              </span>
              次贊助
            </div>
          </div>
        </div>
        <PublisherDonateButton publisherId={publisher.id} />
      </div>
      {publisher.stories.map((story, i) => (
        <PublisherStory key={story.id} story={story} showImage={i === 0} />
      ))}
    </section>
  )
}
