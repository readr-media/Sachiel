import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import {
  type GetMemberFollowingQuery,
  GetMemberFollowingDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import fetchData from '@/utils/fetch-statics'

import Feed from '../_components/feed'
import FollowSuggestionFeed from '../_components/follow-suggestion-feed'
import FollowSuggestionWidget from '../_components/follow-suggestion-widget'

export const revalidate = 60

export default async function Page({ params }: { params: { id: string } }) {
  const userId = params.id
  const feedsNumber = 20
  const firstSectionAmount = 3
  const suggestedFollowersNumber = 5

  const data = await fetchGraphQL(GetMemberFollowingDocument, {
    memberId: userId,
    takes: feedsNumber,
  })
  const currentMember = data?.member
  const currentMemberFollowings = selectCurrentMemberFollowings(currentMember)

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

  if (!currentMemberFollowings || currentMemberFollowings.length === 0) {
    return (
      <main>
        <div className="flex justify-center py-5 px-10">
          <div className="flex flex-col gap-4">
            <p>咦？這裡好像還缺點什麼...</p>
          </div>
        </div>
      </main>
    )
  }

  const currentMemberFollowingMemberIds = new Set(
    currentMemberFollowings.map((element) => element.id)
  )

  const storiesFromFollowingMemberActions =
    processStoriesFromFollowingMemberActions(
      currentMemberFollowings,
      feedsNumber
    )

  const firstSectionStories = storiesFromFollowingMemberActions.slice(
    0,
    firstSectionAmount
  )
  const secondSectionStories =
    storiesFromFollowingMemberActions.slice(firstSectionAmount)

  const mostFollowedMembersByFollowings =
    processMostFollowedMembersByFollowings(
      userId,
      currentMemberFollowings,
      currentMemberFollowingMemberIds,
      suggestedFollowersNumber
    )
  const suggestedFollowers = await processSuggestedFollowers(
    mostFollowedMembersByFollowings,
    suggestedFollowersNumber
  )

  return (
    <main>
      <div className="flex justify-center gap-10 py-5 px-10">
        <div className="flex flex-col gap-4">
          {firstSectionStories.map((item) => {
            const isStoryPickedByCurrentMember = currentMember.pick?.some(
              (pick) => pick.story?.id === item.id
            )
            return (
              <Feed
                key={item.id}
                story={item.story ?? { id: '' }}
                isStoryPickedByCurrentMember={
                  isStoryPickedByCurrentMember ?? false
                }
                followingMemberIds={currentMemberFollowingMemberIds}
              />
            )
          })}
          <FollowSuggestionFeed suggestedFollowers={suggestedFollowers} />
          {secondSectionStories.map((item) => {
            const isStoryPickedByCurrentMember = currentMember.pick?.some(
              (pick) => pick.story?.id === item.story?.id
            )
            return (
              <Feed
                key={item.id}
                story={item.story ?? { id: '' }}
                isStoryPickedByCurrentMember={
                  isStoryPickedByCurrentMember ?? false
                }
                followingMemberIds={currentMemberFollowingMemberIds}
              />
            )
          })}
        </div>
        <FollowSuggestionWidget suggestedFollowers={suggestedFollowers} />
      </div>
    </main>
  )
}

const selectCurrentMemberFollowings = (
  data: GetMemberFollowingQuery['member']
) => data?.following ?? []

type CurrentMemberFollowing = ReturnType<typeof selectCurrentMemberFollowings>

const selectFollowedMembersByFollowings = (data: CurrentMemberFollowing) => {
  return data[0].following ?? []
}

type FollowedMembersByFollowings = ReturnType<
  typeof selectFollowedMembersByFollowings
>
export type SuggestedFollowers = FollowedMembersByFollowings[number] & {
  currentMemberFollowingMember: string
  isFollow: boolean
}

type MostFollowedMembers = {
  id: number
  followerCount: number
  name: string
  nickname: string
  avatar: string
}

function processStoriesFromFollowingMemberActions(
  followingMember: CurrentMemberFollowing,
  maxFeeds: number
) {
  const storiesFromFollowingMemberActions =
    followingMember.flatMap((member) => {
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

function processMostFollowedMembersByFollowings(
  currentMemberId: string,
  currentMemberFollowing: CurrentMemberFollowing,
  currentMemberFollowingMemberIds: Set<string>,
  take: number
) {
  const mostFollowedMembersByFollowings: SuggestedFollowers[] = []
  const followedMembersByFollowings = currentMemberFollowing.flatMap(
    (member) =>
      member.following?.filter(
        (member) =>
          !currentMemberFollowingMemberIds.has(member.id) &&
          member.id !== currentMemberId
      ) ?? []
  )

  type FollowedMembersByFollowingsMap =
    typeof followedMembersByFollowings[number] & {
      followCountByFollowings: number
    }
  const followedMembersByFollowingsMap = followedMembersByFollowings.reduce(
    (map, member) => {
      if (member) {
        const existData = map.get(member.id)
        if (existData) {
          existData.followCountByFollowings += 1
        } else {
          map.set(member.id, { ...member, followCountByFollowings: 1 })
        }
      }
      return map
    },
    new Map<string, FollowedMembersByFollowingsMap>()
  )

  const followedMembersByFollowingsSortByFollowCount = Array.from(
    followedMembersByFollowingsMap.values()
  ).sort((a, b) => b.followCountByFollowings - a.followCountByFollowings)

  for (
    let i = 0;
    i < followedMembersByFollowingsSortByFollowCount.length &&
    mostFollowedMembersByFollowings.length < take;
    i++
  ) {
    const id = followedMembersByFollowingsSortByFollowCount[i].id
    const memberData = followedMembersByFollowingsMap.get(id)

    const followersFromMemberFollowing = currentMemberFollowing.reduce(
      (acc: string[], member) => {
        const matchIndex = member.following?.findIndex((item) => item.id === id)
        if (matchIndex !== undefined && matchIndex !== -1) {
          acc.push(member.name ?? '')
        }
        return acc
      },
      []
    )

    if (memberData && followersFromMemberFollowing) {
      const randomIndex = Math.floor(
        Math.random() * followersFromMemberFollowing.length
      )
      const randomMember = followersFromMemberFollowing[randomIndex]
      mostFollowedMembersByFollowings.push({
        ...memberData,
        currentMemberFollowingMember: randomMember,
        isFollow: false,
      })
    }
  }

  return mostFollowedMembersByFollowings
}

async function processSuggestedFollowers(
  mostFollowedMembersByFollowings: SuggestedFollowers[],
  take: number
) {
  if (mostFollowedMembersByFollowings.length < 5) {
    const mostFollowedMembersByFollowingsIds = new Set(
      mostFollowedMembersByFollowings.map((member) => member.id)
    )
    const mostFollowedMembers =
      (await fetchData<MostFollowedMembers[]>(
        STATIC_FILE_ENDPOINTS.mostFollowers,
        {
          next: { revalidate: 10 },
        }
      )) ?? []

    const transformedData: SuggestedFollowers[] = mostFollowedMembers
      .filter(
        (member) =>
          !mostFollowedMembersByFollowingsIds.has(member.id.toString())
      )
      .map((member) => ({
        id: member.id.toString(),
        name: member.name,
        avatar: member.avatar,
        followerCount: member.followerCount,
        currentMemberFollowingMember: '',
        isFollow: false,
      }))

    return [...mostFollowedMembersByFollowings, ...transformedData].slice(
      0,
      take
    )
  } else {
    return mostFollowedMembersByFollowings
  }
}
