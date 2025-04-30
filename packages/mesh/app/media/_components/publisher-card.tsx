import Link from 'next/link'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryMeta from '@/components/story-card/story-meta'
import { ImageCategory } from '@/constants/fallback-src'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import usePageName from '@/hooks/use-page-name'
import useUserPayload from '@/hooks/use-user-payload'
import type { MostSponsorPublisher } from '@/utils/data-schema'
import { logClickEvent } from '@/utils/event-logs'

type Story = MostSponsorPublisher['stories'][number]

const PublisherStory = ({
  story,
  showImage,
  publisherInfo,
}: {
  story: Story
  showImage: boolean
  publisherInfo: { publisherName: string; publisherId: string }
}) => {
  const userPayload = useUserPayload()
  const pageName = usePageName()
  const { publisherId, publisherName } = publisherInfo
  const {
    id,
    title,
    og_image,
    published_date,
    commentCount,
    isMember,
    full_screen_ad,
  } = story

  return (
    <article className="border-b py-3 last-of-type:border-b-0">
      <Link
        href={`/story/${id}`}
        className="GTM-media_click_media_article"
        onClick={() =>
          logClickEvent(userPayload, 'click-story', {
            target: 'story',
            targetId: id,
            targetTitle: title,
            source: pageName,
            complementary: {
              publisherTarget: 'publisher',
              targetId: publisherId,
              targetName: publisherName,
            },
          })
        }
      >
        {showImage && og_image && (
          <div className="relative mb-3 aspect-[2/1]">
            <ImageWithFallback
              className="object-cover"
              src={og_image}
              alt={title}
              fill
              fallbackCategory={ImageCategory.STORY}
            />
          </div>
        )}
        <div className="subtitle-2 hover-or-active:underline">{title}</div>
      </Link>
      <div className="caption-1 mt-1">
        <StoryMeta
          storyId={id}
          commentCount={commentCount}
          publishDate={published_date}
          paywall={isMember}
          fullScreenAd={full_screen_ad}
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
  const { publisher, stories } = publisherAndStories
  const { id: publisherId, logo, title, customId, sponsoredCount } = publisher
  const { t } = useCustomTranslation()

  return (
    <section className="w-full rounded-lg bg-primary-100 px-5 py-2 lg:py-3 xl:px-8">
      <div className="flex h-[68px] items-center justify-between gap-1">
        <div className="flex gap-3">
          <div className="relative size-11 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={logo}
              fill
              alt={title}
              fallbackCategory={ImageCategory.PUBLISHER}
            />
          </div>
          <div>
            <Link
              href={`/profile/publisher/${customId}`}
              className="GTM-media_click_media_file"
            >
              <div className="subtitle-2 text-primary-700 hover-or-active:underline">
                {title}
              </div>
            </Link>
            <div className="footnote line-clamp-1 text-primary-500">
              {t('Pages.Media.PublisherCard-sponsor-count-1', '已獲得')}
              <span className="text-custom-blue">{` ${sponsoredCount} `}</span>
              {t('Pages.Media.PublisherCard-sponsor-count-2', '次贊助')}
            </div>
          </div>
        </div>
        <div className="flex shrink-0">
          <PublisherDonateButton
            publisherId={publisherId}
            gtmClassName="GTM-media_click_media_sponsor"
          />
        </div>
      </div>
      {stories.map((story, i) => (
        <PublisherStory
          key={story.id}
          story={story}
          showImage={i === 0}
          publisherInfo={{
            publisherName: title,
            publisherId,
          }}
        />
      ))}
    </section>
  )
}
