import { notFound, redirect } from 'next/navigation'

import { getSocialPageData } from '@/app/actions/get-member-followings'

import { getCurrentUser } from '../actions/auth'
import Feed from './_components/feed'
import FollowSuggestionFeed from './_components/follow-suggestion-feed'
import FollowSuggestionWidget from './_components/follow-suggestion-widget'
import NoFollowings from './_components/no-followings'

export default async function Page() {
  //TODO: infiniteScroll
  // const feedsNumber = 20
  const firstSectionAmount = 3
  const suggestedFollowersNumber = 5
  const user = await getCurrentUser()

  if (!user) redirect('/login')
  const memberId = user.memberId

  const socialData = await getSocialPageData(memberId)
  if (!socialData) notFound()
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
