'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import getMemberFollowings from '@/app/actions/get-member-followings'
import Spinner from '@/components/spinner'
import { MINUTE } from '@/constants/time-unit'
import { useUser } from '@/context/user'
import { processMostFollowedMembers } from '@/utils/most-followed-member'

import Feed from '../_components/feed'
import FollowSuggestionFeed from '../_components/follow-suggestion-feed'
import FollowSuggestionWidget from '../_components/follow-suggestion-widget'
import NoFollowings from '../_components/no-followings'

export type SuggestedFollowers = Awaited<
  ReturnType<typeof getMemberFollowings>
>['suggestFollowing']
type SocialData = Awaited<ReturnType<typeof getMemberFollowings>>
type MostFollowedMembers = Awaited<
  ReturnType<typeof processMostFollowedMembers>
>

export default function Page({ params }: { params: { id: string } }) {
  //TODO: infiniteScroll
  const { user } = useUser()
  const router = useRouter()
  const feedsNumber = 20
  const firstSectionAmount = 3
  const suggestedFollowersNumber = 5
  const [socialData, setSocialData] = useState<SocialData | null>(null)
  const [mostFollowedMembers, setMostFollowedMembers] =
    useState<MostFollowedMembers>([])

  useEffect(() => {
    if (!user) return

    const { memberId } = user
    if (params.id !== memberId) {
      router.push(`/social/${memberId}`)
      return
    }

    const cacheKey = `socialData_${memberId}_${feedsNumber}_${suggestedFollowersNumber}`
    const cachedData = localStorage.getItem(cacheKey)

    if (cachedData) {
      const {
        timestamp,
        socialData: cachedSocialData,
        mostFollowedMembers: cachedMostFollowedMembers,
      } = JSON.parse(cachedData)

      const cacheAge = new Date().getTime() - timestamp

      if (cacheAge < MINUTE) {
        const restoredSetObjectsData = {
          ...cachedSocialData,
          firstLayerFollowingIds: new Set(
            cachedSocialData.firstLayerFollowingIds
          ),
        }
        setSocialData(restoredSetObjectsData)
        setMostFollowedMembers(cachedMostFollowedMembers)
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

      if (!response.hasFollowing) {
        const mostFollowed = await processMostFollowedMembers()
        setMostFollowedMembers(mostFollowed)
      }

      const convertSetObjectsData = {
        ...response,
        firstLayerFollowingIds: Array.from(response.firstLayerFollowingIds),
      }

      const dataToCache = {
        timestamp: new Date().getTime(),
        socialData: convertSetObjectsData,
        mostFollowedMembers: mostFollowedMembers,
      }
      localStorage.setItem(cacheKey, JSON.stringify(dataToCache))
    }
    fetchData()
  }, [user, params.id, router])

  if (!socialData) return <Spinner />

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
    return <NoFollowings suggestedFollowers={mostFollowedMembers} />
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
            suggestedFollowers={suggestFollowing}
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
        <FollowSuggestionWidget suggestedFollowers={suggestFollowing} />
      </div>
    </main>
  )
}
