export type MemberLanguageType = 'zh-TW' | 'en'

export interface User {
  accessToken: string
  memberId: string
  customId: string
  name: string
  firebaseId: string
  email: string
  avatar: string
  avatarImageId: string
  followingCategories: Array<{
    id: string
    slug: string
    title: string
  }>
  followingPublishers: Array<{
    id: string
    title: string
  }>
  language: MemberLanguageType
} 