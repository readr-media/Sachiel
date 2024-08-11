'use client'

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import { type GetCurrentUserMemberIdQuery } from '@/graphql/__generated__/graphql'

type Member = NonNullable<NonNullable<GetCurrentUserMemberIdQuery>['member']>
type FollowingCategories = NonNullable<Member['followingCategories']>
type FollowingPublishers = NonNullable<Member['followingPublishers']>

export type User = {
  memberId: string
  customId: string
  name: string
  avatar: string
  wallet: string
  followingMemberIds: Set<string>
  pickStoryIds: Set<string>
  followingCategories: FollowingCategories
  followingPublishers: FollowingPublishers
  idToken: string
}

type UserContextType = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const guest: User = {
  memberId: '',
  customId: '',
  name: '',
  avatar: '',
  wallet: '',
  followingMemberIds: new Set(),
  pickStoryIds: new Set(),
  followingCategories: [],
  followingPublishers: [],
  idToken: '',
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
