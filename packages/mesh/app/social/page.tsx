'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import getMemberFollowings from '@/app/actions/get-member-followings'
import { MINUTE } from '@/constants/time-unit'
import { useUser } from '@/context/user'

import Feed from './_components/feed'
import FollowSuggestionFeed from './_components/follow-suggestion-feed'
import FollowSuggestionWidget from './_components/follow-suggestion-widget'
import Loading from './_components/loading'
import NoFollowings from './_components/no-followings'

export type SuggestedFollowers = Awaited<
  ReturnType<typeof getMemberFollowings>
>['suggestFollowing']
type SocialData = Awaited<ReturnType<typeof getMemberFollowings>>

export default function Page() {
  //TODO: infiniteScroll
  const { user } = useUser()
  const router = useRouter()
  const feedsNumber = 20
  const firstSectionAmount = 3
  const suggestedFollowersNumber = 5
  const [socialData, setSocialData] = useState<SocialData | null>(null)

  useEffect(() => {
    if (!user) return

    const { memberId } = user

    const cacheKey = `socialData_${memberId}_${feedsNumber}_${suggestedFollowersNumber}`
    const cachedData = localStorage.getItem(cacheKey)

    if (cachedData) {
      const { timestamp, socialData: cachedSocialData } = JSON.parse(cachedData)

      const cacheAge = new Date().getTime() - timestamp

      //TODO: confirm the initial data cache duration with HC
      if (cacheAge < MINUTE) {
        const restoredSetObjectsData = {
          ...cachedSocialData,
          firstLayerFollowingIds: new Set(
            cachedSocialData.firstLayerFollowingIds
          ),
        }
        setSocialData(restoredSetObjectsData)
        return
      }
    }

    const fetchData = async () => {
      const response = await getMemberFollowings(
        memberId,
        feedsNumber,
        suggestedFollowersNumber
      )
      setSocialData(response)

      const convertSetObjectsData = {
        ...response,
        firstLayerFollowingIds: Array.from(response.firstLayerFollowingIds),
      }

      const dataToCache = {
        timestamp: new Date().getTime(),
        socialData: convertSetObjectsData,
      }
      localStorage.setItem(cacheKey, JSON.stringify(dataToCache))
    }
    fetchData()
  }, [user, router])

  if (!socialData) return <Loading />

  const {
    member: currentMember,
    hasFollowing,
    firstLayerFollowingIds,
    suggestFollowing,
    storiesFromFollowingMemberActions,
  } = socialData

  if (!currentMember) {
    return (
      <main>
        <div>
          <h1>Error Page</h1>
          <p>Sorry, something went wrong.</p>
        </div>
      </main>
    )
  }

  if (!hasFollowing) {
    return <NoFollowings />
  }

  const firstSectionStories = storiesFromFollowingMemberActions.slice(
    0,
    firstSectionAmount
  )
  const secondSectionStories =
    storiesFromFollowingMemberActions.slice(firstSectionAmount)

  return (
    <main>
      <div className="flex justify-center gap-10 sm:p-5 lg:px-10">
        <div className="flex flex-col gap-2 sm:gap-4">
          {firstSectionStories.map((item) => {
            return (
              <Feed
                key={item.id}
                story={item.story ?? { id: '' }}
                followingMemberIds={firstLayerFollowingIds}
              />
            )
          })}
          <FollowSuggestionFeed
            suggestedFollowers={suggestFollowing.slice(
              0,
              suggestedFollowersNumber
            )}
            isNoFollowings={false}
          />
          {secondSectionStories.map((item) => {
            return (
              <Feed
                key={item.id}
                story={item.story ?? { id: '' }}
                followingMemberIds={firstLayerFollowingIds}
              />
            )
          })}
        </div>
        <FollowSuggestionWidget
          suggestedFollowers={suggestFollowing.slice(
            0,
            suggestedFollowersNumber
          )}
        />
      </div>
    </main>
  )
}
