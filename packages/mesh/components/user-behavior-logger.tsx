'use client'

import { usePathname } from 'next/navigation'
import throttle from 'raf-throttle'
import { useCallback, useEffect } from 'react'

import usePageName from '@/hooks/use-page-name'
import useUserPayload from '@/hooks/use-user-payload'
import type { Info } from '@/types/user-behavior-log'
import { generateUserBehaviorLogInfo } from '@/utils/generate-user-behavior-log-info'
import { sendUserBehaviorLog } from '@/utils/send-user-behavior-log'

const pathTarget = {
  '/story': 'story',
  '/collection': 'collection',
}

export default function UserBehaviorLogger() {
  const userPayload = useUserPayload()
  const pathName = usePathname()

  const pageName = usePageName()

  const getComplementary = useCallback(() => {
    for (const key in pathTarget) {
      if (pathName.startsWith(key)) {
        return {
          target: pathTarget[key as keyof typeof pathTarget],
          targetId: pathName.split('/')[2] ?? '',
        }
      }
    }
    return null
  }, [pathName])

  //pageview event
  useEffect(() => {
    const basicInfo = generateUserBehaviorLogInfo(userPayload)
    if (basicInfo) {
      const info: Info = {
        logCategory: 'general',
        logInfo: {
          ...basicInfo,
          type: 'pageview',
          source: pageName,
          complementary: getComplementary(),
        },
      }
      sendUserBehaviorLog(info)
    }
  }, [userPayload, pageName, getComplementary])

  //exit event
  useEffect(() => {
    const basicInfo = generateUserBehaviorLogInfo(userPayload)

    let hasEventTriggered = false

    const beforeLeavingPage = () => {
      if (!hasEventTriggered) {
        hasEventTriggered = true
        if (basicInfo) {
          const info: Info = {
            logCategory: 'general',
            logInfo: {
              ...basicInfo,
              type: 'exit',
              source: pageName,
              complementary: getComplementary(),
            },
          }
          sendUserBehaviorLog(info)
        }
      }
    }

    window.addEventListener('beforeunload', beforeLeavingPage)

    return () => {
      window.removeEventListener('beforeunload', beforeLeavingPage)
    }
  }, [userPayload, pageName, getComplementary])

  // scroll event (50%、80%)
  useEffect(() => {
    let hasScrolledTo50 = false
    let hasScrolledTo80 = false

    function detectScrollPercentage() {
      const totalPageHeight = document.body.scrollHeight
      const scrollPoint = window.scrollY + window.innerHeight
      const scrollPercent = scrollPoint / totalPageHeight

      return scrollPercent
    }

    const handleScroll = throttle(() => {
      const scrollPercent = detectScrollPercentage()

      if (!hasScrolledTo50 && scrollPercent >= 0.5) {
        hasScrolledTo50 = true
        const basicInfo = generateUserBehaviorLogInfo(userPayload)
        if (basicInfo) {
          const info50: Info = {
            logCategory: 'general',
            logInfo: {
              ...basicInfo,
              type: 'scroll-to-50%',
              source: pageName,
              complementary: getComplementary(),
            },
          }
          sendUserBehaviorLog(info50)
        }
      }

      if (!hasScrolledTo80 && scrollPercent >= 0.8) {
        hasScrolledTo80 = true
        const basicInfo = generateUserBehaviorLogInfo(userPayload)
        if (basicInfo) {
          const info80: Info = {
            logCategory: 'general',
            logInfo: {
              ...basicInfo,
              type: 'scroll-to-80%',
              source: pageName,
              complementary: getComplementary(),
            },
          }
          sendUserBehaviorLog(info80)
        }
      }
    })

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [userPayload, pageName, getComplementary])

  return null
}
