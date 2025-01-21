import type { PageInfo } from '@/types/user-behavior-log'

import {
  detectIsInApp,
  getBrowserInfo,
  getDeviceInfo,
  getWindowSizeInfo,
  isServer,
} from './common'
import { displayTime } from './story-display'

const generateUserBehaviorLogInfo = (
  eventType: string,
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
    'event-type': eventType,
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
    storyId: '',
    collectionId: '',
  }

  const routes: Record<string, keyof PageInfo> = {
    '/story': 'storyId',
    '/collection': 'collectionId',
  }

  for (const [route, idKey] of Object.entries(routes)) {
    if (pathname.startsWith(route)) {
      pageInfo.pageName = route
      pageInfo[idKey] = pathname.split(`${route}`)?.[1] ?? ''
      break
    }
  }

  return { triggerEvent, clientInfo, pageInfo }
}

export { generateUserBehaviorLogInfo }
