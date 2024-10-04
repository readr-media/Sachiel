import Image from 'next/image'
import Link from 'next/link'

import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { useUser } from '@/context/user'
import { getDisplayPicks } from '@/utils/story-display'

import { type Story } from './media-stories'

export default function MostPickedStoryCard({
  story,
  isDesktop,
}: {
  story: Story
  isDesktop: boolean
}) {
  const { user } = useUser()
  const displayPicks = getDisplayPicks(story.picks, user.followingMemberIds)

  return (
    <section className="bg-primary-100">
      <div className="p-5 md:px-[70px] lg:px-10 lg:py-8">
        <div
          className={`${
            isDesktop ? 'title-1' : 'list-title'
          } text-primary-500 lg:h-8`}
        >
          最多人精選
        </div>
        <article className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-5 lg:gap-10">
          <div className="relative aspect-[2/1] sm:aspect-square sm:size-[168px] lg:aspect-[2/1] lg:h-[178px] lg:w-[356px] xl:h-[200px] xl:w-[400px]">
            <Link href={`/story/${story.id}`} className="size-full">
              <Image
                className="rounded-md"
                src={story.og_image || '/images/default-story-image.webP'}
                alt={story.title ?? ''}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
          <div className="sm:flex sm:flex-1 sm:flex-col sm:justify-between sm:py-2">
            {/* right top section */}
            <div>
              <div className="flex h-6 flex-row items-center justify-between">
                <Link
                  href={`/profile/publisher/${story.source?.customId ?? ''}`}
                >
                  <h4
                    className={`${
                      isDesktop ? 'body-3' : 'footnote'
                    } h-5 text-primary-500 lg:h-auto`}
                  >
                    {story.source?.title ?? ''}
                  </h4>
                </Link>
                <StoryMoreActionButton storyId={story.id} />
              </div>
              <div
                className={`${
                  isDesktop ? 'title-1' : 'title-2'
                } mt-1 text-primary-700`}
              >
                <Link href={`/story/${story.id}`}>{story.title}</Link>
              </div>
              <div className="footnote mt-2">
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
              {/* for sm and above, mt is set to space this div and top section when title is too long */}
              <div className="mt-4 flex h-8 flex-row justify-between sm:mt-3 lg:mt-4">
                <StoryPickInfo
                  displayPicks={displayPicks}
                  pickCount={story.picksCount ?? 0}
                />
                <StoryPickButton storyId={story.id} />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
