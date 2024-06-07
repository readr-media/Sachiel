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
  const currentUser = await fetchUserFollowing({
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
  const followingMemberIds = new Set(
    currentUser.following.map((element) => element.id)
  )

  const storiesFromMemberActions = retrieveStoriesFromFollowingMemberActions(
    currentUser.following,
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
      {storiesFromMemberActions.length === 0 ? (
        <div className="flex justify-center py-5">
          <div className="flex flex-col gap-4">
            <p>咦？這裡好像還缺點什麼...</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-10 py-5">
          <div className="flex flex-col gap-4">
            {firstSectionStories.map((item) => {
              const isStoryPickedByCurrentUser = currentUser.pick.some(
                (pick) => pick.story?.id === item.id
              )
              return (
                <Feed
                  key={item.id}
                  story={item.story}
                  isStoryPickedByCurrentUser={isStoryPickedByCurrentUser}
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
              const isStoryPickedByCurrentUser = currentUser.pick.some(
                (pick) => pick.story?.id === item.story.id
              )
              return (
                <Feed
                  key={item.id}
                  story={item.story}
                  isStoryPickedByCurrentUser={isStoryPickedByCurrentUser}
                  followingMemberIds={followingMemberIds}
                />
              )
            })}
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
  variables: GetUserFollowingRequest
): Promise<GetUserFollowingResponse['member'] | null> {
  try {
    const { data, errors: gqlErrors } = await getClient().query<
      GetUserFollowingResponse,
      GetUserFollowingRequest
    >({
      query: GET_USER_FOLLOWING,
      variables: variables,
    })

    if (gqlErrors && gqlErrors.length > 0) {
      throw new Error(`[GraphQL error]: ${gqlErrors[0].message}`)
    }
    return data.member
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        JSON.stringify({
          severity: 'ERROR',
          message: `fetchUserFollowing failed: ${error.message}`,
          stack: error.stack || 'No stack available',
        })
      )
    } else {
      console.error(
        JSON.stringify({
          severity: 'ERROR',
          message: 'fetchUserFollowing failed: Unknown error',
          stack: 'No stack available',
        })
      )
    }
    return null
  }
}

function retrieveStoriesFromFollowingMemberActions(
  followingMember: Following[],
  maxFeeds: number
) {
  const storiesFromFollowingMemberActions = followingMember.flatMap(
    (member) => [...member.pick, ...member.comment]
  )

  const uniqueStoriesFromFollowingMemberActions = new Map<
    string,
    Following['pick'][number] | Following['comment'][number]
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
