import type Bowser from 'bowser'

export type UserPayload = {
  logInStatus: boolean
  memberId: string
  email: string
  firebaseId: string
}

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

type ClickEvent = {
  type: ClickType
  target: ClickTarget
  targetId: string
  targetTitle: string
  source: string
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

type SponsorEvent = {
  type: 'sponsor'
  sponsor: {
    sponsorId: string
    sponsorName: string
    publisherId: string
    publisherName: string
    point: number
  }
}

type StoryUnlockEvent = {
  type: 'tx-unlock-single'
  transaction: {
    policyId: string
    policyName: string
    publisherId: string
    publisherName: string
    storyId: string
  }
}

type StoryInteractionEvent = {
  type: string
  storyId: string
  storyTitle: string
  source: string
}

export type LogCategory = 'click' | 'general' | 'payment' | 'interaction'

export type Info = {
  logCategory: LogCategory
  logInfo: UserBehaviorLogInfo
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
  | (BaseLogInfo & SponsorEvent)
  | (BaseLogInfo & StoryUnlockEvent)
  | (BaseLogInfo & StoryInteractionEvent)

export const clickTypeMap = {
  media: 'click-story',
  story: 'click-related-story',
} as const
