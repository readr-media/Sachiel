import type { EventType, PageInfo } from '@/types/user-behavior-log'

import {
  detectIsInApp,
  getBrowserInfo,
  getDeviceInfo,
  getWindowSizeInfo,
  isServer,
} from './common'
import { displayTime } from './story-display'

const generateUserBehaviorLogInfo = (
  eventType: EventType,
  payload = {
    memberType: 'none-logged-in',
    email: '',
    firebaseId: '',
  }
) => {
  if (isServer()) {
    return null
  }

  const userAgent = window.navigator.userAgent
  const pathname = window.location.pathname
  const { memberType, email, firebaseId } = payload

  const triggerEvent = {
    eventType,
    datetime: displayTime(new Date()) ?? '',
  }

  const clientInfo = {
    ip: '',
    userInfo: {
      memberType,
      email,
      firebaseId,
    },
    device: getDeviceInfo(userAgent),
    browser: getBrowserInfo(userAgent),
    isInApBrowser: detectIsInApp(userAgent),
    screenSize: getWindowSizeInfo(),
  }

  // TODO: add pageType if pageType is defined
  const pageInfo: PageInfo = {
    referrer: document.referrer,
    pageUrl: window.location.href,
    pageName: pathname,
  }

  return { triggerEvent, clientInfo, pageInfo }
}

export { generateUserBehaviorLogInfo }
