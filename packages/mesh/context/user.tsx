'use client'

import {
  type Dispatch,
  createContext,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import { type GetCurrentUserMemberIdQuery } from '@/graphql/__generated__/graphql'

type Member = NonNullable<NonNullable<GetCurrentUserMemberIdQuery>['member']>
type FollowingMembers = NonNullable<Member['followingMembers']>
type Picks = NonNullable<Member['picks']>
type FollowingCategories = NonNullable<Member['followingCategories']>
type FollowingPublishers = NonNullable<Member['followingPublishers']>

export type User =
  | {
      memberId: string
      customId: string
      name: string
      avatar: string
      wallet: string
      followingMembers: FollowingMembers
      picks: Picks
      followingCategories: FollowingCategories
      followingPublishers: FollowingPublishers
      idToken: string
    }
  | undefined

type UserContextType = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  const [currentUser, setCurrentUser] = useState<User>(user)

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
