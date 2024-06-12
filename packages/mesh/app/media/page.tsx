import { getClient } from '@/apollo'
import {
  type Publisher,
  type Publishers,
  GET_PUBLISHERS,
} from '@/graphql/query/publisher'
import {
  type LatestStories,
  type Story,
  GET_LATEST_STORIES,
  GET_MOST_PICKED_STORY,
  MostPickedStory,
} from '@/graphql/query/story'

import CategorySelector from './_components/category-selector'
import Media from './_components/media'

export const revalidate = 0

export default async function Page() {
  let stories: Story[] = []
  let mostPickedStory: Story | null = null
  let publishers: Publisher[] = []

  const responses = await Promise.allSettled([
    fetchLatestStories(),
    fetchMostPickedStory(),
    fetchMedia({ take: 5 }),
  ])
  if (responses[0].status === 'fulfilled') {
    stories = responses[0].value.data.stories
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
    publishers = responses[2].value.data.publishers
  } else {
    // TODO: handle gql failed error
    console.error(responses[2].reason)
  }

  const displayPublishers = publishers.map((publisher) => ({
    ...publisher,
    stories: stories.slice(0, 3),
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
async function fetchLatestStories() {
  return getClient().query<LatestStories>({
    query: GET_LATEST_STORIES,
  })
}

// TODO: update to fetch categroy most picked story from proxy server through restful api
async function fetchMostPickedStory() {
  return getClient().query<MostPickedStory>({
    query: GET_MOST_PICKED_STORY,
  })
}

// TODO: phase1 update to 5 hardcoded publisers ids
// TODO: phase2 update to fetch 5 most sponsored or hardcoded promote publishers ids through proxy server
async function fetchMedia({ take }: { take: number }) {
  return getClient().query<Publishers>({
    query: GET_PUBLISHERS,
    variables: {
      take,
    },
  })
}
