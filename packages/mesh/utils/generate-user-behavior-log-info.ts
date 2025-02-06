import type { BaseLogInfo } from '@/types/user-behavior-log'

import {
  detectIsInApp,
  getBrowserInfo,
  getDeviceInfo,
  getWindowSizeInfo,
  isServer,
} from './common'
import { displayTime } from './story-display'

const generateUserBehaviorLogInfo = (
  payload = {
    logInStatus: false,
    memberId: '',
    email: '',
    firebaseId: '',
  }
): BaseLogInfo => {
  if (isServer()) {
    return null
  }

  const userAgent = window.navigator.userAgent
  const { logInStatus, email, firebaseId, memberId } = payload

  const datetime = displayTime(new Date()) ?? ''

  const clientInfo = {
    ip: '',
    logInStatus,
    memberId,
    email,
    firebaseId,
    device: getDeviceInfo(userAgent),
    browser: getBrowserInfo(userAgent),
    isInAppBrowser: detectIsInApp(userAgent),
    screenSize: getWindowSizeInfo(),
  }

  return { ...clientInfo, datetime }
}

export { generateUserBehaviorLogInfo }
