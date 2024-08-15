import { useEffect, useState } from 'react'

import { getCurrentUser } from '@/app/actions/auth'
import { getMemberProfile, getVisitorProfile } from '@/app/actions/get-profile'
import type { ProfileTypes } from '@/types/profile'
import { formatFollowCount } from '@/utils/format-follow-count'

type ProfileConfigType = {
  memberId: string
  takesCount: number
}

export default function useProfileState(profileConfig: ProfileConfigType) {
  // states go here
  const [profile, setProfile] = useState<ProfileTypes>({
    name: '',
    avatar: '',
    intro: '',
    pickCount: 0,
    followingCount: '',
    followerCount: '',
    userType: 'member',
    picksData: [],
    bookmarks: [],
    memberId: '',
    memberCustomId: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const profileState = async () => {
      setIsLoading(true)
      const currentUser = await getCurrentUser()
      if (profileConfig.memberId === currentUser?.customId) {
        const memberProfileResult = await getMemberProfile(
          profileConfig.memberId,
          profileConfig.takesCount
        )
        const memberProfileData = memberProfileResult?.member
        if (!memberProfileData) return
        setProfile({
          name: currentUser.name || '',
          avatar: currentUser.avatar || '',
          intro: currentUser.intro || '',
          memberCustomId: currentUser.customId,
          // above is from global shared states
          memberId: memberProfileData.id,
          pickCount: memberProfileData.picksCount || 0,
          followingCount: formatFollowCount(
            memberProfileData.followingCount || 0
          ),
          followerCount: formatFollowCount(
            memberProfileData.followerCount || 0
          ),
          // userType let outside decided
          userType: 'member',
          picksData: memberProfileData.picks,
          bookmarks: memberProfileData.books,
        })
        setIsLoading(false)
      } else {
        const visitorProfileResult = await getVisitorProfile(
          profileConfig.memberId,
          profileConfig.takesCount
        )

        const visitorProfileData = visitorProfileResult?.member
        if (!visitorProfileData) return
        setProfile({
          name: visitorProfileData.name || '',
          avatar: visitorProfileData.avatar || '',
          intro: visitorProfileData.intro || '',
          memberCustomId: visitorProfileData.customId || '',
          memberId: visitorProfileData.id,
          pickCount: visitorProfileData.picksCount || 0,
          followingCount: formatFollowCount(
            visitorProfileData.followingCount || 0
          ),
          followerCount: formatFollowCount(
            visitorProfileData.followerCount || 0
          ),
          userType: 'visitor',
          picksData: visitorProfileData.picks,
        })
        setIsLoading(false)
      }
    }
    profileState()
  }, [profile.memberCustomId, profileConfig.memberId, profileConfig.takesCount])
  return { profile, setProfile, isLoading }
}
