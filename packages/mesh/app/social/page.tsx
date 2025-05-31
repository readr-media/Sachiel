'use client'

import { redirect } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

import { getSocialPageData } from '@/app/actions/get-member-followings'
import AdManager from '@/components/ad/ad-manager-ad'
import ErrorPage from '@/components/status/error-page'
import { useUser } from '@/context/user'
import { type MongoDBResponse } from '@/utils/data-schema'

// Define Types and Constants
interface CachedSocialFeed {
  feedData: MongoDBResponse
  timestamp: number
}

const LOCAL_STORAGE_KEY_PREFIX = 'socialFeedCache_'
// const TEN_MINUTES_MS = 10 * 60 * 1000; // For staleness check later, if needed

import Feed from './_components/feed'
import FollowSuggestionFeed from './_components/follow-suggestion-feed'
import FollowSuggestionWidget from './_components/follow-suggestion-widget'
import Loading from './_components/loading'
import MoreFeed from './_components/more-feed'
import NoFollowings from './_components/no-followings'

export default function Page() {
  const { user } = useUser()
  const feedsNumber = 10
  const firstSectionAmount = 3
  const memberId = user.memberId
  const [socialData, setSocialData] = useState<MongoDBResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  if (!memberId) redirect('/login')

  useEffect(() => {
    const memberCacheKey = memberId
      ? `${LOCAL_STORAGE_KEY_PREFIX}${memberId}`
      : null
    let loadedFromCache = false

    // Try to load from localStorage first
    if (memberCacheKey) {
      try {
        const cachedItem = localStorage.getItem(memberCacheKey)
        if (cachedItem) {
          const cachedSocialData = JSON.parse(cachedItem) as CachedSocialFeed
          // Optional: Add staleness check here if desired for immediate rendering
          // For now, just load it if it exists
          if (cachedSocialData && cachedSocialData.feedData) {
            console.log(
              '[Social Page] Loaded data from localStorage cache for member:',
              memberId
            )
            setSocialData(cachedSocialData.feedData)
            // Set isLoading to false because we have something to show.
            // The fetch below will still run to get fresh data.
            setIsLoading(false)
            loadedFromCache = true
          }
        }
      } catch (error) {
        console.error(
          '[Social Page] Error reading social feed from localStorage:',
          error
        )
        // Optionally clear the corrupted item: localStorage.removeItem(memberCacheKey);
      }
    }

    // Proceed to fetch fresh data
    const fetchSocialData = async () => {
      // If we haven't loaded from cache and socialData is still null, then we are truly loading.
      if (!loadedFromCache && !socialData) {
        setIsLoading(true)
      } else {
        // If loaded from cache, or socialData somehow already set, ensure loading is false for background fetch.
        setIsLoading(false)
      }

      try {
        const response = await getSocialPageData(memberId, 0, feedsNumber)
        if (!response) {
          setIsNotFound(true)
          // Clear cache if API returns not found? Or let it be for offline. For now, just set notFound.
        } else {
          setSocialData(response)
          setIsNotFound(false) // Ensure isNotFound is false if data is successfully fetched
          // Save to localStorage
          if (memberCacheKey) {
            try {
              const newCachedData: CachedSocialFeed = {
                feedData: response,
                timestamp: Date.now(),
              }
              localStorage.setItem(
                memberCacheKey,
                JSON.stringify(newCachedData)
              )
              console.log(
                '[Social Page] Saved fresh data to localStorage for member:',
                memberId
              )
            } catch (error) {
              console.error(
                '[Social Page] Error saving social feed to localStorage:',
                error
              )
            }
          }
        }
      } catch (error) {
        console.error('[Social Page] Error fetching social page data:', error)
        if (!loadedFromCache) {
          // If cache wasn't loaded, an error in fetch means not found or error state
          setIsNotFound(true) // Or a more generic error state
        }
        // If cache was loaded, we can potentially just log the error and keep showing stale data.
      } finally {
        setIsLoading(false) // Always set isLoading to false after fetch attempt completes
      }
    }

    if (memberId) {
      // Ensure memberId is available
      fetchSocialData()
    }
  }, [memberId]) // Keep memberId as a dependency. `socialData` is not needed as a dependency here
  // as we are setting it. `feedsNumber` is a constant.

  if (isLoading) return <Loading />
  if (isNotFound) return <ErrorPage statusCode={404} />
  if (!socialData) return <Loading />

  const { stories, members } = socialData

  if (!members.length && !stories.length) {
    return <NoFollowings />
  }

  const firstSectionStories = stories.slice(0, firstSectionAmount)
  const secondSectionStories = stories.slice(firstSectionAmount)
  const suggestedMembers = members.filter((m) => m.id !== memberId)

  return (
    <main>
      <div className="flex justify-center gap-10 sm:p-5 lg:px-10">
        <div className="flex flex-col gap-2 sm:gap-4">
          {firstSectionStories.map((story) => {
            return <Feed key={story.id} story={story} />
          })}
          <FollowSuggestionFeed
            suggestedFollowers={suggestedMembers}
            isNoFollowings={false}
          />
          {secondSectionStories.map((story, index) => {
            const shouldShowAd = (index - 1) % 5 === 0
            return (
              <Fragment key={story.id}>
                <Feed story={story} />
                {shouldShowAd && (
                  <div className="mx-auto">
                    <AdManager
                      pageKey="social"
                      adKey={`C${Math.floor(index / 5) + 1}`}
                    />
                  </div>
                )}
              </Fragment>
            )
          })}
          <MoreFeed feedsNumber={feedsNumber} />
        </div>
        <FollowSuggestionWidget suggestedFollowers={suggestedMembers} />
      </div>
    </main>
  )
}
