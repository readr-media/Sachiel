'use client'

import NextLink from 'next/link'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryMeta from '@/components/story-card/story-meta'
import { ImageCategory } from '@/constants/fallback-src'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import usePageName from '@/hooks/use-page-name'
import useUserPayload from '@/hooks/use-user-payload'
import type { SponsoredStoryByCategory } from '@/types/homepage'
import { logClickEvent } from '@/utils/event-logs'

const StoryCard = ({
  showImage,
  story,
  publisherInfo,
}: {
  showImage: boolean
  story: SponsoredStoryByCategory['stories'][number]
  publisherInfo: { publisherId: string; publisherName: string }
}) => {
  const userPayload = useUserPayload()
  const pageName = usePageName()
  const { publisherId, publisherName } = publisherInfo

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
              logClickEvent(userPayload, 'click-story', {
                target: 'story',
                targetId: story.id,
                targetTitle: story.title,
                source: pageName,
                complementary: {
                  publisherTarget: 'publisher',
                  targetId: publisherId,
                  targetName: publisherName,
                },
              })
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
  const { t } = useCustomTranslation()

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
              {t('Pages.Subpage.PublisherCard-sponsor-count-1', '已獲得')}
              <span className="text-custom-blue">
                {data.publisher.sponsoredCount}
                {t('Pages.Subpage.PublisherCard-sponsor-count-2', '次贊助')}
              </span>
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
          publisherInfo={{
            publisherName: data.publisher.title,
            publisherId: data.publisher.id,
          }}
        />
      ))}
    </div>
  )
}
