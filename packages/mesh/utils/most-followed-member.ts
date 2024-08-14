import { STATIC_FILE_ENDPOINTS } from '@/constants/config'

import fetchStatic from './fetch-static'

type MostFollowedMembers = {
  id: number
  followerCount: number
  name: string
  avatar: string
}

export async function processMostFollowedMembers(filterData?: Set<string>) {
  const mostFollowersData =
    (await fetchStatic<MostFollowedMembers[]>(
      STATIC_FILE_ENDPOINTS.mostFollowers,
      {
        next: { revalidate: 10 },
      }
    )) ?? []

  const transformMemberData = (member: MostFollowedMembers) => ({
    id: member.id.toString(),
    name: member.name,
    avatar: member.avatar,
    followerCount: member.followerCount,
    followedBy: null,
  })

  if (filterData?.size) {
    return mostFollowersData
      .filter((member) => !filterData.has(member.id.toString()))
      .map(transformMemberData)
  }

  return mostFollowersData.map(transformMemberData)
}
