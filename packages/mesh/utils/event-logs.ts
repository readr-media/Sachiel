import type {
  ShareData,
  UserBehaviorLogInfo,
  UserPayload,
} from '@/types/user-behavior-log'
import { generateUserBehaviorLogInfo } from '@/utils/generate-user-behavior-log-info'
import { sendUserBehaviorLog } from '@/utils/send-user-behavior-log'

export function logStoryClick(
  userPayload: UserPayload,
  storyInfo: {
    storyId: string
    storyTitle: string
    publisherName: string
    publisherId: string
  },
  isRelatedStory = false
) {
  const basicInfo = generateUserBehaviorLogInfo('storyClick', userPayload)

  if (basicInfo) {
    const info: UserBehaviorLogInfo = {
      ...basicInfo,
      interaction: {
        story: {
          type: isRelatedStory ? 'relatedStory' : 'story',
          ...storyInfo,
        },
      },
    }
    sendUserBehaviorLog(info)
  }
}

export function logShareClick(userPayload: UserPayload, shareData: ShareData) {
  const basicInfo = generateUserBehaviorLogInfo('share', userPayload)

  if (basicInfo) {
    const info: UserBehaviorLogInfo = {
      ...basicInfo,
      interaction: shareData,
    }
    sendUserBehaviorLog(info)
  }
}

export function logCategoryClick(
  userPayload: UserPayload,
  categoryName: string
) {
  const basicInfo = generateUserBehaviorLogInfo('categoryClick', userPayload)

  if (basicInfo) {
    const info: UserBehaviorLogInfo = {
      ...basicInfo,
      interaction: {
        category: {
          categoryName,
        },
      },
    }
    sendUserBehaviorLog(info)
  }
}

export function logStoryAction(
  userPayload: UserPayload,
  type: 'pick' | 'collection' | 'bookmark',
  storyId: string
) {
  const basicInfo = generateUserBehaviorLogInfo('storyAction', userPayload)

  if (basicInfo) {
    const info: UserBehaviorLogInfo = {
      ...basicInfo,
      interaction: {
        type,
        storyId,
      },
    }
    sendUserBehaviorLog(info)
  }
}

export function logSocialFeedClick(
  userPayload: UserPayload,
  actionType: {
    isPick: boolean
    isComment: boolean
    isPickAndComment: boolean
  },
  actionOwnerIds: string[]
) {
  const basicInfo = generateUserBehaviorLogInfo('socialFeedClick', userPayload)
  if (basicInfo) {
    const typeMap = {
      'pick-comment': actionType.isPickAndComment,
      pick: actionType.isPick,
      comment: actionType.isComment,
    }

    const type = (
      Object.entries(typeMap) as Array<[keyof typeof typeMap, boolean]>
    ).find(([_, value]) => value)?.[0]

    const info: UserBehaviorLogInfo = {
      ...basicInfo,
      userActivity: { activityType: type, userId: actionOwnerIds },
    }

    sendUserBehaviorLog(info)
  }
}

export function logVideoPlay(userPayload: UserPayload) {
  const basicInfo = generateUserBehaviorLogInfo('videoPlay', userPayload)

  if (basicInfo) {
    const info: UserBehaviorLogInfo = {
      ...basicInfo,
      interaction: {
        media: {
          videoPlay: true,
        },
      },
    }

    sendUserBehaviorLog(info)
  }
}

export function logSponsor(
  userPayload: UserPayload,
  publisherName: string,
  publisherId: string
) {
  const basicInfo = generateUserBehaviorLogInfo('sponsor', userPayload)

  if (basicInfo) {
    const info: UserBehaviorLogInfo = {
      ...basicInfo,
      interaction: {
        sponsorAction: {
          sponsorName: publisherName,
          sponsorId: publisherId,
        },
      },
    }

    sendUserBehaviorLog(info)
  }
}

export function logPayment(userPayload: UserPayload, storyId: string) {
  const basicInfo = generateUserBehaviorLogInfo('unlock', userPayload)

  if (basicInfo) {
    const info: UserBehaviorLogInfo = {
      ...basicInfo,
      interaction: {
        unlock: {
          storyId,
        },
      },
    }

    sendUserBehaviorLog(info)
  }
}

export function logCollectionClick(
  userPayload: UserPayload,
  collectionTitle: string
) {
  const basicInfo = generateUserBehaviorLogInfo('collectionClick', userPayload)

  if (basicInfo) {
    const info: UserBehaviorLogInfo = {
      ...basicInfo,
      interaction: {
        collectionInfo: {
          collectionTitle,
        },
      },
    }

    sendUserBehaviorLog(info)
  }
}
