'use client'

import { redirect } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

import { getSocialPageData } from '@/app/actions/get-member-followings'
import AdManager from '@/components/ad/ad-manager-ad'
import ErrorPage from '@/components/status/error-page'
import { useUser } from '@/context/user'
import { type MongoDBResponse } from '@/utils/data-schema'

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
    const fetchSocialData = async () => {
      setIsLoading(true)
      const response = await getSocialPageData(memberId, 0, feedsNumber)
      if (!response) {
        setIsNotFound(true)
      } else {
        setSocialData(response)
      }
      setIsLoading(false)
    }
    fetchSocialData()
  }, [memberId])

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
