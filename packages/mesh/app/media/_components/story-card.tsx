import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import { imageSizes } from '@/constants/media'
import { getDisplayPicks } from '@/utils/story-display'

import { type Story } from '../page'

export default function StoryCard({
  story,
  isMobile,
  className = '',
  followingMemberIds,
}: {
  story: Story
  isMobile: boolean
  className?: string
  followingMemberIds: Set<string>
}) {
  const imageSize = isMobile ? imageSizes.mobile : imageSizes.nonMobile
  const titleClass = isMobile ? 'subtitle-1' : 'title-2'
  const displayPicks = getDisplayPicks(story.picks, followingMemberIds)

  const metaJsx = (
    <div className="caption-1 mt-2 sm:mt-1">
      <StoryMeta
        commentCount={story.commentCount ?? 0}
        publishDate={story.published_date}
        paywall={story.paywall ?? false}
        fullScreenAd={story.full_screen_ad ?? ''}
      />
    </div>
  )

  return (
    <article
      className={twMerge(
        'flex flex-col justify-between border-b pb-4 pt-5',
        className
      )}
    >
      <div>
        <div className="flex h-6 flex-row items-center justify-between">
          <h4 className="caption-1 line-clamp-1 text-primary-500">
            {story.source?.title}
          </h4>
          <button>...</button>
        </div>
        <div className="mt-1 flex flex-row justify-between gap-3 sm:gap-10">
          <div>
            <h2 className={`${titleClass} text-primary-700`}>
              {story.title ?? ''}
            </h2>
            {!isMobile && metaJsx}
          </div>
          {story.og_image && (
            <Image
              style={{
                width: imageSize.width,
                height: imageSize.height,
              }}
              className="flex-shrink-0 rounded-[4px] object-cover"
              src={story.og_image}
              alt={story.title ?? ''}
              width={imageSize.width}
              height={imageSize.height}
            />
          )}
        </div>
        {isMobile && metaJsx}
      </div>
      <div className="mt-4 flex h-8 flex-row justify-between">
        <StoryPickInfo
          displayPicks={displayPicks}
          pickCount={story.picksCount ?? 0}
        />
        {/* TODO: add user pick info to check if already picked */}
        <StoryPickButton isStoryPicked={false} storyId={story.id} />
      </div>
    </article>
  )
}
