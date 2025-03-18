import { useCallback, useEffect, useRef, useState } from 'react'

import {
  getAnnouncement,
  getNotification,
  readNotification,
} from '@/app/actions/notification'
import {
  type AnnouncementData,
  type NotificationData,
} from '@/app/actions/notification'
import { MINUTE } from '@/constants/time-unit'
import { useUser } from '@/context/user'

import Icon from './icon'
import NotificationDropdown from './notification-dropdown'

export type SplitNotificationResult = {
  current: NonNullable<NotificationData>['notifies']
  prev: NonNullable<NotificationData>['notifies']
}

export default function NotificationWrapper() {
  const { user } = useUser()
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [hasNewNotification, setHasNewNotification] = useState(false)
  const [notificationData, setNotificationData] =
    useState<SplitNotificationResult | null>(null)
  const [announcementData, setAnnouncementData] =
    useState<AnnouncementData>(null)
  const intervalRef = useRef<number | null>(null)
  const memberId = user.memberId

  const fetchData = useCallback(async () => {
    if (!memberId) return

    const [notificationResponse, announcementResponse] = await Promise.all([
      getNotification({ member_id: memberId, index: 0, take: 10 }),
      getAnnouncement(),
    ])

    if ((notificationResponse?.notifies ?? []).length) {
      const splittedData = splitNotification(notificationResponse)
      setNotificationData(splittedData)
      if (splittedData.current.length) {
        setHasNewNotification(true)
      }
    }
    if (announcementResponse) {
      setAnnouncementData(announcementResponse)
    }
  }, [memberId])

  useEffect(() => {
    if (!memberId) return

    if (!isNotificationModalOpen) {
      fetchData()
      intervalRef.current = window.setInterval(fetchData, MINUTE)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [fetchData, isNotificationModalOpen, memberId])

  const handleToggleModal = () => {
    if (!isNotificationModalOpen) {
      readNotification(memberId)
    }
    setIsNotificationModalOpen((prev) => !prev)
    setHasNewNotification(false)
  }

  return (
    <>
      <button
        className={hasNewNotification ? 'rounded-[50%] bg-primary-100' : ''}
        onClick={handleToggleModal}
        aria-label="Open notification modal"
        aria-haspopup="dialog"
        aria-expanded={isNotificationModalOpen}
      >
        <Icon
          size="2xl"
          iconName={
            hasNewNotification ? 'icon-notifications-new' : 'icon-notifications'
          }
        />
      </button>
      {isNotificationModalOpen ? (
        <NotificationDropdown
          onClose={() => setIsNotificationModalOpen(false)}
          notification={notificationData}
          announcement={announcementData}
        />
      ) : null}
    </>
  )
}

const splitNotification = (notification: NotificationData) => {
  if (!notification) return { current: [], prev: [] }

  const { lrt, notifies } = notification

  return notifies.reduce<SplitNotificationResult>(
    (acc, notify) => {
      if (notify.ts > lrt) {
        acc.current.push(notify)
      } else {
        acc.prev.push(notify)
      }
      return acc
    },
    { current: [], prev: [] }
  )
}
