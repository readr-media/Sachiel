import NextLink from 'next/link'
import { notFound } from 'next/navigation'

import InteractiveIcon from '@/components/interactive-icon'

import {
  fetchCategoryInformation,
  fetchGroupAndOtherStories,
  fetchMostSponsoredPublishersByCategory,
} from '../actions/get-homepage'
import DesktopStories from './_components/desktop-stories'
import MostPickedStory from './_components/most-picked-story'
import NonDesktopStories from './_components/non-desktop-stories'
import TopStoriesSection from './_components/top-stories-section'

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const slugInfo = await fetchCategoryInformation(slug)
  const categories = slugInfo?.categories
  if (!categories) {
    return notFound()
  }
  if (categories[0].slug !== slug) return notFound()

  const [storiesResult, publishersAndStoriesResult] = await Promise.allSettled([
    fetchGroupAndOtherStories(slug),
    fetchMostSponsoredPublishersByCategory(slug),
  ])

  const stories =
    storiesResult.status === 'fulfilled' ? storiesResult.value : null

  const publishersAndStories =
    publishersAndStoriesResult.status === 'fulfilled'
      ? publishersAndStoriesResult.value
      : null

  return (
    <main>
      <div className="title-1 top-[calc(theme(height.header.sm)] fixed z-modal hidden w-full items-center gap-x-5 bg-white px-5 py-4 text-primary-700 sm:flex md:px-[70px] lg:px-10">
        <NextLink href="/" className="group">
          <InteractiveIcon
            size={{ width: 24, height: 24 }}
            icon={{
              default: 'icon-navigate-previous',
              hover: 'icon-navigate-previous-hover',
            }}
          />
        </NextLink>
        <h2>{`${categories[0].title}熱門`}</h2>
      </div>
      <div className="sm:pt-15">
        <TopStoriesSection stories={stories} />
        {/* @ts-expect-error Async Server Component */}
        <MostPickedStory slug={slug} />
        <NonDesktopStories
          stories={stories}
          publishersAndStories={publishersAndStories}
        />
        <DesktopStories
          stories={stories}
          publishersAndStories={publishersAndStories}
        />
      </div>
    </main>
  )
}
