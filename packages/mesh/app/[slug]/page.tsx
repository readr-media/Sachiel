import { notFound } from 'next/navigation'

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
  const categorySlug = params.slug
  const slugInfo = await fetchCategoryInformation(categorySlug)
  if (!slugInfo) notFound()

  const [storiesResult, publishersAndStoriesResult, mostPickedStoriesResult] =
    await Promise.allSettled([
      fetchGroupAndOtherStories(categorySlug),
      fetchMostSponsoredPublishersByCategory(categorySlug),
      fetchCategoryStory(categorySlug),
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
    </main>
  )
}
