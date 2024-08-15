'use server'

import { GetMemberFollowingDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import { processMostFollowedMembers } from './get-most-followed-member'

export default async function getMemberFollowings(
  memberId: string,
  feeds: number,
  suggest: number
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await fetchGraphQL(
    GetMemberFollowingDocument,
    {
      memberId,
      takes: feeds,
    },
    globalLogFields,
    'Failed to get members followings'
  )
  const member = data?.member
  const firstLayerFollowing = data?.member?.following ?? []
  const hasFollowing = firstLayerFollowing.length > 0

  const storiesByActions =
    firstLayerFollowing.flatMap((member) => {
      const picks = member.pick ?? []
      const comments = member.comment ?? []
      return [...picks, ...comments]
    }) ?? []
  const uniqueStoriesMap = new Map<string, typeof storiesByActions[number]>()
  storiesByActions.forEach((actions) => {
    if (actions.story && !uniqueStoriesMap.has(actions.story.id)) {
      uniqueStoriesMap.set(actions.story.id, actions)
    }
  })

  // TODO: load more
  const uniqueStoriesSortByActionTime = Array.from(
    uniqueStoriesMap.values()
  ).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const selectNestedFollowing = (data: typeof firstLayerFollowing) => {
    return data[0].following ?? []
  }
  type NestedFollowing = ReturnType<typeof selectNestedFollowing>
  const firstLayerFollowingIds = new Set<string>()
  firstLayerFollowing.forEach((member) => {
    if (!firstLayerFollowingIds.has(member.id)) {
      firstLayerFollowingIds.add(member.id)
    }
  })
  const uniqueNestedFollowMembersMap = new Map<
    string,
    NestedFollowing[number]
  >()

  type NestedToFirstLayer = {
    id: string
    customId: string
    name: string
    avatar: string
  } | null
  const nestedToFirstLayerMap = new Map<string, NestedToFirstLayer>()

  firstLayerFollowing.forEach((member) => {
    member.following?.forEach((nestedMember) => {
      if (
        !firstLayerFollowingIds.has(nestedMember.id) &&
        !uniqueNestedFollowMembersMap.has(nestedMember.id)
      ) {
        uniqueNestedFollowMembersMap.set(nestedMember.id, nestedMember)
        nestedToFirstLayerMap.set(nestedMember.id, {
          id: member.id,
          customId: member.customId ?? '',
          name: member.name ?? '',
          avatar: member.avatar ?? '',
        })
      }
    })
  })

  type SuggestFollowing = NestedFollowing[number] & {
    followedBy: NestedToFirstLayer
  }
  let suggestFollowing: SuggestFollowing[] = []

  const nestedFollowedMember = Array.from(
    uniqueNestedFollowMembersMap.values()
  ).map((member) => {
    const followedBy = nestedToFirstLayerMap.get(member.id) || null
    return {
      ...member,
      followedBy,
    }
  })

  if (uniqueNestedFollowMembersMap.size < suggest) {
    const filterIds = new Set([
      ...Array.from(firstLayerFollowingIds),
      ...Array.from(uniqueNestedFollowMembersMap.keys()),
    ])

    const mostFollowedMembers = await processMostFollowedMembers(filterIds)
    suggestFollowing = [...nestedFollowedMember, ...mostFollowedMembers].slice(
      0,
      suggest
    )
  } else {
    suggestFollowing = nestedFollowedMember
  }

  return {
    member,
    hasFollowing,
    firstLayerFollowingIds,
    storiesFromFollowingMemberActions: uniqueStoriesSortByActionTime.slice(
      0,
      feeds
    ),
    suggestFollowing,
  }
}
