'use client'

import { useRouter } from 'next/navigation'
import type { ForwardedRef, MouseEventHandler, RefObject } from 'react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { addBookmark, removeBookmark } from '@/app/actions/bookmark'
import { removeFollowPublisher } from '@/app/actions/follow-publisher'
import { useUser } from '@/context/user'
import useClickOutside from '@/hooks/use-click-outside'
import { PaymentType } from '@/types/payment'

import Icon from './icon'

type Position = {
  top: number
  left: number
}

const isPositionValid = (position: Position) => {
  return Number.isFinite(position.top) && Number.isFinite(position.left)
}

const getStoryUrl = (storyId: string) => {
  return `${location.origin}/story/${storyId}`
}

export default function StoryMoreActionButton({
  storyId,
  publisherId,
  canUnFollowPublisher = false,
  showOnRestrictArea = false,
  nestedScrollContainerRef,
  className,
}: {
  storyId: string
  publisherId: string
  canUnFollowPublisher?: boolean
  showOnRestrictArea?: boolean
  nestedScrollContainerRef?: RefObject<HTMLElement>
  className?: string
}) {
  const [shouldShowShareSheet, setShouldShowShareSheet] = useState(false)
  const [shouldShowActionSheet, setShouldShowActionSheet] = useState(false)
  const [position, setPosition] = useState<Position>({
    top: Infinity,
    left: Infinity,
  })
  const actionSheetRef = useRef<HTMLDivElement>(null)

  useClickOutside(actionSheetRef, () => {
    closeActionSheet()
  })

  const openActionSheet: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault()
    if (showOnRestrictArea) {
      const button = evt.target as HTMLButtonElement
      const { top, left } = button.getBoundingClientRect()
      setPosition({ top, left })
    }
    setShouldShowActionSheet(true)
  }

  const closeActionSheet = useCallback(() => {
    setShouldShowActionSheet(false)
  }, [])

  const openShareSheet = () => {
    setShouldShowActionSheet(false)
    setShouldShowShareSheet(true)
  }

  const closeShareSheet = () => {
    setShouldShowShareSheet(false)
  }

  useEffect(() => {
    const onScroll = () => {
      closeActionSheet()
    }
    const nestedScrollContainer = nestedScrollContainerRef?.current

    /**
     * Hide the action sheet when scroll, for scroll event on both window and nested scroll container (if exists).
     * Avoid complicated logic to set dynamic position when `showOnRestrictArea` is true.
     * Align the behavior to the other situation.
     */
    if (nestedScrollContainer) {
      nestedScrollContainer.addEventListener('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      if (nestedScrollContainer) {
        nestedScrollContainer.removeEventListener('scroll', onScroll)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [closeActionSheet, nestedScrollContainerRef])

  return (
    <div className="relative">
      <button
        onClick={openActionSheet}
        className={twMerge('flex items-center justify-center', className)}
      >
        <Icon iconName="icon-more-horiz" size="l" />
      </button>
      {shouldShowActionSheet && (
        <ActionSheet
          ref={actionSheetRef}
          storyId={storyId}
          publisherId={publisherId}
          onClose={closeActionSheet}
          openShareSheet={openShareSheet}
          canUnFollowPublisher={canUnFollowPublisher}
          position={position}
        />
      )}
      {shouldShowShareSheet && (
        <ShareSheet onClose={closeShareSheet} storyId={storyId} />
      )}
    </div>
  )
}

enum ActionType {
  Sponsor = 'sponsor',
  AddBookMark = 'add-bookmark',
  UnFollow = 'unfollow',
  CopyLink = 'copy-link',
  Share = 'Share',
}

const actions = [
  { type: ActionType.Sponsor, text: '贊助', icon: 'icon-wallet' },
  {
    type: ActionType.AddBookMark,
    text: '加入書籤',
    icon: 'icon-bookmark',
    offText: '移除書籤',
    offIcon: 'icon-bookmark-off',
  },
  {
    type: ActionType.UnFollow,
    text: '取消追蹤',
    icon: 'icon-unfollow',
  },
  { type: ActionType.CopyLink, text: '複製連結', icon: 'icon-copy' },
  { type: ActionType.Share, text: '分享', icon: 'icon-share' },
] as const

const ActionSheet = forwardRef(function ActionSheet(
  {
    storyId,
    publisherId,
    openShareSheet,
    canUnFollowPublisher,
    position,
    onClose,
  }: {
    storyId: string
    publisherId: string
    openShareSheet: () => void
    canUnFollowPublisher: boolean
    position: Position
    onClose: () => void
  },
  ref: ForwardedRef<HTMLDivElement>
) {
  const router = useRouter()
  const { user, setUser } = useUser()
  const isStoryAddedBookmark = user.bookmarkStoryIds.has(storyId)
  const hasPosition = isPositionValid(position)

  const onAction = async (type: ActionType) => {
    if (!storyId || !publisherId) {
      // TODO: show toast to hint error
      return
    }
    switch (type) {
      case ActionType.Sponsor: {
        router.push(`/payment/${PaymentType.Sponsor}/${publisherId}`)
        break
      }
      case ActionType.AddBookMark: {
        if (!user.memberId) {
          router.push('/login')
          return
        }
        if (isStoryAddedBookmark) {
          const removeBookmarkResponse = await removeBookmark({
            memberId: user.memberId,
            storyId,
          })
          if (removeBookmarkResponse) {
            setUser((oldUser) => ({
              ...oldUser,
              bookmarkStoryIds: new Set(
                [...oldUser.bookmarkStoryIds].filter(
                  (bookmarkStoryId) => bookmarkStoryId !== storyId
                )
              ),
            }))
          }
          // TODO: show error toase?
          onClose()
        } else {
          const addBookmarkResponse = await addBookmark({
            memberId: user.memberId,
            storyId,
          })
          if (addBookmarkResponse) {
            setUser((oldUser) => ({
              ...oldUser,
              bookmarkStoryIds: new Set([...oldUser.bookmarkStoryIds, storyId]),
            }))
          }
          // TODO: show error toase?
          onClose()
        }
        break
      }
      case ActionType.UnFollow: {
        const removeResponse = await removeFollowPublisher({
          memberId: user.memberId,
          publisherId: publisherId,
        })
        if (removeResponse) {
          setUser((oldUser) => ({
            ...oldUser,
            followingPublishers: oldUser.followingPublishers.filter(
              (followingPublisher) => followingPublisher.id !== publisherId
            ),
          }))
        }
        onClose()
        break
      }
      case ActionType.CopyLink: {
        const storyUrl = getStoryUrl(storyId)
        navigator.clipboard
          .writeText(storyUrl)
          .then(() => {
            // TODO: show toast for url copied successfully
            onClose()
          })
          .catch((error) => {
            console.error(`Copy story url: ${storyUrl} failed`, error)
          })
        break
      }
      case ActionType.Share:
        openShareSheet()
        break
      default:
        break
    }
  }

  const alternativeClasses = hasPosition
    ? 'sm:fixed sm:right-[unset] sm:top-[unset]'
    : ''

  return (
    <div
      ref={ref}
      className={twMerge(
        'fixed bottom-0 left-0 z-modal flex w-full flex-col bg-white py-2 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1),0px_-8px_20px_0px_rgba(0,0,0,0.1)] sm:absolute sm:bottom-[unset] sm:left-[unset] sm:right-0 sm:top-0 sm:w-[unset] sm:min-w-[180px] sm:rounded-md sm:px-0 sm:shadow-light-box',
        alternativeClasses
      )}
      style={
        hasPosition
          ? {
              top: position.top,
              left: position.left - 180 + 20,
            }
          : undefined
      }
    >
      {actions.map((action) => {
        switch (action.type) {
          case ActionType.AddBookMark: {
            return (
              <button
                key={action.type}
                className="flex w-full cursor-pointer gap-1 px-5 py-3 hover:bg-primary-100 sm:w-auto sm:min-w-max sm:py-[9px]"
                onClick={onAction.bind(null, action.type)}
              >
                <Icon
                  iconName={isStoryAddedBookmark ? action.offIcon : action.icon}
                  size="l"
                />
                <span className="button-large shrink-0 text-primary-700">
                  {isStoryAddedBookmark ? action.offText : action.text}
                </span>
              </button>
            )
          }
          case ActionType.UnFollow: {
            return canUnFollowPublisher ? (
              <button
                key={action.type}
                className="flex w-full cursor-pointer gap-1 px-5 py-3 hover:bg-primary-100 sm:w-auto sm:min-w-max sm:py-[9px]"
                onClick={onAction.bind(null, action.type)}
              >
                <Icon iconName={action.icon} size="l" />
                <span className="button-large shrink-0 text-primary-700">
                  {action.text}
                </span>
              </button>
            ) : null
          }
          default: {
            return (
              <button
                key={action.type}
                className="flex w-full cursor-pointer gap-1 px-5 py-3 hover:bg-primary-100 sm:w-auto sm:min-w-max sm:py-[9px]"
                onClick={onAction.bind(null, action.type)}
              >
                <Icon iconName={action.icon} size="l" />
                <span className="button-large shrink-0 text-primary-700">
                  {action.text}
                </span>
              </button>
            )
          }
        }
      })}
    </div>
  )
})

const shareMedia = [
  {
    id: 'facebook',
    icon: 'icon-share-facebook',
    text: 'Facebook',
    urlTemplate: 'https://www.facebook.com/share.php?u=${storyUrl}',
  },
  {
    id: 'line',
    icon: 'icon-share-line',
    text: 'LINE',
    urlTemplate: 'https://social-plugins.line.me/lineit/share?url=${storyUrl}',
  },
  {
    id: 'threads',
    icon: 'icon-share-threads',
    text: 'Threads',
    urlTemplate: 'https://www.threads.net/intent/post?text=${storyUrl}',
  },
  {
    id: 'x',
    icon: 'icon-share-x',
    text: 'x',
    urlTemplate: 'https://twitter.com/intent/tweet?url=${storyUrl}',
  },
] as const

const ShareSheet = ({
  storyId,
  onClose,
}: {
  storyId: string
  onClose: () => void
}) => {
  const getShareUrl = (urlTemplate: string) => {
    const storyUrl = getStoryUrl(storyId)
    return urlTemplate.replace('${storyUrl}', storyUrl)
  }

  const onBackgroundClicked = () => {
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-modal flex  items-center justify-center  bg-lightbox-light"
      onClick={onBackgroundClicked}
    >
      <div className="w-[335px] rounded-xl bg-white shadow-light-box sm:w-[480px]">
        <div className="flex h-15 items-center justify-between border-b border-[rgba(0,9,40,0.1)] px-2">
          <div />
          <div className="list-title text-primary-800">分享</div>
          <button
            className="flex size-11 items-center justify-center"
            onClick={onClose}
          >
            <Icon iconName="icon-close" size="l" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-y-10 p-5 sm:flex sm:gap-0">
          {shareMedia.map((media) => (
            <a
              key={media.id}
              href={getShareUrl(media.urlTemplate)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <div className="flex flex-col items-center gap-2 sm:flex-1">
                <Icon iconName={media.icon} size={{ width: 40, height: 40 }} />
                <span className="subtitle-2 text-primary-500">
                  {media.text}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
