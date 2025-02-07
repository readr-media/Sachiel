import type Bowser from 'bowser'

export type UserPayload = {
  logInStatus: boolean
  memberId: string
  email: string
  firebaseId: string
}

export type EventType =
  | 'pageview'
  | 'scroll-to-50%'
  | 'scroll-to-80%'
  | 'exit'
  | 'click'
  | 'interaction'
  | 'payment'

export type InteractionInfo = {
  type: 'share' | 'pick' | 'collection' | 'bookmark'
  storyId: string | null
  storyTitle: string | null
  sharePlatform: string | null
}

export type ClickType =
  | 'click-story'
  | 'click-related-story'
  | 'click-collection'
  | 'click-social'
  | 'click-category'

export type ClickTarget = 'story' | 'collection' | 'category'

export type Complementary = {
  publisherTarget: 'publisher' | 'member'
  targetId: string
  targetName: string
  feedAction?: string
  feedOwnerId?: string[]
}

export type PageType =
  | 'homepage'
  | 'subpage'
  | 'mediaPage'
  | 'profile'
  | 'socialPage'
  | 'storyPage'

type ClickEvent = {
  type: ClickType
  target: ClickTarget
  targetId: string
  targetTitle: string
  source: PageType | string
  complementary:
    | (Omit<Complementary, 'feedAction' | 'feedOwnerId'> & {
        feedAction: string | null
        feedOwnerId: string[] | null
      })
    | null
}

type GeneralEvent = {
  type: 'pageview' | 'exit' | 'scroll-to-50%' | 'scroll-to-80%'
  source: string
  complementary: {
    target: string
    targetId: string
  } | null
}

export type BaseLogInfo = {
  ip: string
  logInStatus: boolean
  memberId: string
  email: string
  firebaseId: string
  device: { name: string; version: string }
  browser: Bowser.Parser.Details
  isInAppBrowser: boolean
  screenSize: { width: number; height: number }
  datetime: string
} | null

export type UserBehaviorLogInfo =
  | (BaseLogInfo & GeneralEvent)
  | (BaseLogInfo & ClickEvent)

export const clickTypeMap = {
  media: 'click-story',
  story: 'click-related-story',
} as const
