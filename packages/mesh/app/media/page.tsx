import { getClient } from '@/apollo'
import {
  type GetPublishersQuery,
  type ListStoryFragment,
  GetLatestStoriesDocument,
  GetMostPickedStoryDocument,
  GetPublishersDocument,
} from '@/graphql/__generated__/graphql'

import CategorySelector from './_components/category-selector'
import Media from './_components/media'

export const revalidate = 0

type Story = ListStoryFragment
type Publisher = NonNullable<GetPublishersQuery['publishers']>[number]

export default async function Page() {
  const mockMostPickedStoryId = '1175202'
  const pageStoriesCount = 20
  const mediaCount = 5
  let stories: Story[] = []
  let mostPickedStory: Story | null | undefined
  let publishers: Publisher[] = []

  const responses = await Promise.allSettled([
    fetchLatestStories({ take: pageStoriesCount }),
    fetchMostPickedStory({ id: mockMostPickedStoryId }),
    fetchMedia({ take: mediaCount }),
  ])
  if (responses[0].status === 'fulfilled') {
    stories = responses[0].value.data.stories ?? []
  } else {
    // TODO: handle gql failed error
    console.error(responses[0].reason)
  }

  if (responses[1].status === 'fulfilled') {
    mostPickedStory = responses[1].value.data.story
  } else {
    // TODO: handle gql failed error
    console.error(responses[1].reason)
  }

  if (responses[2].status === 'fulfilled') {
    publishers = responses[2].value.data.publishers ?? []
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
async function fetchLatestStories({ take }: { take: number }) {
  return getClient().query({
    query: GetLatestStoriesDocument,
    variables: {
      take,
    },
  })
}

// TODO: update to fetch categroy most picked story from proxy server through restful api
async function fetchMostPickedStory({ id }: { id: string }) {
  return getClient().query({
    query: GetMostPickedStoryDocument,
    variables: {
      id,
    },
  })
}

// TODO: phase1 update to 5 hardcoded publisers ids
// TODO: phase2 update to fetch 5 most sponsored or hardcoded promote publishers ids through proxy server
async function fetchMedia({ take }: { take: number }) {
  return getClient().query({
    query: GetPublishersDocument,
    variables: {
      take,
    },
  })
}
