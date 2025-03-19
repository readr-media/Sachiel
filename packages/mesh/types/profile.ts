import type { ChangeEvent, RefObject } from 'react'

import type {
  GetMemberProfileQuery,
  Story,
} from '@/graphql/__generated__/graphql'

// 1. Base constants and their types
export const TabKey = {
  PICK: 'TabKey-pick',
  FOLLOWER: 'TabKey-follower',
  FOLLOWING: 'TabKey-following',
  SPONSORED: 'TabKey-sponsored',
} as const

export type TabKeyType = typeof TabKey[keyof typeof TabKey]

export const TabCategory = {
  PICKS: 'PICKS',
  BOOKMARKS: 'BOOKMARKS',
  PUBLISH: 'PUBLISH',
  COLLECTIONS: 'COLLECTIONS',
} as const

export type TabCategoryType = typeof TabCategory[keyof typeof TabCategory]

// 2. Basic literal types
export type ProfileFormField = 'name' | 'customId' | 'intro' | 'avatar'
export type UserType = 'member' | 'visitor' | 'publisher'

// 3. Base types from external sources
export type Member = NonNullable<GetMemberProfileQuery['member']>
export type Collections = NonNullable<GetMemberProfileQuery['collections']>
export type PickList = NonNullable<Member['picks']>
export type Bookmarks = NonNullable<Member['books']>
export type Publishers = NonNullable<Member['publishers']>

// 4. Derived types that depend on base types
export type PickListItem = NonNullable<PickList[number]['story']>
export type BookmarkItem = PickListItem
export type CollectionItem = Collections[number]
export type PickCollections = PickList[number]['collection'][]
export type StoryData = NonNullable<Story>[]
export type StoryDataItem = StoryData[number]

// 5. Types that depend on PickListItem
export type CommentList = NonNullable<PickListItem['comment']>
export type CommentType = CommentList[number]

// 6. Form related types
export type FormErrors = Partial<Record<ProfileFormField, string>>

// 7. Base interfaces without complex dependencies
export interface TabItem {
  tabName: string
  count?: number | string
  redirectLink?: string
}

export interface EditProfileFormTypes {
  name: string
  customId: string
  intro: string
  avatar: string
}

// 8. Complex interfaces that depend on other types
export interface ProfileTypes {
  name: string
  avatar: string
  intro: string
  pickCount: number
  followingCount: number
  followerCount: number
  picksData: PickList
  bookmarks?: Bookmarks
  customId: string
  memberId: string
  collections: Collections
  pickCollections: PickList
  publishers?: Publishers
}

export interface EditProfileContextType {
  editProfileForm: EditProfileFormTypes
  profileData: ProfileTypes
  isFormValid: boolean
  errors: FormErrors
  isProfileLoading: boolean
  formRef: RefObject<HTMLFormElement> | null
  isSubmitting: boolean
  isProfileError: boolean

  updateErrors: (field: ProfileFormField, errorMessage: string) => void
  updateField: (field: ProfileFormField, value: string) => void
  handleSubmit: () => Promise<void>
  initializeProfileData: () => void
  handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void
  clearFormInput: (field: Exclude<ProfileFormField, 'avatar'>) => void
  handleDeletePhoto: (avatarImageId?: string) => void
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}
