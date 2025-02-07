import type {
  ClickTarget,
  ClickType,
  Complementary,
  UserBehaviorLogInfo,
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
    const info: UserBehaviorLogInfo = {
      type,
      ...basicInfo,
      ...eventInfo,
      ...createClickComplementary(eventInfo.complementary),
    }
    sendUserBehaviorLog(info)
  }
}
