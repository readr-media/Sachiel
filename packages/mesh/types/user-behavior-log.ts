import type Bowser from 'bowser'

import type { SharePlatform } from '@/components/share-sheet'

export type UserPayload = {
  memberType: string
  email: string
  firebaseId: string
}

export type ShareData = {
  shareActions: {
    storyId: string
    storyTitle: string
    sharePlatform: SharePlatform
  }
}

export type PageInfo = {
  referrer: string
  pageUrl: string
  pageName: string
  storyId: string
  collectionId: string
}

type StoryInteraction = {
  interaction:
    | {
        relatedStories: {
          relatedStoryId: string
          relatedTitle: string
        }
        story?: undefined
      }
    | {
        story: {
          storyId: string
          storyTitle: string
        }
        relatedStories?: undefined
      }
}

type ShareInteraction = {
  interaction: {
    shareActions: {
      storyId: string
      storyTitle: string
      sharePlatform: SharePlatform
    }
  }
}

type CategoryInteraction = {
  interaction: {
    categories: {
      categoryName: string
    }
  }
}

type PickInteraction = {
  interaction: {
    pick: {
      storyId: string
    }
  }
}

type BookmarkInteraction = {
  interaction: {
    bookmark: {
      storyId: string
    }
  }
}

type CollectionInteraction = {
  interaction: {
    collection: {
      storyId: string
    }
  }
}

type UserActivityInteraction = {
  userActivity: {
    activityType: string
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

export type BaseLog = {
  triggerEvent: {
    'event-type': string
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
  | (BaseLog & PickInteraction)
  | (BaseLog & BookmarkInteraction)
  | (BaseLog & CollectionInteraction)
  | (BaseLog & UserActivityInteraction)
  | (BaseLog & MediaInteraction)
