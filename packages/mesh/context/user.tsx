'use client'

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import type { GetMemberProfileQuery } from '@/graphql/__generated__/graphql'
import { type GetCurrentUserMemberIdQuery } from '@/graphql/__generated__/graphql'
import type { ProfileTypes } from '@/types/profile'

type Member = NonNullable<NonNullable<GetCurrentUserMemberIdQuery>['member']>
type Collections = NonNullable<
  NonNullable<GetMemberProfileQuery>['collections']
>
type FollowingCategories = NonNullable<Member['followingCategories']>
type FollowingPublishers = NonNullable<Member['followingPublishers']>

export type User = {
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
}

type UserContextType = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const guest: User = {
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
}

export function UserProvider({
  user,
  children,
}: {
  user: User | undefined
  children: React.ReactNode
}) {
  const [currentUser, setCurrentUser] = useState<User>(user ?? guest)

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
