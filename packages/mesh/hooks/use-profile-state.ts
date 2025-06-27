import { useCallback, useEffect, useState } from 'react'

import { getMemberProfile, getVisitorProfile } from '@/app/actions/get-profile'
import { useUser } from '@/context/user'
import { PickObjective } from '@/types/objective'
import type { ProfileTypes } from '@/types/profile'
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage'

type ProfileConfigType = {
  customId: string
  takesCount: number
}

const USER_PROFILE_CACHE_KEY_PREFIX = 'userProfile-'

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
    const cacheKey = `${USER_PROFILE_CACHE_KEY_PREFIX}${customId}`
    const cachedData = getLocalStorage(cacheKey, null)

    if (cachedData) {
      setProfileData({ ...initialProfileState, ...user, ...cachedData })
      // setIsLoading(false); // Decide if needed here or rely on finally
    }

    try {
      const memberProfileResult = await getMemberProfile(customId, takesCount)
      if (!memberProfileResult) {
        throw new Error('Failed to fetch member profile')
      }
      setLocalStorage(cacheKey, memberProfileResult)
      setProfileData({ ...user, ...memberProfileResult })
    } catch (error) {
      // If fetching fresh data fails, and we had cached data,
      // we might want to ensure the UI isn't stuck in a loading state
      // or revert to cached data if not already set.
      // For now, we'll let the main error handling take over.
      if (!cachedData) {
        // Only throw if there's no cache, otherwise we've already set profile data
        throw error
      }
      console.error(
        'Failed to fetch fresh profile, using cached data if available',
        error
      )
    }
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
