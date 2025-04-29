'use client'

import { usePathname } from 'next/navigation'
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  getAccessToken,
  getCurrentUser,
  validateIdToken,
} from '@/app/actions/auth'
import { auth } from '@/firebase/client'
import type { GetMemberProfileQuery } from '@/graphql/__generated__/graphql'
import {
  type GetCurrentUserMemberIdQuery,
  MemberLanguageType,
} from '@/graphql/__generated__/graphql'
import type { ProfileTypes } from '@/types/profile'

type Member = NonNullable<NonNullable<GetCurrentUserMemberIdQuery>['member']>
type Collections = NonNullable<
  NonNullable<GetMemberProfileQuery>['collections']
>
type FollowingCategories = NonNullable<Member['followingCategories']>
type FollowingPublishers = NonNullable<Member['followingPublishers']>

export type User = {
  accessToken: string
  memberId: string
  customId: string
  firebaseId: string
  name: string
  email: string
  avatar: string
  avatarImageId: string
  wallet: string
  followingMemberIds: Set<string>
  pickStoryIds: Set<string>
  pickCollectionIds: Set<string>
  bookmarkStoryIds: Set<string>
  bookmarkCollectionIds: Set<string>
  followingCategories: FollowingCategories
  followingPublishers: FollowingPublishers
  intro: string
  pickCount?: number
  followerCount?: number
  followingCount?: number
  picksData?: ProfileTypes['picksData']
  bookmarks?: ProfileTypes['bookmarks']
  collections?: Collections
  pickCollections?: ProfileTypes['picksData']
  publishers?: ProfileTypes['publishers']
  language: MemberLanguageType
}

type UserContextType = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const guest: User = {
  accessToken: '',
  memberId: '',
  avatarImageId: '',
  customId: '',
  firebaseId: '',
  name: '',
  email: '',
  avatar: '',
  wallet: '',
  followingMemberIds: new Set(),
  pickStoryIds: new Set(),
  pickCollectionIds: new Set(),
  bookmarkStoryIds: new Set(),
  bookmarkCollectionIds: new Set(),
  followingCategories: [],
  followingPublishers: [],
  intro: '',
  pickCount: 0,
  followerCount: 0,
  followingCount: 0,
  picksData: [],
  bookmarks: [],
  language: MemberLanguageType.ZhTw,
}

export function UserProvider({
  user,
  children,
}: {
  user: User | undefined
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<User>(user ?? guest)

  useEffect(() => {
    if (currentUser.memberId || pathname === '/login') return

    let unsubscribe: (() => void) | null = null

    const getUser = async () => {
      // Try1: get user if accessToken exist in cookie
      const user = await getCurrentUser()
      if (user) {
        setCurrentUser(user)
      } else {
        // Try2: get accessToken again to get user if possible
        unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
          if (!firebaseUser) return

          try {
            const idTokenResult = await firebaseUser.getIdTokenResult()
            const idToken = idTokenResult.token
            const { status } = await validateIdToken(idToken)
            if (status === 'verified') {
              await getAccessToken(idToken)
              const user = await getCurrentUser()
              user && setCurrentUser(user)
            }
          } catch (error) {
            console.error('error revalidate firebase idToken', error)

            if (
              error instanceof Error &&
              'code' in error &&
              error.code === 'auth/user-token-expired'
            ) {
              auth.signOut()
            }
          }
        })
      }
    }

    getUser()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [currentUser, pathname])

  return (
    <UserContext.Provider
      value={{ user: currentUser, setUser: setCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('UserProvider Error')
  }
  return context
}

export function isUserLoggedIn(user: User) {
  return !!user.memberId
}
