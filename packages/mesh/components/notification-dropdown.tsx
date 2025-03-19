import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
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

import Icon from './icon'
import { type SplitNotificationResult } from './notification-wrapper'
import Avatar from './story-card/avatar'
import {
  DisplayExpireTimeFromNow,
  DisplayTimeFromNow,
} from './story-time-display'

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
  const t = useTranslations('Components.NotificationDropDown')

  return createPortal(
    <div className="fixed inset-0 z-modal size-full bg-white transition-transform duration-300 sm:inset-auto sm:right-[40px] sm:top-[60px] sm:h-fit sm:w-[400px] sm:rounded-md sm:shadow-lg">
      <div className="flex h-dvh flex-col overflow-y-scroll sm:h-auto sm:max-h-[calc(95vh-60px)]">
        <div className="flex h-15 flex-row items-center border-b-[0.5px] p-2 sm:hidden">
          <div className="size-11"></div>
          <h2 className="list-title mx-auto text-primary-800">{t('h2')}</h2>
          <button
            className="flex size-11 items-center justify-center"
            onClick={onClose}
          >
            <Icon iconName="icon-close" size="l" />
          </button>
        </div>
        {announcement && announcement.length > 0
          ? announcement
              .filter((a) => a.isActive)
              .map((a) => {
                const { id, name, type } = a
                return (
                  <div
                    key={id}
                    className={`flex flex-col gap-1 rounded-t-md p-5 ${getAnnouncementBgColor(
                      type
                    )}`}
                  >
                    <h4 className="subtitle-2 text-primary-700">
                      {t(getAnnouncementTitle(type))}
                    </h4>
                    <p className="body-3 max-w-[335px] text-primary-600">
                      {name}
                    </p>
                  </div>
                )
              })
          : null}
        {notification?.current.length ? (
          <>
            <div className="h-15 px-5 pb-3 pt-4">
              <h4 className="list-title">{t('new-announcement-title')}</h4>
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
              <h4 className="list-title">{t('new-announcement-title')}</h4>
            </div>
            <p className="body-3 px-5 pb-5 text-primary-500">
              {t('no-new-announcement')}
            </p>
          </>
        )}
        {notification?.prev.length ? (
          <>
            <div className="h-15 px-5 pb-3 pt-4">
              <h4 className="list-title">{t('prev-notification')}</h4>
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('Component.NotificationDropDown')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const otherT = useTranslations('Others.punctuation')
  const { action, objective, ts, content, notifiers, uuid } = notification
  const notificationType = `${action}:${objective}` as ContentSchemaMapKey
  const timeJsx = <DisplayTimeFromNow date={new Date(ts * 1000)} />

  const schema = contentSchemaMap[notificationType]
  const parsedContent = content as z.infer<typeof schema>

  if (notificationType === 'add_follow:member') {
    return CommonContainer(
      <Avatar size="l" src={notifiers?.[0].avatar || DEFAULT_IMAGES.avatar} />,
      renderNotifierText(
        notifiers,
        <span className="text-primary-600">{t('notifier-follow-single')}</span>,
        <span className="text-primary-600">{t('notifier-follow-plural')}</span>
      ),
      timeJsx,
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
            {t('expire-description-1')}
            {otherT('corner-quote-start')}
            <span className="subtitle-2 text-primary-700">
              {parsedContent.publisher.title}
            </span>
            {otherT('corner-quote-end')}
            {parsedContent.fee} {t('notifier-sponsor-success-2')}
          </p>,
          timeJsx,
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
            <span className="text-primary-600">{t('建立了新的集錦')}</span>
            {otherT('corner-quote-start')}
            {parsedContent.title}
            {otherT('corner-quote-end')}
          </p>,
          timeJsx,
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
            {t('expire-description-1')}
            <span>
              <DisplayExpireTimeFromNow date={parsedContent.expireDate} />
            </span>
            {t('expire-description-2')}
            {otherT('corner-quote-start')}
            <span className="subtitle-2 text-primary-700">
              {parsedContent.unlockStory.title}
            </span>
            {otherT('corner-quote-end')}
          </p>,
          timeJsx,
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
            {t('notifier-unlock-story')}
            {otherT('corner-quote-start')}
            <span className="subtitle-2 text-primary-700">
              {parsedContent.unlockStory?.title}
            </span>
            {otherT('corner-quote-end')}
          </p>,
          timeJsx,
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
            {t('notifier-receive-airdrop', {
              depositVolume: parsedContent.depositVolume,
            })}
          </p>,
          timeJsx,
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
              <span className="text-primary-600">
                {t('notifier-pick-single')}
              </span>
              {otherT('corner-quote-start')}
              <span className="subtitle-2">{parsedContent.title}</span>
              {otherT('corner-quote-end')}
            </>,
            <>
              <span className="text-primary-600">
                {t('notifier-pick-plural')}
              </span>
              {otherT('corner-quote-start')}
              <span className="subtitle-2">{parsedContent.title}</span>
              {otherT('corner-quote-end')}
            </>
          ),
          timeJsx,
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
              <span className="text-primary-600">
                {t('notifier-collection-comment-single-1')}
              </span>
              {otherT('corner-quote-start')}
              <span className="subtitle-2">{parsedContent.title}</span>
              {otherT('corner-quote-end')}
              {t('notifier-collection-comment-single-2')}
            </>,
            <>
              <span className="text-primary-600">
                {t('notifier-collection-comment-plural-1')}
              </span>
              {otherT('corner-quote-start')}
              <span className="subtitle-2">{parsedContent.title}</span>
              {otherT('corner-quote-end')}
              {t('notifier-collection-comment-plural-2')}
            </>
          ),
          timeJsx,
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
              <span className="text-primary-600">
                {t('notifier-story-comment-single-1')}
              </span>
              {otherT('corner-quote-start')}
              <span className="subtitle-2">{parsedContent.title}</span>
              {otherT('corner-quote-end')}
              <span className="text-primary-600">
                {t('notifier-story-comment-single-2')}
              </span>
            </>,
            <>
              <span className="text-primary-600">
                {t('notifier-story-comment-plural-1')}
              </span>
              {otherT('corner-quote-start')}
              <span className="subtitle-2">{parsedContent.title}</span>
              {otherT('corner-quote-end')}
              <span className="text-primary-600">
                {t('notifier-story-comment-plural-2')}
              </span>
            </>
          ),
          timeJsx,
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
              <span className="text-primary-600">
                {t('notifier-comment-like-single')}
              </span>
              {otherT('corner-quote-start')}
              <span className="subtitle-2">{parsedContent.content}</span>
              {otherT('corner-quote-end')}
            </>,
            <>
              <span className="text-primary-600">
                {t('notifier-comment-like-plural')}
              </span>
              {otherT('corner-quote-start')}
              <span className="subtitle-2">{parsedContent.content}</span>
              {otherT('corner-quote-end')}
            </>
          ),
          timeJsx,
          `/story/${parsedContent.story.id}`,
          uuid
        )
      }
      break

    default:
      return (
        <span className="mx-5 border-b-[0.5px] py-5 text-center">
          {t('notifier-unknown')}
        </span>
      )
  }
}

const CommonContainer = (
  icon: ReactNode,
  text: ReactNode,
  time: ReactNode,
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('Components.NotificationDropDown')
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
        {notifiers[0].name}
        {t('two-names-and')}
        {notifiers[1].name}
        {pluralText}
      </p>
    )
  if (notifiers.length > 2)
    return (
      <p className="body-3 text-primary-700">
        {notifiers[0].name}
        {t('three-names-above-1')}
        {notifiers[1].name}
        {t('three-names-above-2')}
        {notifiers.length - 2}
        {t('three-names-above-3')}
        {pluralText}
      </p>
    )
}

const getAnnouncementTitle = (type: string | undefined | null) => {
  switch (type) {
    case 'features':
      return 'announcement-title-features'
    case 'new-media':
      return 'announcement-title-new-media'
    case 'maintain':
      return 'announcement-title-maintain'
    default:
      return ''
  }
}

const getAnnouncementBgColor = (type: string | undefined | null) => {
  return type === 'maintain' ? 'bg-highlight-red' : 'bg-highlight-blue'
}
