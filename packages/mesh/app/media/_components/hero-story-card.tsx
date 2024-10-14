import Image from 'next/image'
import Link from 'next/link'

import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { useUser } from '@/context/user'
import { getDisplayPicks } from '@/utils/story-display'

import { type Story } from './media-stories'

// only used in desktop width
export default function HeroStoryCard({ story }: { story: Story }) {
  const { user } = useUser()
  const displayPicks = getDisplayPicks(story.picks, user.followingMemberIds)

  return (
    <article className="col-span-2 border-b pb-5 pt-3">
      <div className="flex gap-10">
        {/* use padding-top to set aspect-ratio to prevent height growing when right block grows in too many lines of titles */}

        <div className="relative h-0 w-[calc((100%-40px)/2)] flex-1 pt-[calc((100%-40px)/4)]">
          <Link href={`/story/${story.id}`} className="size-full">
            <Image
              className="rounded-md object-cover"
              src={story.og_image || '/images/default-story-image.webP'}
              alt={story.title ?? ''}
              fill
            />
          </Link>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          {/* right top section */}
          <div>
            <div className="flex h-6 flex-row items-center justify-between">
              <Link href={`/profile/publisher/${story.source?.customId ?? ''}`}>
                <h4 className="body-3 h-5 text-primary-500 hover-or-active:text-primary-700 lg:h-auto">
                  {story.source?.title ?? ''}
                </h4>
              </Link>
              <StoryMoreActionButton
                storyId={story.id}
                publisherId={story.source?.id ?? ''}
                canUnFollowPublisher={true}
              />
            </div>
            <Link href={`/story/${story.id}`}>
              <div className="hero-title mt-1 text-primary-700 hover-or-active:underline">
                {story.title ?? ''}
              </div>
              <div className="body-3 mt-3 line-clamp-1 text-primary-600">
                {story.summary ?? ''}
              </div>
            </Link>
            <div className="footnote mt-3">
              <StoryMeta
                commentCount={story.commentCount ?? 0}
                publishDate={story.published_date}
                paywall={story.paywall ?? false}
                fullScreenAd={story.full_screen_ad ?? ''}
              />
            </div>
          </div>
          {/* right bottom section */}
          <div>
            <div className="mt-4 flex h-8 flex-row justify-between">
              <StoryPickInfo
                displayPicks={displayPicks}
                pickCount={story.picksCount ?? 0}
              />
              <StoryPickButton storyId={story.id} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
