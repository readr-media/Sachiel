import { getClient } from '@/apollo'
import Feed from '@/app/social/_components/feed'
import {
  type Following,
  type GetUserFollowingRequest,
  type GetUserFollowingResponse,
  GET_USER_FOLLOWING,
} from '@/graphql/query/member'

import FollowSuggestionFeed from './_components/follow-suggestion-feed'
import FollowSuggestionWidget from './_components/follow-suggestion-widget'

export const revalidate = 60

export type CommonFollowingMembers = Following['following'][number] & {
  followedByFollowings: string
  isFollow: boolean
}

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

  const mostFollowedMembers = await getMostFollowedMembers()

  const commonFollowingMembers = processCommonFollowingMembers(
    currentUser.following,
    followingMemberIds,
    5
  )
  const recommendFollowers = processRecommendFollower(
    commonFollowingMembers,
    mostFollowedMembers
  )

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
            <FollowSuggestionFeed suggestedFollowers={recommendFollowers} />
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
          <FollowSuggestionWidget suggestedFollowers={recommendFollowers} />
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

async function getMostFollowedMembers() {
  try {
    const response = await fetch(
      `https://storage.googleapis.com/statics-mesh-tw-dev/data/most_followers.json`,
      {
        next: { revalidate: 10 },
      }
    )
    if (!response.ok) {
      throw new Error(`Fail to fetch: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

function processCommonFollowingMembers(
  currentUserFollowing: Following[],
  followingMemberIds: Set<string>,
  take: number
) {
  const commonFollowingMembers: CommonFollowingMembers[] = []

  const followingsOfFollowings = currentUserFollowing
    .map((member) =>
      member.following.filter((member) => !followingMemberIds.has(member.id))
    )
    .flat()

  const occurrenceOfFollowing = followingsOfFollowings.reduce((map, item) => {
    const count = map.get(item.id) || 0
    map.set(item.id, count + 1)
    return map
  }, new Map<string, number>())

  const commonFollowingList = Array.from(occurrenceOfFollowing.entries()).sort(
    (a, b) => b[1] - a[1]
  )

  for (
    let i = 0;
    i < commonFollowingList.length && commonFollowingMembers.length < take;
    i++
  ) {
    const [commonFollowingId] = commonFollowingList[i]
    const commonFollowingMember = followingsOfFollowings.find(
      (member) => member.id === commonFollowingId
    )
    const followedByFollowings = currentUserFollowing.reduce((acc, member) => {
      const matchIndex = member.following.findIndex(
        (item) => item.id === commonFollowingId
      )
      if (matchIndex > -1) {
        acc.push(member.name)
      }
      return acc
    }, [] as string[])

    if (commonFollowingMember) {
      const randomIndex = Math.floor(
        Math.random() * followedByFollowings.length
      )
      const randomFollowedByFollowings = followedByFollowings[randomIndex]
      commonFollowingMembers.push({
        ...commonFollowingMember,
        followedByFollowings: randomFollowedByFollowings,
        isFollow: false,
      })
    }
  }

  return commonFollowingMembers
}

function processRecommendFollower(
  commonFollowingMembers: CommonFollowingMembers[],
  mostFollowedMembers: unknown[]
) {
  if (commonFollowingMembers.length < 5) {
    const commonIdsSet = new Set<string>()
    const transformedData: CommonFollowingMembers[] = []

    commonFollowingMembers.forEach((member) => commonIdsSet.add(member.id))
    mostFollowedMembers.forEach((member) => {
      const typedMember = member as {
        id: string
        name: string
        avatar: string
        followerCount: number
      }

      if (!commonIdsSet.has(typedMember.id.toString())) {
        transformedData.push({
          id: typedMember.id.toString(),
          name: typedMember.name,
          avatar: typedMember.avatar,
          followerCount: typedMember.followerCount,
          followedByFollowings: '',
          isFollow: false,
        })
      }
    })

    return [...commonFollowingMembers, ...transformedData].slice(0, 5)
  } else {
    return commonFollowingMembers
  }
}
