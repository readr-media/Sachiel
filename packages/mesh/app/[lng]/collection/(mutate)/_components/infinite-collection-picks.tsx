'use client'

import { useEffect, useMemo } from 'react'

import useInView from '@/hooks/use-in-view'

import type {
  CollectionPickStory,
  PickOrBookmark,
  UseCollection,
} from '../_types/collection'
import PickStoryCard from './pick-story-card'

export default function InfiniteCollectionPicks({
  candidates,
  loadMore,
  shouldLoadMore,
  useCollection,
}: {
  candidates: PickOrBookmark[]
  loadMore: () => Promise<void>
  shouldLoadMore: boolean
  useCollection: UseCollection
}) {
  const { collectionPickStories, setCollectionPickStories } = useCollection()
  const { targetRef: triggerLoadmoreRef, isIntersecting: shouldStartLoadMore } =
    useInView()

  const collectionPickStoryIds = useMemo(() => {
    return collectionPickStories.reduce((ids, collectionPickStory) => {
      const storyId = collectionPickStory.id
      if (storyId) {
        ids.add(storyId)
      }
      return ids
    }, new Set<string>())
  }, [collectionPickStories])

  const onPickStoryClicked = (
    candidateStory: CollectionPickStory,
    isStoryPicked: boolean
  ) => {
    if (isStoryPicked) {
      setCollectionPickStories([
        ...collectionPickStories.filter(
          (collectionPick) => collectionPick.id !== candidateStory?.id
        ),
      ])
    } else {
      setCollectionPickStories([...collectionPickStories, candidateStory])
    }
  }

  useEffect(() => {
    if (shouldStartLoadMore && shouldLoadMore) {
      loadMore()
    }
  }, [loadMore, shouldLoadMore, shouldStartLoadMore])

  return (
    <>
      {candidates.map((candidate, i) => {
        if (!candidate.story) return null
        const isStoryPicked = collectionPickStoryIds.has(
          candidate.story?.id ?? ''
        )
        return (
          <PickStoryCard
            key={candidate.story.id}
            isPicked={isStoryPicked}
            story={candidate.story}
            onClick={onPickStoryClicked.bind(
              null,
              candidate.story,
              isStoryPicked
            )}
            ref={i === candidates.length - 10 ? triggerLoadmoreRef : undefined}
          />
        )
      })}
    </>
  )
}
