import type { PickOrBookmark } from '../_types/collection'

export function mergePickAndBookmarkStories(
  picks: PickOrBookmark[],
  bookmarks: PickOrBookmark[]
) {
  // Create a Set for deduplication
  const mergedStories = [...picks]
  const pickStoryIds = new Set(picks.map((obj) => obj.story?.id))
  let insertIndex = 0 // Tracks the current insertion point in picks

  // Iterate through bookmarks
  for (const bookmark of bookmarks) {
    if (!pickStoryIds.has(bookmark.story?.id)) {
      // Find the correct position starting from insertIndex
      while (
        insertIndex < picks.length &&
        new Date(picks[insertIndex].picked_date) <=
          new Date(bookmark.picked_date)
      ) {
        insertIndex++
      }

      // Insert bookmark at the found position
      mergedStories.splice(insertIndex, 0, bookmark)
      pickStoryIds.add(bookmark.id)
    }
  }

  return mergedStories
}
