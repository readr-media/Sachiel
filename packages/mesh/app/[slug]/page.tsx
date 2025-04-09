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
import TopPodcastSection from './_components/top-podcast-section'
import TopStoriesSection from './_components/top-stories-section'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params }: { params: { slug: string } }) {
  const categorySlug = params.slug
  const storyType = categorySlug === 'podcast' ? 'podcast' : 'story'
  const slugInfo = await fetchCategoryInformation(categorySlug)
  if (!slugInfo) notFound()

  const { stories, publishersAndStories, mostPickedStories } =
    await fetchSlugPageData(categorySlug)

  const { otherStories, groupStories, mostPickedStory } = transformStories({
    stories,
    mostPickedStories,
    storyType,
  })

  return (
    <main>
      <>
        {categorySlug !== 'podcast' ? (
          <TopStoriesSection
            otherStories={otherStories}
            groupStories={groupStories}
          />
        ) : (
          <TopPodcastSection otherStories={otherStories} />
        )}
        <MostPickedStory story={mostPickedStory} storyType={storyType} />
        <NonDesktopStories
          stories={otherStories}
          publishersAndStories={publishersAndStories}
          storyType={storyType}
        />
        <DesktopStories
          stories={otherStories}
          publishersAndStories={publishersAndStories}
          storyType={storyType}
        />
      </>
    </main>
  )
}

function getResult<T>(result: PromiseSettledResult<T>): T | null {
  return result.status === 'fulfilled' ? result.value : null
}

async function fetchSlugPageData(slug: string) {
  const [storiesResult, publishersAndStoriesResult, mostPickedStoriesResult] =
    await Promise.allSettled([
      fetchGroupAndOtherStories(slug),
      fetchMostSponsoredPublishersByCategory(slug),
      fetchCategoryStory(slug),
    ])

  return {
    stories: getResult(storiesResult),
    publishersAndStories: getResult(publishersAndStoriesResult),
    mostPickedStories: getResult(mostPickedStoriesResult),
  }
}

function transformStories({
  stories,
  mostPickedStories,
  storyType,
}: {
  stories: Awaited<ReturnType<typeof fetchGroupAndOtherStories>> | null
  mostPickedStories: Awaited<ReturnType<typeof fetchCategoryStory>> | null
  storyType: 'podcast' | 'story'
}) {
  const mostPickedStory = mostPickedStories ? mostPickedStories[0] : null

  if (!stories)
    return { otherStories: [], groupStories: undefined, mostPickedStory }

  const { others, group } = stories

  if (mostPickedStory) {
    const otherStories = others
      .filter((story) => story.id !== mostPickedStory.id)
      .map((story) => ({
        ...story,
        story_type: storyType,
      }))
    const groupStories = group
      ? group.filter((story) => story.id !== mostPickedStory.id)
      : undefined
    return { otherStories, groupStories, mostPickedStory }
  } else {
    return {
      otherStories: others,
      groupStories: group,
      mostPickedStory,
    }
  }
}
