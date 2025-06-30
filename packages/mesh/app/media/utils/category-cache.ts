// Helper functions for managing category data caching in localStorage

import type { z } from 'zod'

import { type MostPickedStory } from '@/types/homepage'
import type { rawMostSponsoredPublisherStoryByCategorySchema } from '@/utils/data-schema'

import { type LatestStoriesInfo } from '../_components/media-stories'
// This interface would ideally be imported from where it's defined,
// representing the structure of the data being cached.
interface CategoryPageData {
  mostPickedStory: MostPickedStory
  latestStoriesInfo: LatestStoriesInfo // Replace 'any' with actual type, e.g., LatestStoriesInfo
  publishersAndStories: z.infer<
    typeof rawMostSponsoredPublisherStoryByCategorySchema
  >[]
}

interface CachedCategoryItem {
  data: CategoryPageData
  timestamp: number
}

const CACHE_KEY_PREFIX = 'mediaCategoryCache_'

/**
 * Generates the localStorage key for a given category slug.
 * @param categorySlug The slug of the category.
 * @returns The localStorage key string.
 */
function getStorageKey(categorySlug: string): string {
  return `${CACHE_KEY_PREFIX}${categorySlug}`
}

/**
 * Stores category data in localStorage.
 * @param categorySlug The slug of the category.
 * @param categoryData The data to be cached (structure should match CategoryPageData).
 */
export function setCachedCategoryData(
  categorySlug: string,
  categoryData: CategoryPageData
): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    // console.warn('localStorage is not available. Skipping cache set.');
    return
  }

  if (!categorySlug) {
    console.error('categorySlug is required to set cache data.')
    return
  }

  const cacheItem: CachedCategoryItem = {
    data: categoryData,
    timestamp: Date.now(),
  }

  try {
    const serializedItem = JSON.stringify(cacheItem)
    localStorage.setItem(getStorageKey(categorySlug), serializedItem)
  } catch (error) {
    console.error(
      `Error saving category data for "${categorySlug}" to localStorage:`,
      error
    )
    // Potential: Implement cache eviction strategy if quota is exceeded.
  }
}

/**
 * Retrieves cached category data from localStorage if it's within the TTL.
 * @param categorySlug The slug of the category.
 * @param ttlMilliseconds The Time To Live for the cached item in milliseconds.
 * @returns The cached CategoryPageData or null if not found, expired, or invalid.
 */
export function getCachedCategoryData(
  categorySlug: string,
  ttlMilliseconds: number
): CategoryPageData | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    // console.warn('localStorage is not available. Skipping cache get.');
    return null
  }

  if (!categorySlug) {
    console.error('categorySlug is required to get cache data.')
    return null
  }

  const storageKey = getStorageKey(categorySlug)
  try {
    const serializedItem = localStorage.getItem(storageKey)
    if (!serializedItem) {
      return null
    }

    const cacheItem: CachedCategoryItem = JSON.parse(serializedItem)

    // Basic validation of the parsed item structure
    if (
      !cacheItem ||
      typeof cacheItem.timestamp !== 'number' ||
      typeof cacheItem.data === 'undefined'
    ) {
      // console.warn(`Invalid cache item structure for "${categorySlug}". Removing.`);
      localStorage.removeItem(storageKey)
      return null
    }

    const now = Date.now()
    if (now - cacheItem.timestamp > ttlMilliseconds) {
      // console.info(`Cache for "${categorySlug}" expired. Removing.`);
      localStorage.removeItem(storageKey)
      return null
    }

    return cacheItem.data
  } catch (error) {
    console.error(
      `Error retrieving category data for "${categorySlug}" from localStorage:`,
      error
    )
    // If parsing fails or any other error, attempt to invalidate the cache for this key
    try {
      localStorage.removeItem(storageKey)
    } catch (removeError) {
      // console.error(`Failed to remove corrupted cache item for "${categorySlug}":`, removeError);
    }
    return null
  }
}

/**
 * Removes cached category data from localStorage for a specific category.
 * @param categorySlug The slug of the category.
 */
export function removeCachedCategoryData(categorySlug: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    // console.warn('localStorage is not available. Skipping cache remove.');
    return
  }

  if (!categorySlug) {
    console.error('categorySlug is required to remove cache data.')
    return
  }

  try {
    localStorage.removeItem(getStorageKey(categorySlug))
  } catch (error) {
    console.error(
      `Error removing category data for "${categorySlug}" from localStorage:`,
      error
    )
  }
}

// Optional: Function to clear all media category cache items
export function clearAllMediaCategoryCache(): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    // console.warn('localStorage is not available. Skipping cache clear.');
    return
  }

  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(CACHE_KEY_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
    // console.info('All media category cache items cleared.');
  } catch (error) {
    console.error('Error clearing all media category cache:', error)
  }
}
