import type { DocumentNode } from 'graphql'

import { getClient } from '@/apollo'
import Feed from '@/app/social/_components/feed'
import {
  type Following,
  type GetUserFollowingRequest,
  type GetUserFollowingResponse,
  GET_USER_FOLLOWING,
} from '@/graphql/query/member'

export const revalidate = 60

export default async function Page() {
  const userId = '175'
  const feedsNumber = 20
  const firstSectionAmount = 2
  const currentUser = await fetchUserFollowing(GET_USER_FOLLOWING, {
    memberId: userId,
    takes: feedsNumber,
  })

  if (!currentUser) {
    return (
      <div>
        <h1>Error Page</h1>
        <p>Sorry, something went wrong.</p>
      </div>
    )
  }

  const sortedFollowingMemberActionByTime = processedPicksAndCommentsData(
    currentUser.following,
    feedsNumber
  )

  const firstSectionPicks = sortedFollowingMemberActionByTime.slice(
    0,
    firstSectionAmount
  )
  const secondSectionPicks =
    sortedFollowingMemberActionByTime.slice(firstSectionAmount)

  return (
    <main>
      {sortedFollowingMemberActionByTime.length === 0 ? (
        <div className="flex justify-center py-5">
          <div className="flex flex-col gap-4">
            <p>咦？這裡好像還缺點什麼...</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-10 py-5">
          <div className="flex flex-col gap-4">
            {firstSectionPicks.map((pick) => (
              <Feed
                key={pick.id}
                story={pick.story}
                currentUser={currentUser}
              />
            ))}
            <div className="flex w-screen min-w-[375px] max-w-[600px] flex-col bg-white px-5 py-4 drop-shadow sm:rounded-md lg:hidden">
              <h2 className="list-title pb-3 text-primary-700 sm:pb-1">
                推薦追蹤
              </h2>
            </div>
            {secondSectionPicks.map((pick) => (
              <Feed
                key={pick.id}
                story={pick.story}
                currentUser={currentUser}
              />
            ))}
          </div>
          <div className="hidden grow flex-col lg:flex lg:max-w-[260px] xl:max-w-[400px]">
            <h2 className="list-title pb-1 text-primary-700">推薦追蹤</h2>
          </div>
        </div>
      )}
    </main>
  )
}

async function fetchUserFollowing(
  query: DocumentNode,
  variables: GetUserFollowingRequest
): Promise<GetUserFollowingResponse['member'] | null> {
  try {
    const { data, error: gqlError } = await getClient().query<
      GetUserFollowingResponse,
      GetUserFollowingRequest
    >({
      query: query,
      variables: variables,
    })
    if (gqlError) {
      throw new Error(gqlError.message)
    }
    return data.member
  } catch (error) {
    console.error('Error fetching user following:', error)
    return null
  }
}

function processedPicksAndCommentsData(
  followingMember: Following[],
  maxFeeds: number
) {
  const picksAndComments = followingMember.flatMap((member) => [
    ...member.pick,
    ...member.comment,
  ])

  const uniquePicksAndCommentsMap = new Map<
    string,
    Following['pick'][number] | Following['comment'][number]
  >()

  picksAndComments.forEach((actions) => {
    if (
      actions.story &&
      actions.story.id !== null &&
      !uniquePicksAndCommentsMap.has(actions.story.id)
    ) {
      uniquePicksAndCommentsMap.set(actions.story.id, actions)
    }
  })

  const uniquePicks = Array.from(uniquePicksAndCommentsMap.values())

  const sortedUniquePicksByPickTime = uniquePicks.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return sortedUniquePicksByPickTime.slice(0, maxFeeds)
}
