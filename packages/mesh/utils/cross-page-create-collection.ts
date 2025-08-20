import type { CollectionPickStory } from '@/app/[lng]/collection/(mutate)/_types/collection'
import { MINUTE } from '@/constants/time-unit'

type CreateCollectionStory = {
  story: CollectionPickStory
  ts: number
}

const createCollectionStoryKey = 'create-collecction-story' as const

export function getCrossPageCollectinPickStory() {
  try {
    const createCollectionStory: CreateCollectionStory | null = JSON.parse(
      localStorage.getItem(createCollectionStoryKey) ?? 'null'
    )
    if (!createCollectionStory) return null

    if (Date.now() - createCollectionStory?.ts > 30 * MINUTE) {
      clearCreateCollectionStoryLS()
      return null
    }
    return createCollectionStory.story
  } catch (error) {
    console.error(
      `createCollectionStoryKey in localStorage in not a valid JSON string: ${localStorage.getItem(
        createCollectionStoryKey
      )}`,
      error
    )
    return null
  }
}

export function setCrossPageCollectionPickStory(story: CollectionPickStory) {
  const createCollectionStory = {
    story,
    ts: Date.now(),
  }
  localStorage.setItem(
    createCollectionStoryKey,
    JSON.stringify(createCollectionStory)
  )
}

export function clearCreateCollectionStoryLS() {
  localStorage.removeItem(createCollectionStoryKey)
}
