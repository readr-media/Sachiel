import { RESTFUL_ENDPOINTS, STATIC_FILE_ENDPOINTS } from '@/constants/config'
import {
  type LatestStoriesQuery,
  type PublishersQuery,
} from '@/graphql/__generated__/graphql'
import fetchData from '@/utils/fetch-statics'

import CategorySelector from './_components/category-selector'
import Media from './_components/media'

export const revalidate = 0
export type Story = NonNullable<LatestStoriesQuery['stories']>[number]
export type Publisher = NonNullable<PublishersQuery['publishers']>[number]
type LatestStoriesResponse = {
  update_time: number
  expire_time: number
  num_stories: number
  stories: Story[]
}

export default async function Page() {
  const followingPublishers = ['4', '84'],
    categoryId = '3'
  const mediaCount = 5
  let stories: Story[] = []
  let mostPickedStory: Story | null | undefined
  let publishers: Publisher[] = []

  const responses = await Promise.allSettled([
    fetchLatestStories(followingPublishers, categoryId),
    fetchMostPickedStory(),
    fetchMedia(),
  ])

  if (responses[0].status === 'fulfilled') {
    stories = responses[0].value?.stories ?? []
  } else {
    // TODO: handle gql failed error
    console.error(responses[0].reason)
  }

  if (responses[1].status === 'fulfilled') {
    mostPickedStory = responses[1].value?.[0]
  } else {
    // TODO: handle gql failed error
    console.error(responses[1].reason)
  }

  if (responses[2].status === 'fulfilled') {
    publishers = responses[2].value?.slice(0, mediaCount) ?? []
  } else {
    // TODO: handle gql failed error
    console.error(responses[2].reason)
  }

  // TODO: fetch real publiser stories
  const displayPublishers = publishers.map((publisher) => ({
    ...publisher,
    stories: stories?.slice(0, 3) ?? [],
  }))

  return (
    <main className="bg-white">
      <CategorySelector />
      <Media
        stories={stories}
        mostPickedStory={mostPickedStory}
        displayPublishers={displayPublishers}
      />
    </main>
  )
}

// TODO: update to fetch latest stories by category
async function fetchLatestStories(publishers: string[], category: string) {
  return fetchData<LatestStoriesResponse>(RESTFUL_ENDPOINTS.latestStories, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      publishers,
      category,
    }),
  })
}

// TODO: update to fetch categroy most picked story from proxy server through restful api
async function fetchMostPickedStory(category: string = 'society') {
  return fetchData<Story[]>(
    STATIC_FILE_ENDPOINTS.mostPickStoriesInCategoryFn(category)
  )
}

// TODO: phase1 update to 5 hardcoded publisers ids
// TODO: phase2 update to fetch 5 most sponsored or hardcoded promote publishers ids through proxy server
async function fetchMedia() {
  return fetchData<Publisher[]>(STATIC_FILE_ENDPOINTS.mostSponsorPublishers)
}
