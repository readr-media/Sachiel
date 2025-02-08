import type {
  ClickComplementary,
  ClickTarget,
  ClickType,
  Info,
  UserPayload,
} from '@/types/user-behavior-log'
import { generateUserBehaviorLogInfo } from '@/utils/generate-user-behavior-log-info'
import { sendUserBehaviorLog } from '@/utils/send-user-behavior-log'

function createClickComplementary(info: ClickComplementary | undefined) {
  if (!info) {
    return {
      complementary: null,
    }
  }
  return {
    complementary: {
      feedAction: null,
      feedOwnerId: null,
      ...info,
    },
  }
}

export function logClickEvent(
  userPayload: UserPayload,
  type: ClickType,
  eventInfo: {
    target: ClickTarget
    targetId: string
    targetTitle: string
    source: string
    complementary?: ClickComplementary
  }
) {
  const basicInfo = generateUserBehaviorLogInfo(userPayload)

  if (basicInfo) {
    const info: Info = {
      logCategory: 'click',
      logInfo: {
        type,
        ...basicInfo,
        ...eventInfo,
        ...createClickComplementary(eventInfo.complementary),
      },
    }
    sendUserBehaviorLog(info)
  }
}

export function logSponsorEvent(
  userPayload: UserPayload,
  eventInfo: {
    sponsorId: string
    sponsorName: string
    publisherId: string
    publisherName: string
    point: number
  }
) {
  const basicInfo = generateUserBehaviorLogInfo(userPayload)

  if (basicInfo) {
    const info: Info = {
      logCategory: 'payment',
      logInfo: {
        type: 'sponsor',
        ...basicInfo,
        sponsor: {
          ...eventInfo,
        },
      },
    }
    sendUserBehaviorLog(info)
  }
}

export function logStoryUnlockEvent(
  userPayload: UserPayload,
  eventInfo: {
    policyId: string
    policyName: string
    publisherId: string
    publisherName: string
    storyId: string
  }
) {
  const basicInfo = generateUserBehaviorLogInfo(userPayload)

  if (basicInfo) {
    const info: Info = {
      logCategory: 'payment',
      logInfo: {
        type: 'tx-unlock-single',
        ...basicInfo,
        transaction: {
          ...eventInfo,
        },
      },
    }
    sendUserBehaviorLog(info)
  }
}

export function logStoryInteractionEvent(
  userPayload: UserPayload,
  eventInfo: {
    type: 'pick' | 'bookmark' | 'collection' | 'share'
    storyId: string
    storyTitle: string
    source: string
    complementary?: {
      target: 'collection' | 'platform'
      targetId: string | null
      targetName: string
    }
  }
) {
  const basicInfo = generateUserBehaviorLogInfo(userPayload)

  if (basicInfo) {
    const info: Info = {
      logCategory: 'interaction',
      logInfo: {
        complementary: null,
        ...basicInfo,
        ...eventInfo,
      },
    }
    sendUserBehaviorLog(info)
  }
}
