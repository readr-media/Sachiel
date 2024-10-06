import { notFound } from 'next/navigation'

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
    <>
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
    </>
  )
}
