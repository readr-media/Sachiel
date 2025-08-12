'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { getMemberPickAndBookmark } from '@/app/actions/edit-collection'
import Spinner from '@/components/spinner'
import { useUser } from '@/context/user'

import { picksAndBookmarksPageCount } from '../_const/edit-collection'
import type { UseCollection } from '../_types/collection'
import { mergePickAndBookmarkStories } from '../_utils/merge-pick-and-bookmark-stories'
import InfiniteCollectionPicks from './infinite-collection-picks'
import StoryFilter from './story-filter'

export default function PickStories({
  useCollection,
}: {
  useCollection: UseCollection
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [shouldLoadMore, setShouldLoadMore] = useState(true)
  const mountedRef = useRef(false)

  const { user } = useUser()
  const {
    pickCandidates,
    setPickCandidates,
    bookmarkCandidates,
    setBookmarkCandidates,
  } = useCollection()
  const usePick = pickCandidates.usedAsFilter
  const useBookmark = bookmarkCandidates.usedAsFilter
  const usePickAndBookmark = usePick && useBookmark

  const candidates = useMemo(() => {
    if (usePickAndBookmark) {
      return mergePickAndBookmarkStories(
        pickCandidates.list,
        bookmarkCandidates.list
      )
    } else if (usePick) {
      return pickCandidates.list
    } else if (useBookmark) {
      return bookmarkCandidates.list
    } else {
      return []
    }
  }, [
    bookmarkCandidates.list,
    pickCandidates.list,
    useBookmark,
    usePick,
    usePickAndBookmark,
  ])

  const loadMorePicksAndBookmarks = useCallback(async () => {
    const { pickTake, bookmarkTake } = (() => {
      if (usePickAndBookmark) {
        return {
          pickTake: picksAndBookmarksPageCount / 2,
          bookmarkTake: picksAndBookmarksPageCount / 2,
        }
      } else if (usePick) {
        return {
          pickTake: picksAndBookmarksPageCount,
          bookmarkTake: 0,
        }
      } else if (useBookmark) {
        return {
          pickTake: 0,
          bookmarkTake: picksAndBookmarksPageCount,
        }
      } else {
        return {
          pickTake: 0,
          bookmarkTake: 0,
        }
      }
    })()
    const response = await getMemberPickAndBookmark({
      memberId: user.memberId,
      pickSkip: pickCandidates.list.length,
      pickTake,
      bookmarkSkip: bookmarkCandidates.list.length,
      bookmarkTake,
    })
    if (!response) return
    const picks = response.member?.picks ?? []
    const picksMaxCount = response.member?.picksCount ?? 0
    const bookmarks = response.member?.bookmarks ?? []
    const bookmarksMaxCount = response.member?.bookmarksCount ?? 0

    const newPicks = pickCandidates.list.concat(picks)
    setPickCandidates({
      list: newPicks,
      maxCount: picksMaxCount,
      usedAsFilter: pickCandidates.usedAsFilter,
    })
    const newBookmarks = bookmarkCandidates.list.concat(bookmarks)
    setBookmarkCandidates({
      list: newBookmarks,
      maxCount: bookmarksMaxCount,
      usedAsFilter: bookmarkCandidates.usedAsFilter,
    })

    if (
      newPicks.length === picksMaxCount &&
      newBookmarks.length === bookmarksMaxCount
    ) {
      setShouldLoadMore(false)
    }
  }, [
    bookmarkCandidates.list,
    bookmarkCandidates.usedAsFilter,
    pickCandidates.list,
    pickCandidates.usedAsFilter,
    setBookmarkCandidates,
    setPickCandidates,
    useBookmark,
    usePick,
    usePickAndBookmark,
    user.memberId,
  ])

  useEffect(() => {
    const fetchPicksAndBookmarks = async () => {
      setIsLoading(true)
      await loadMorePicksAndBookmarks()
      setIsLoading(false)
    }
    if (!mountedRef.current) {
      fetchPicksAndBookmarks()
      mountedRef.current = true
    }
  }, [loadMorePicksAndBookmarks])

  return (
    <>
      <StoryFilter useCollection={useCollection} />
      {isLoading ? (
        <Spinner />
      ) : (
        <InfiniteCollectionPicks
          key={candidates.length}
          candidates={candidates}
          loadMore={loadMorePicksAndBookmarks}
          shouldLoadMore={shouldLoadMore}
          useCollection={useCollection}
        />
      )}
    </>
  )
}
