import type {
  ClickTarget,
  ClickType,
  Complementary,
  Info,
  UserPayload,
} from '@/types/user-behavior-log'
import { generateUserBehaviorLogInfo } from '@/utils/generate-user-behavior-log-info'
import { sendUserBehaviorLog } from '@/utils/send-user-behavior-log'

function createClickComplementary(info: Complementary | undefined) {
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
    complementary?: Complementary
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
    type: string
    storyId: string
    storyTitle: string
    source: string
  }
) {
  const basicInfo = generateUserBehaviorLogInfo(userPayload)

  if (basicInfo) {
    const info: Info = {
      logCategory: 'interaction',
      logInfo: {
        ...basicInfo,
        ...eventInfo,
      },
    }
    sendUserBehaviorLog(info)
  }
}
