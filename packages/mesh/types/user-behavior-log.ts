import type Bowser from 'bowser'

import type { SharePlatform } from '@/components/share-sheet'

export type UserPayload = {
  memberType: string
  email: string
  firebaseId: string
}

export type ShareData = {
  shareAction: {
    storyId: string
    storyTitle: string
    sharePlatform: SharePlatform
  }
}

export type PageInfo = {
  referrer: string
  pageUrl: string
  pageName: string
}

export type EventType =
  | 'pageview'
  | 'scroll-to-50%'
  | 'scroll-to-80%'
  | 'exit'
  | 'storyClick'
  | 'categoryClick'
  | 'socialFeedClick'
  | 'collectionClick'
  | 'storyAction'
  | 'share'
  | 'videoPlay'
  | 'sponsor'
  | 'unlock'

type StoryInteraction = {
  interaction: {
    story: {
      type: 'relatedStory' | 'story'
      storyId: string
      storyTitle: string
      publisherName: string
      publisherId: string
    }
  }
}

type ShareInteraction = {
  interaction: {
    shareAction: {
      storyId: string
      storyTitle: string
      sharePlatform: SharePlatform
    }
  }
}

type CategoryInteraction = {
  interaction: {
    category: {
      categoryName: string
    }
  }
}

type StoryAction = {
  interaction: {
    type: 'pick' | 'collection' | 'bookmark'
    storyId: string
  }
}

type UserActivityInteraction = {
  userActivity: {
    activityType: 'pick' | 'pick-comment' | 'comment' | undefined
    userId: string[]
  }
}

type MediaInteraction = {
  interaction: {
    media: {
      videoPlay: boolean
    }
  }
}

type SponsorInteraction = {
  interaction: {
    sponsorAction: {
      sponsorName: string
      sponsorId: string
    }
  }
}

type UnlockInteraction = {
  interaction: {
    unlock: {
      storyId: string
    }
  }
}

type CollectionInteraction = {
  interaction: {
    collectionInfo: {
      collectionTitle: string
    }
  }
}

export type BaseLog = {
  triggerEvent: {
    eventType: EventType
    datetime: string
  }
  clientInfo: {
    ip: string
    userInfo: UserPayload
    device: { name: string; version: string }
    browser: Bowser.Parser.Details
    isInApBrowser: boolean
    screenSize: { width: number; height: number }
  }
  pageInfo: PageInfo
} | null

export type UserBehaviorLogInfo =
  | BaseLog
  | (BaseLog & StoryInteraction)
  | (BaseLog & ShareInteraction)
  | (BaseLog & CategoryInteraction)
  | (BaseLog & StoryAction)
  | (BaseLog & UserActivityInteraction)
  | (BaseLog & MediaInteraction)
  | (BaseLog & SponsorInteraction)
  | (BaseLog & UnlockInteraction)
  | (BaseLog & CollectionInteraction)
