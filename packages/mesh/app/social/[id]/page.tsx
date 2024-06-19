import {
  type GetMemberFollowingQuery,
  GetMemberFollowingDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import Feed from '../_components/feed'
import NoFollowings from '../_components/no-followings'

export const revalidate = 60

export default async function Page({ params }: { params: { id: string } }) {
  const userId = params.id
  const feedsNumber = 20
  const firstSectionAmount = 2

  const data = await fetchGraphQL(GetMemberFollowingDocument, {
    memberId: userId,
    takes: feedsNumber,
  })
  const currentUser = data?.member
  const currentUserFollowings = dataSelector(currentUser)

  if (!currentUser) {
    return (
      <main>
        <div>
          <h1>Error Page</h1>
          <p>Sorry, something went wrong.</p>
        </div>
      </main>
    )
  }

  if (!currentUserFollowings || currentUserFollowings.length === 0) {
    return <NoFollowings />
  }

  const followingMemberIds = new Set(
    currentUserFollowings.map((element) => element.id)
  )

  const storiesFromMemberActions = retrieveStoriesFromFollowingMemberActions(
    currentUserFollowings,
    feedsNumber
  )

  const firstSectionStories = storiesFromMemberActions.slice(
    0,
    firstSectionAmount
  )
  const secondSectionStories =
    storiesFromMemberActions.slice(firstSectionAmount)

  return (
    <main>
      <div className="flex justify-center gap-10 py-5">
        <div className="flex flex-col gap-4">
          {firstSectionStories.map((item) => {
            const isStoryPickedByCurrentUser = currentUser.pick?.some(
              (pick) => pick.story?.id === item.id
            )
            return (
              <Feed
                key={item.id}
                story={item.story ?? { id: '' }}
                isStoryPickedByCurrentUser={isStoryPickedByCurrentUser ?? false}
                followingMemberIds={followingMemberIds}
              />
            )
          })}
          <div className="flex w-screen min-w-[375px] max-w-[600px] flex-col bg-white px-5 py-4 drop-shadow sm:rounded-md lg:hidden">
            <h2 className="list-title pb-3 text-primary-700 sm:pb-1">
              推薦追蹤
            </h2>
          </div>
          {secondSectionStories.map((item) => {
            const isStoryPickedByCurrentUser = currentUser.pick?.some(
              (pick) => pick.story?.id === item.story?.id
            )
            return (
              <Feed
                key={item.id}
                story={item.story ?? { id: '' }}
                isStoryPickedByCurrentUser={isStoryPickedByCurrentUser ?? false}
                followingMemberIds={followingMemberIds}
              />
            )
          })}
        </div>
        <div className="hidden grow flex-col lg:flex lg:max-w-[260px] xl:max-w-[400px]">
          <h2 className="list-title pb-1 text-primary-700">推薦追蹤</h2>
        </div>
      </div>
    </main>
  )
}

const dataSelector = (data: GetMemberFollowingQuery['member']) =>
  data?.following
type FollowingMember = ReturnType<typeof dataSelector>

function retrieveStoriesFromFollowingMemberActions(
  followingMember: FollowingMember,
  maxFeeds: number
) {
  const storiesFromFollowingMemberActions =
    followingMember?.flatMap((member) => {
      const picks = member.pick ?? []
      const comments = member.comment ?? []
      return [...picks, ...comments]
    }) ?? []

  const uniqueStoriesFromFollowingMemberActions = new Map<
    string,
    typeof storiesFromFollowingMemberActions[number]
  >()

  storiesFromFollowingMemberActions.forEach((actions) => {
    if (
      actions.story &&
      !uniqueStoriesFromFollowingMemberActions.has(actions.story.id)
    ) {
      uniqueStoriesFromFollowingMemberActions.set(actions.story.id, actions)
    }
  })

  const uniqueStories = Array.from(
    uniqueStoriesFromFollowingMemberActions.values()
  )

  const uniqueStoriesSortedByActionTime = uniqueStories.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return uniqueStoriesSortedByActionTime.slice(0, maxFeeds)
}
