import Image from 'next/image'
import Link from 'next/link'

import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryMeta from '@/components/story-card/story-meta'
import type { MostSponsorPublisher } from '@/utils/data-schema'

type Story = MostSponsorPublisher['stories'][number]

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
              alt={story.title}
              fill
            />
          </div>
        )}
        <div className="subtitle-2 hover-or-active:underline">
          {story.title}
        </div>
      </Link>
      <div className="caption-1 mt-1">
        <StoryMeta
          commentCount={story.commentCount}
          publishDate={story.published_date}
          paywall={story.paywall}
          fullScreenAd={story.full_screen_ad}
        />
      </div>
    </article>
  )
}

export default function PublisherCard({
  publisherAndStories,
}: {
  publisherAndStories: MostSponsorPublisher
}) {
  return (
    <section className="rounded-lg bg-primary-100 px-5 py-2 lg:py-3 xl:px-8">
      <div className="flex h-[68px] items-center justify-between gap-1">
        <div className="flex gap-3">
          <div className="relative size-11 overflow-hidden rounded-lg">
            <Image
              src={
                publisherAndStories.publisher.logo ||
                '/images/default-publisher-logo.png'
              }
              fill
              alt={publisherAndStories.publisher.title}
            />
          </div>
          <div>
            <Link
              href={`/profile/publisher/${publisherAndStories.publisher.customId}`}
            >
              <div className="subtitle-2 text-primary-700 hover-or-active:underline">
                {publisherAndStories.publisher.title}
              </div>
            </Link>
            <div className="footnote line-clamp-1 text-primary-500">
              已獲得
              <span className="text-custom-blue">
                {` ${publisherAndStories.publisher.sponsorCount} `}
              </span>
              次贊助
            </div>
          </div>
        </div>
        <PublisherDonateButton publisherId={publisherAndStories.publisher.id} />
      </div>
      {publisherAndStories.stories.map((story, i) => (
        <PublisherStory key={story.id} story={story} showImage={i === 0} />
      ))}
    </section>
  )
}
