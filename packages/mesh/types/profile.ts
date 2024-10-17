import type { ChangeEvent, RefObject } from 'react'

import {
  type GetMemberProfileQuery,
  type Story,
} from '@/graphql/__generated__/graphql'

export enum TabKey {
  PICK = '精選',
  FOLLOWER = '粉絲',
  FOLLOWING = '追蹤中',
  SPONSORED = '本月獲得贊助',
}

export type TabItem = {
  tabName: TabKey
  count?: number | string
  redirectLink?: string
}
export enum TabCategory {
  PICK = 'PICKS',
  BOOKMARKS = 'BOOKMARKS',
  PUBLISH = 'PUBLISH',
}

export type EditProfileFormTypes = {
  name: string
  customId: string
  intro: string
  avatar: string
}

export type ProfileTypes = {
  name: string
  avatar: string
  intro: string
  pickCount: number
  followingCount: string
  followerCount: string
  picksData: PickList
  bookmarks?: Bookmarks
  customId: string
  memberId: string
}

export type Member = GetMemberProfileQuery['member']
export type PickList = NonNullable<Member>['picks']
export type Bookmarks = NonNullable<GetMemberProfileQuery['member']>['books']
export type StoryData = Story[]
export type StoryDataItem = NonNullable<NonNullable<StoryData>[number]>
export type PickListItem = NonNullable<PickList>[number]['story']
export type UserType = 'member' | 'visitor' | 'publisher'
export type CommentList = NonNullable<PickListItem>['comment']
export type CommentType = NonNullable<CommentList>[number]

export type EditProfileContextType = {
  editProfileForm: EditProfileFormTypes
  visitorProfile: ProfileTypes
  isFormValid: boolean
  errors: Partial<EditProfileFormTypes>
  isProfileLoading: boolean
  formRef: null | RefObject<HTMLFormElement>
  isSubmitting: boolean
  updateErrors: (
    key: 'name' | 'customId' | 'intro' | 'avatar',
    errorMessage: string
  ) => void
  updateField: (field: keyof EditProfileFormTypes, value: string) => void
  handleSubmit: () => void
  initializeProfileData: () => void
  handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void
  clearFormInput: (key: 'name' | 'customId' | 'intro') => void
  handleDeletePhoto: (avatarImageId?: string) => void
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  isProfileError: boolean
}
