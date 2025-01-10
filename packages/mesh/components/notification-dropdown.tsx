import { useRouter } from 'next/navigation'
import { type ReactNode, Fragment } from 'react'
import { createPortal } from 'react-dom'
import type { z } from 'zod'

import {
  type AnnouncementData,
  type NotificationData,
  clickNotification,
} from '@/app/actions/notification'
import { DEFAULT_IMAGES } from '@/constants/fallback-src'
import { useUser } from '@/context/user'
import useBlockBodyScroll from '@/hooks/use-block-body-scroll'
import {
  type ContentSchemaMapKey,
  contentSchemaMap,
} from '@/utils/notification-schema'
import {
  displayExpireTimeFromNow,
  displayTimeFromNow,
} from '@/utils/story-display'

import Icon from './icon'
import { type SplitNotificationResult } from './notification-wrapper'
import Avatar from './story-card/avatar'

export default function NotificationDropdown({
  onClose,
  notification,
  announcement,
}: {
  onClose: () => void
  notification: SplitNotificationResult | null
  announcement: AnnouncementData
}) {
  useBlockBodyScroll(true)

  return createPortal(
    <div className="fixed inset-0 z-modal size-full bg-white transition-transform duration-300 sm:inset-auto sm:right-[40px] sm:top-[60px] sm:h-fit sm:w-[400px] sm:rounded-md sm:shadow-lg">
      <div className="flex h-dvh flex-col overflow-y-scroll sm:h-auto sm:max-h-[calc(95vh-60px)]">
        <div className="flex h-15 flex-row items-center border-b-[0.5px] p-2 sm:hidden">
          <div className="size-11"></div>
          <h2 className="list-title mx-auto text-primary-800">通知</h2>
          <button
            className="flex size-11 items-center justify-center"
            onClick={onClose}
          >
            <Icon iconName="icon-close" size="l" />
          </button>
        </div>
        {announcement && announcement.length > 0 ? (
          <div className="flex flex-col gap-1 rounded-t-md bg-highlight-red p-5">
            <p className="subtitle-2 text-primary-700">系統維修公告</p>
            <p className="body-3 max-w-[335px] text-primary-600">
              {announcement[0].name}
            </p>
          </div>
        ) : null}
        {notification?.current.length ? (
          <>
            <div className="h-15 px-5 pb-3 pt-4">
              <h4 className="list-title">新通知</h4>
            </div>
            {notification.current.map((n) => (
              <Fragment key={n.uuid}>
                <div className="bg-highlight-blue">{renderNotification(n)}</div>
              </Fragment>
            ))}
          </>
        ) : (
          <>
            <div className="h-15 px-5 pb-3 pt-4">
              <h4 className="list-title">新通知</h4>
            </div>
            <p className="body-3 px-5 pb-5 text-primary-500">
              目前沒有新通知...
            </p>
          </>
        )}
        {notification?.prev.length ? (
          <>
            <div className="h-15 px-5 pb-3 pt-4">
              <h4 className="list-title">之前的通知</h4>
            </div>
            {notification.prev.map((n) => (
              <Fragment key={n.uuid}>{renderNotification(n)}</Fragment>
            ))}
          </>
        ) : null}
      </div>
    </div>,
    document.body
  )
}

const renderNotification = (
  notification: NonNullable<NotificationData>['notifies'][number]
) => {
  const { action, objective, ts, content, notifiers, uuid } = notification
  const notificationType = `${action}:${objective}` as ContentSchemaMapKey
  const time = displayTimeFromNow(new Date(ts * 1000))

  const schema = contentSchemaMap[notificationType]
  const parsedContent = content as z.infer<typeof schema>

  if (notificationType === 'add_follow:member') {
    return CommonContainer(
      <Avatar size="l" src={notifiers?.[0].avatar || DEFAULT_IMAGES.avatar} />,
      renderNotifierText(
        notifiers,
        <span className="text-primary-600">開始追蹤你</span>,
        <span className="text-primary-600">都開始追蹤你</span>
      ),
      time,
      `/profile/member/${notifiers?.[0].customId}`,
      uuid
    )
  }

  if (!parsedContent) return null

  switch (notificationType) {
    case 'notify_sponsorship:sponsorship':
      if ('publisher' in parsedContent) {
        return CommonContainer(
          <Icon
            iconName="icon-notification-blue"
            size="2xl"
            className="size-11"
          />,
          <p className="body-3 text-primary-600">
            你已成功贊助「
            <span className="subtitle-2 text-primary-700">
              {parsedContent.publisher.title}
            </span>
            」{parsedContent.fee} 讀選點數
          </p>,
          time,
          `/point/record/${notification.tid}`,
          uuid
        )
      }
      break
    case 'add_collection:collection':
      if ('title' in parsedContent) {
        return CommonContainer(
          <Avatar
            size="l"
            src={notifiers?.[0].avatar || DEFAULT_IMAGES.avatar}
          />,
          <p className="body-3 text-primary-700">
            {notifiers?.[0].name}
            <span className="text-primary-600">建立了新的集錦</span>「
            {parsedContent.title}」
          </p>,
          time,
          `/collection/${parsedContent.id}`,
          uuid
        )
      }
      break
    case 'approach_expiration:transaction':
      if ('expireDate' in parsedContent) {
        return CommonContainer(
          <Icon
            iconName="icon-notification-blue"
            size="2xl"
            className="size-11"
          />,
          <p className="body-3 text-primary-600">
            這篇文章的閱讀期限只剩
            <span>{displayExpireTimeFromNow(parsedContent.expireDate)}</span>
            哦：「
            <span className="subtitle-2 text-primary-700">
              {parsedContent.unlockStory.title}
            </span>
            」
          </p>,
          time,
          `/story/${parsedContent.unlockStory.id}`,
          uuid
        )
      }
      break
    case 'notify_transaction:transaction':
      if (
        'policy' in parsedContent &&
        parsedContent.policy.type === 'unlock_one_publisher'
      ) {
        return CommonContainer(
          <Icon
            iconName="icon-notification-blue"
            size="2xl"
            className="size-11"
          />,
          <p className="body-3 text-primary-600">
            你已成功解鎖「
            <span className="subtitle-2 text-primary-700">
              {parsedContent.unlockStory?.title}
            </span>
            」
          </p>,
          time,
          `/story/${parsedContent.unlockStory?.id}`,
          uuid
        )
      } else if (
        'depositVolume' in parsedContent &&
        parsedContent.policy.type === 'deposit'
      ) {
        return CommonContainer(
          <Icon
            iconName="icon-notification-blue"
            size="2xl"
            className="size-11"
          />,
          <p className="body-3 text-primary-600">
            你已收到 {parsedContent.depositVolume} 讀選點數的空投
          </p>,
          time,
          `/point/record/${notification.tid}`,
          uuid
        )
      }
      break
    case 'add_pick:collection':
      if ('title' in parsedContent) {
        return CommonContainer(
          <Avatar
            size="l"
            src={notifiers?.[0].avatar || DEFAULT_IMAGES.avatar}
          />,
          renderNotifierText(
            notifiers,
            <>
              <span className="text-primary-600">精選了你的集錦</span>「
              <span className="subtitle-2">{parsedContent.title}</span>」
            </>,
            <>
              <span className="text-primary-600">都精選了你的集錦</span>「
              <span className="subtitle-2">{parsedContent.title}</span>」
            </>
          ),
          time,
          `/collection/${parsedContent.id}`,
          uuid
        )
      }
      break
    case 'add_comment:collection':
      if ('title' in parsedContent) {
        return CommonContainer(
          <Avatar
            size="l"
            src={notifiers?.[0].avatar || DEFAULT_IMAGES.avatar}
          />,
          renderNotifierText(
            notifiers,
            <>
              <span className="text-primary-600">在你的集錦</span>「
              <span className="subtitle-2">{parsedContent.title}</span>
              」下留言
            </>,
            <>
              <span className="text-primary-600">都在你的集錦</span>「
              <span className="subtitle-2">{parsedContent.title}</span>」下留言
            </>
          ),
          time,
          `/collection/${parsedContent.id}`,
          uuid
        )
      }
      break
    case 'add_comment:story':
      if ('title' in parsedContent) {
        return CommonContainer(
          <Avatar
            size="l"
            src={notifiers?.[0].avatar || DEFAULT_IMAGES.avatar}
          />,
          renderNotifierText(
            notifiers,
            <>
              <span className="text-primary-600">也在</span>「
              <span className="subtitle-2">{parsedContent.title}</span>」
              <span className="text-primary-600">下留言</span>
            </>,
            <>
              <span className="text-primary-600">也在</span>「
              <span className="subtitle-2">{parsedContent.title}</span>」
              <span className="text-primary-600">下留言</span>
            </>
          ),
          time,
          `/story/${parsedContent.id}`,
          uuid
        )
      }
      break
    case 'add_like:comment':
      if ('content' in parsedContent) {
        return CommonContainer(
          <Avatar
            size="l"
            src={notifiers?.[0].avatar || DEFAULT_IMAGES.avatar}
          />,
          renderNotifierText(
            notifiers,
            <>
              <span className="text-primary-600">喜歡你的留言</span>「
              <span className="subtitle-2">{parsedContent.content}</span>」
            </>,
            <>
              <span className="text-primary-600">都喜歡你的留言</span>「
              <span className="subtitle-2">{parsedContent.content}</span>」
            </>
          ),
          time,
          `/story/${parsedContent.story.id}`,
          uuid
        )
      }
      break

    default:
      return (
        <span className="mx-5 border-b-[0.5px] py-5 text-center">
          Unknown Notification
        </span>
      )
  }
}

const CommonContainer = (
  icon: ReactNode,
  text: ReactNode,
  time: string,
  url: string,
  uuid: string
) => {
  const router = useRouter()
  const { user } = useUser()

  const handleClickNotification = async () => {
    await clickNotification({ memberId: user.memberId, uuid })
    router.push(url)
  }
  return (
    <div
      className="mx-5 flex cursor-pointer flex-row gap-2 border-b-[0.5px] py-5"
      onClick={handleClickNotification}
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex flex-col gap-1">
        {text}
        <p className="caption-1 text-primary-500">{time}</p>
      </div>
    </div>
  )
}

const renderNotifierText = (
  notifiers: NonNullable<NotificationData>['notifies'][number]['notifiers'],
  singleText: ReactNode,
  pluralText: ReactNode
) => {
  if (!notifiers) return null
  if (notifiers.length === 1)
    return (
      <p className="body-3 text-primary-700">
        {notifiers[0].name}
        {singleText}
      </p>
    )
  if (notifiers.length === 2)
    return (
      <p className="body-3 text-primary-700">
        {notifiers[0].name}及{notifiers[1].name}
        {pluralText}
      </p>
    )
  if (notifiers.length > 2)
    return (
      <p className="body-3 text-primary-700">
        {notifiers[0].name}、{notifiers[1].name}及其他{notifiers.length - 2}人
        {pluralText}
      </p>
    )
}
