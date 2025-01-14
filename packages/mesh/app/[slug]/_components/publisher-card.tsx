'use client'

import NextLink from 'next/link'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryMeta from '@/components/story-card/story-meta'
import { ImageCategory } from '@/constants/fallback-src'
import useUserPayload from '@/hooks/use-user-payload'
import type { SponsoredStoryByCategory } from '@/types/homepage'
import { logStoryClick } from '@/utils/event-logs'

const StoryCard = ({
  showImage,
  story,
  publisherName,
}: {
  showImage: boolean
  story: SponsoredStoryByCategory['stories'][number]
  publisherName: string
}) => {
  const userPayload = useUserPayload()

  return (
    <article className="border-b-[0.5px] border-primary-200 py-3 last:border-b-0 ">
      <NextLink
        href={`/story/${story.id}`}
        className="GTM-categorypage_pick_media_article"
      >
        {showImage && story.og_image && (
          <div className="relative mb-3 aspect-[2/1] overflow-hidden rounded">
            <ImageWithFallback
              src={story.og_image}
              alt={story.title}
              fill
              className="object-cover"
              fallbackCategory={ImageCategory.STORY}
            />
          </div>
        )}

        <div>
          <h3
            className="subtitle-2 mb-1 text-primary-700 hover-or-active:underline"
            onClick={() =>
              logStoryClick(userPayload, story.id, story.title, publisherName)
            }
          >
            {story.title}
          </h3>
          <div className="caption-1">
            <StoryMeta
              storyId={story.id}
              commentCount={story.commentCount}
              publishDate={story.published_date}
              //TODO: add paywall
              paywall={false}
              fullScreenAd={story.full_screen_ad}
            />
          </div>
        </div>
      </NextLink>
    </article>
  )
}

type Props = {
  data: SponsoredStoryByCategory
}

export default function PublisherCard({ data }: Props) {
  return (
    <div className="flex w-full flex-col rounded-lg border-[0.5px] border-primary-200 bg-primary-100 px-5 pb-2 pt-5 lg:self-start lg:pb-3 lg:pt-6 xl:px-8">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-x-3">
          <div className="relative size-11 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={data.publisher.logo}
              alt={data.publisher.title}
              fill
              className="object-cover"
              fallbackCategory={ImageCategory.PUBLISHER}
            />
          </div>
          <div>
            <p className="subtitle-2 text-primary-700 hover-or-active:underline">
              <NextLink
                href={`profile/publisher/${data.publisher.customId}`}
                className="GTM-categorypage_pick_media_file"
              >
                {data.publisher.title}
              </NextLink>
            </p>
            <p className="footnote text-primary-500">
              已獲得
              <span className="text-custom-blue">
                {data.publisher.sponsoredCount}次
              </span>
              贊助
            </p>
          </div>
        </div>
        <PublisherDonateButton
          publisherId={data.publisher.id}
          gtmClassName="GTM-categorypage_pick_sponsor"
        />
      </div>
      {data.stories.map((story, index) => (
        <StoryCard
          showImage={index === 0}
          story={story}
          key={story.id}
          publisherName={data.publisher.title}
        />
      ))}
    </div>
  )
}
