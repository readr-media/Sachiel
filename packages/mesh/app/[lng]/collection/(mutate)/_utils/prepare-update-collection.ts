import type {
  CollectionPickCreateInput,
  CollectionPickUpdateArgs,
  CollectionPickWhereUniqueInput,
} from '@/graphql/__generated__/graphql'
import { getCurrentTimeInISOFormat } from '@/utils/date'

import type { CollectionPick, CollectionPickStory } from '../_types/collection'

export function prepareUpdateCollectionTitle({
  newTitle,
  oldTitle,
  heroImage,
}: {
  newTitle: string
  oldTitle: string
  heroImage: string | File | null
}) {
  const isTitleUpdated = newTitle !== oldTitle
  // new image will only be File type
  const isHeroImageUpdated = heroImage && typeof heroImage !== 'string'
  const imageUpload = (() => {
    if (isHeroImageUpdated) {
      const formData = new FormData()
      formData.append('heroImage', heroImage)
      return formData
    }
  })()

  return { isTitleUpdated, newTitle, isHeroImageUpdated, imageUpload }
}

export function prepareUpdateeCollectionSummary({
  newSummary,
  oldSummary,
}: {
  newSummary: string
  oldSummary: string
}) {
  const isSummaryUpdated = newSummary !== oldSummary
  return { isSummaryUpdated, newSummary }
}

export function prepareUpdateCollectionPicks({
  newCollectionPickStories,
  oldCollectionPicks,
  memberId,
}: {
  newCollectionPickStories: CollectionPickStory[]
  oldCollectionPicks: CollectionPick[]
  memberId: string
}) {
  const createCollectionPicksData: CollectionPickCreateInput[] = []
  const updateCollectionPicksData: CollectionPickUpdateArgs[] = []
  const deleteCollectionPicksData: CollectionPickWhereUniqueInput[] = []
  const newCollectionStoriesMap = new Map(
    newCollectionPickStories.map((story, i) => [
      story.id,
      { ...story, sortOrder: i },
    ])
  )
  oldCollectionPicks?.forEach((collectionPick) => {
    const storyId = collectionPick.story?.id ?? ''
    const newCollectionStory = newCollectionStoriesMap.get(storyId)
    if (newCollectionStory) {
      if (newCollectionStory.sortOrder !== collectionPick.sort_order) {
        // updated collection pick
        updateCollectionPicksData.push({
          where: { id: collectionPick.id },
          data: { sort_order: newCollectionStory.sortOrder },
        })
      }
      newCollectionStoriesMap.delete(storyId)
    } else {
      // deleted collection pick
      deleteCollectionPicksData.push({
        id: collectionPick.id,
      })
    }
  })
  // added collection pick
  newCollectionStoriesMap.forEach((story) =>
    createCollectionPicksData.push({
      story: {
        connect: {
          id: story.id,
        },
      },
      sort_order: story.sortOrder,
      creator: {
        connect: {
          id: memberId,
        },
      },
      picked_date: getCurrentTimeInISOFormat(),
    })
  )

  const isCollectionPicksUpdated =
    createCollectionPicksData.length ||
    updateCollectionPicksData.length ||
    deleteCollectionPicksData.length

  return {
    isCollectionPicksUpdated,
    createCollectionPicksData,
    updateCollectionPicksData,
    deleteCollectionPicksData,
  }
}
