import { useCallback, useEffect, useState } from 'react'

import { getMemberProfile, getVisitorProfile } from '@/app/actions/get-profile'
import { useUser } from '@/context/user'
import { PickObjective } from '@/types/objective'
import type { ProfileTypes } from '@/types/profile'

type ProfileConfigType = {
  customId: string
  takesCount: number
}

const initialProfileState: ProfileTypes = {
  name: '',
  avatar: '',
  intro: '',
  pickCount: 0,
  followingCount: 0,
  followerCount: 0,
  picksData: [],
  bookmarks: [],
  memberId: '',
  customId: '',
  collections: [],
  pickCollections: [],
}

export default function useProfileState({
  customId,
  takesCount,
}: ProfileConfigType) {
  const [profileData, setProfileData] =
    useState<ProfileTypes>(initialProfileState)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { user } = useUser()

  const isCurrentUser = customId === user.customId

  const fetchMemberProfile = useCallback(async () => {
    const memberProfileResult = await getMemberProfile(customId, takesCount)
    if (!memberProfileResult) {
      throw new Error('Failed to fetch member profile')
    }
    setProfileData({ ...user, ...memberProfileResult })
  }, [customId, takesCount, user])

  const fetchVisitorProfile = useCallback(async () => {
    const visitorProfileResult = await getVisitorProfile(customId, takesCount)
    if (!visitorProfileResult?.member) {
      throw new Error('Failed to fetch visitor profile')
    }
    const visitorProfileData = visitorProfileResult.member
    setProfileData({
      name: visitorProfileData.name || '',
      avatar: visitorProfileData.avatar || '',
      intro: visitorProfileData.intro || '',
      customId: visitorProfileData.customId || '',
      memberId: visitorProfileData.id,
      pickCount: visitorProfileData.picksCount || 0,
      followingCount: visitorProfileData.followingCount || 0,
      followerCount: visitorProfileData.followerCount || 0,
      picksData: visitorProfileData.picks ?? [],
      bookmarks: [], // Assuming visitor doesn't have access to bookmarks
      collections: visitorProfileResult.collections ?? [],
      pickCollections:
        visitorProfileData.picks?.filter(
          (item) => item.objective === PickObjective.Collection
        ) ?? [],
    })
  }, [customId, takesCount])

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        if (isCurrentUser) {
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
  }, [isCurrentUser, fetchMemberProfile, fetchVisitorProfile])

  return { profileData, isLoading, isError }
}
