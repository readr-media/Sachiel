import NextLink from 'next/link'
import { notFound } from 'next/navigation'

import InteractiveIcon from '@/components/interactive-icon'

import {
  fetchCategoryInformation,
  fetchCategoryStory,
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
  if (!slugInfo) notFound()

  const [storiesResult, publishersAndStoriesResult, mostPickedStoriesResult] =
    await Promise.allSettled([
      fetchGroupAndOtherStories(slug),
      fetchMostSponsoredPublishersByCategory(slug),
      fetchCategoryStory(slug),
    ])

  const stories =
    storiesResult.status === 'fulfilled' ? storiesResult.value : null

  const publishersAndStories =
    publishersAndStoriesResult.status === 'fulfilled'
      ? publishersAndStoriesResult.value
      : null

  const mostPickedStories =
    mostPickedStoriesResult.status === 'fulfilled'
      ? mostPickedStoriesResult.value
      : null
  const mostPickedStory = mostPickedStories?.[0]

  const filteredOtherStories =
    stories && mostPickedStory
      ? stories.others.filter((story) => story.id !== mostPickedStory.id)
      : stories?.others

  const filteredGroupStories =
    stories && mostPickedStory
      ? stories.group?.filter((story) => story.id !== mostPickedStory.id)
      : stories?.group

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
        <h2>{`${slugInfo.title}熱門`}</h2>
      </div>
      <div className="sm:pt-15">
        <TopStoriesSection
          otherStories={filteredOtherStories}
          groupStories={filteredGroupStories}
        />
        <MostPickedStory story={mostPickedStory} />
        <NonDesktopStories
          stories={filteredOtherStories}
          publishersAndStories={publishersAndStories}
        />
        <DesktopStories
          stories={filteredOtherStories}
          publishersAndStories={publishersAndStories}
        />
      </div>
    </main>
  )
}
