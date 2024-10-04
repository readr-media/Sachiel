'use client'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  type MongoDBResponse,
  getSocialPageData,
} from '@/app/actions/get-member-followings'
import { useUser } from '@/context/user'

import Feed from './_components/feed'
import FollowSuggestionFeed from './_components/follow-suggestion-feed'
import FollowSuggestionWidget from './_components/follow-suggestion-widget'
import Loading from './_components/loading'
import NoFollowings from './_components/no-followings'

export default function Page() {
  //TODO: infiniteScroll
  const { user } = useUser()
  // const feedsNumber = 20
  const firstSectionAmount = 3
  const suggestedFollowersNumber = 5
  const memberId = user.memberId
  const [socialData, setSocialData] = useState<MongoDBResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSocialData = async () => {
      setIsLoading(true)
      const response = await getSocialPageData(memberId)
      if (!response) return notFound()
      setSocialData(response)
      setIsLoading(false)
    }
    fetchSocialData()
  }, [memberId])

  if (isLoading || !socialData) return <Loading />

  const { stories, members } = socialData

  if (!members.length && !stories.length) {
    return <NoFollowings />
  }

  const firstSectionStories = stories.slice(0, firstSectionAmount)
  const secondSectionStories = stories.slice(firstSectionAmount)

  return (
    <main>
      <div className="flex justify-center gap-10 sm:p-5 lg:px-10">
        <div className="flex flex-col gap-2 sm:gap-4">
          {firstSectionStories.map((story) => {
            return <Feed key={story.id} story={story} />
          })}
          <FollowSuggestionFeed
            suggestedFollowers={members.slice(0, suggestedFollowersNumber)}
            isNoFollowings={false}
          />
          {secondSectionStories.map((story) => {
            return <Feed key={story.id} story={story} />
          })}
        </div>
        <FollowSuggestionWidget
          suggestedFollowers={members.slice(0, suggestedFollowersNumber)}
        />
      </div>
    </main>
  )
}
