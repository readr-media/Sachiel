import { useEffect, useState } from 'react'

import { getMemberProfile, getVisitorProfile } from '@/app/actions/get-profile'
import { useUser } from '@/context/user'
import type { ProfileTypes } from '@/types/profile'
import { formatFollowCount } from '@/utils/format-follow-count'

type ProfileConfigType = {
  memberId: string
  takesCount: number
}

export default function useProfileState(profileConfig: ProfileConfigType) {
  const [visitorProfile, setVisitorProfile] = useState<ProfileTypes>({
    name: '',
    avatar: '',
    intro: '',
    pickCount: 0,
    followingCount: '',
    followerCount: '',
    picksData: [],
    bookmarks: [],
    memberId: '',
    customId: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { user, setUser } = useUser()
  const isMember = profileConfig.memberId === user.customId
  useEffect(() => {
    const profileState = async () => {
      setIsLoading(true)
      if (isMember) {
        // if is member take visitorProfile data left (data useUser does not have.)
        const memberProfileResult = await getMemberProfile(
          profileConfig.memberId,
          profileConfig.takesCount
        )
        if (!memberProfileResult) return null
        setUser((prev) => ({ ...prev, ...memberProfileResult }))
        setIsLoading(false)
      } else {
        // if is visitor get all the data
        const visitorProfileResult = await getVisitorProfile(
          profileConfig.memberId,
          profileConfig.takesCount
        )
        if (!visitorProfileResult?.member) return null

        const visitorProfileData = visitorProfileResult?.member

        setVisitorProfile({
          name: visitorProfileData.name || '',
          avatar: visitorProfileData.avatar || '',
          intro: visitorProfileData.intro || '',
          customId: visitorProfileData.customId || '',
          memberId: visitorProfileData.id,
          pickCount: visitorProfileData.picksCount || 0,
          followingCount: formatFollowCount(
            visitorProfileData.followingCount || 0
          ),
          followerCount: formatFollowCount(
            visitorProfileData.followerCount || 0
          ),
          picksData: visitorProfileData.picks,
        })
        setIsLoading(false)
      }
    }
    profileState()
  }, [
    visitorProfile.customId,
    profileConfig.memberId,
    profileConfig.takesCount,
    isMember,
    setUser,
  ])
  return { visitorProfile, isLoading }
}
