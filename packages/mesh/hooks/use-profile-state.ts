import { useCallback, useEffect, useState } from 'react'

import { getMemberProfile, getVisitorProfile } from '@/app/actions/get-profile'
import { useUser } from '@/context/user'
import type { ProfileTypes } from '@/types/profile'
import { formatFollowCount } from '@/utils/format-follow-count'

type ProfileConfigType = {
  memberId: string
  takesCount: number
}

const initialProfileState: ProfileTypes = {
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
}

export default function useProfileState({
  memberId,
  takesCount,
}: ProfileConfigType) {
  const [visitorProfile, setVisitorProfile] =
    useState<ProfileTypes>(initialProfileState)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { user, setUser } = useUser()

  const isMember = memberId === user.customId

  const fetchMemberProfile = useCallback(async () => {
    const memberProfileResult = await getMemberProfile(memberId, takesCount)
    if (!memberProfileResult) {
      throw new Error('Failed to fetch member profile')
    }
    setUser((prev) => ({ ...prev, ...memberProfileResult }))
  }, [memberId, takesCount, setUser])

  const fetchVisitorProfile = useCallback(async () => {
    const visitorProfileResult = await getVisitorProfile(memberId, takesCount)
    if (!visitorProfileResult?.member) {
      throw new Error('Failed to fetch visitor profile')
    }
    const visitorProfileData = visitorProfileResult.member
    setVisitorProfile({
      name: visitorProfileData.name || '',
      avatar: visitorProfileData.avatar || '',
      intro: visitorProfileData.intro || '',
      customId: visitorProfileData.customId || '',
      memberId: visitorProfileData.id,
      pickCount: visitorProfileData.picksCount || 0,
      followingCount: formatFollowCount(visitorProfileData.followingCount || 0),
      followerCount: formatFollowCount(visitorProfileData.followerCount || 0),
      picksData: visitorProfileData.picks,
      bookmarks: [], // Assuming visitor doesn't have access to bookmarks
    })
  }, [memberId, takesCount])

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        if (isMember) {
          await fetchMemberProfile()
        } else {
          await fetchVisitorProfile()
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [isMember, fetchMemberProfile, fetchVisitorProfile])

  return { visitorProfile, isLoading, isError }
}
