import Image from 'next/image'

import StoryMeta from '@/components/story-card/story-meta'
import StoryPick from '@/components/story-card/story-pick'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import { type ListStoryFragment } from '@/graphql/__generated__/graphql'
import { getDisplayPicks } from '@/utils/story-display'

type Story = ListStoryFragment

// only used in desktop width
export default function HeroStoryCard({ story }: { story: Story }) {
  // TODO: replace props chain by using redux to store user related data
  const followingMemberIds = new Set('')
  const displayPicks = getDisplayPicks(story.pick, followingMemberIds)

  return (
    <article className="col-span-2 border-b pb-5 pt-3">
      <div className="flex gap-10">
        {/* use padding-top to set aspect-ratio to prevent height growing when right block grows in too many lines of titles */}
        <div className="relative h-0 w-[calc((100%-40px)/2)] flex-1 pt-[calc((100%-40px)/4)]">
          <Image
            className="rounded-md object-cover"
            src={story.og_image || '/images/default-story-image.webP'}
            alt={story.title ?? ''}
            fill
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          {/* right top section */}
          <div>
            <div className="flex h-6 flex-row items-center justify-between">
              <h4 className="body-3 h-5 text-primary-500 lg:h-auto">
                {story.source?.title}
              </h4>
              <button>...</button>
            </div>
            <div className="hero-title mt-1 text-primary-700">
              {story.title ?? ''}
            </div>
            <div className="body-3 line-clamp-1 mt-3 text-primary-600">
              {story.summary ?? ''}
            </div>
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
                pickCount={story.pickCount ?? 0}
              />
              {/* TODO: add user pick info to check if already picked */}
              <StoryPick isStoryPicked={false} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
