'use client'

import type { ForwardedRef, MouseEventHandler } from 'react'
import { forwardRef, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import useClickOutside from '@/hooks/use-click-outside'

import Icon from './icon'

const getStoryUrl = (storyId: string) => {
  return `${location.origin}/story/${storyId}`
}

export default function StoryMoreActionButton({
  storyId,
  className,
}: {
  storyId: string
  className?: string
}) {
  const [shouldShowShareSheet, setShouldShowShareSheet] = useState(false)
  const [shouldShowActionSheet, setShouldShowActionSheet] = useState(false)
  const actionSheetRef = useRef<HTMLDivElement>(null)
  const shareSheetRef = useRef<HTMLDivElement>(null)

  useClickOutside(actionSheetRef, () => {
    closeActionSheet()
  })

  useClickOutside(shareSheetRef, () => {
    closeShareSheet()
  })

  const openActionSheet: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault()
    setShouldShowActionSheet(true)
  }

  const closeActionSheet = () => {
    setShouldShowActionSheet(false)
  }

  const openShareSheet = () => {
    setShouldShowActionSheet(false)
    setShouldShowShareSheet(true)
  }

  const closeShareSheet = () => {
    setShouldShowShareSheet(false)
  }

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
          onClose={closeActionSheet}
          openShareSheet={openShareSheet}
        />
      )}
      {shouldShowShareSheet && (
        <ShareSheet
          ref={shareSheetRef}
          onClose={closeShareSheet}
          storyId={storyId}
        />
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
  { type: ActionType.AddBookMark, text: '加入書籤', icon: 'icon-bookmark' },
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
    openShareSheet,
    onClose,
  }: { storyId: string; openShareSheet: () => void; onClose: () => void },
  ref: ForwardedRef<HTMLDivElement>
) {
  const onAction = (type: ActionType) => {
    switch (type) {
      case ActionType.Sponsor:
        break
      case ActionType.AddBookMark:
        break
      case ActionType.UnFollow:
        break
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

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 z-modal flex w-full flex-col bg-white py-2 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1),0px_-8px_20px_0px_rgba(0,0,0,0.1)] sm:absolute sm:bottom-[unset] sm:left-[unset] sm:right-0 sm:top-0 sm:w-[unset] sm:min-w-[180px] sm:rounded-md sm:px-0
sm:shadow-light-box"
    >
      {actions.map((action) => (
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
      ))}
    </div>
  )
})

const shareMedia = [
  {
    id: 'facebook',
    icon: 'icon-share-facebook',
    text: 'Facebook',
    template: 'https://www.facebook.com/share.php?u=${storyUrl}',
  },
  {
    id: 'line',
    icon: 'icon-share-line',
    text: 'LINE',
    template: 'https://social-plugins.line.me/lineit/share?url=${storyUrl}',
  },
  {
    id: 'threads',
    icon: 'icon-share-threads',
    text: 'Threads',
    template: 'https://www.threads.net/intent/post?text=${storyUrl}',
  },
  {
    id: 'x',
    icon: 'icon-share-x',
    text: 'x',
    template: 'https://twitter.com/intent/tweet?url=${storyUrl}',
  },
] as const

const ShareSheet = forwardRef(function ShareSheet(
  {
    storyId,
    onClose,
  }: {
    storyId: string
    onClose: () => void
  },
  ref: ForwardedRef<HTMLDivElement>
) {
  const getShareUrl = (template: string) => {
    const storyUrl = getStoryUrl(storyId)
    return template.replace('${storyUrl}', encodeURIComponent(storyUrl))
  }

  return (
    <div
      className="fixed inset-0 z-modal flex  items-center justify-center  bg-lightbox-light"
      ref={ref}
    >
      <div className="w-[335px] rounded-xl bg-white shadow-light-box sm:w-[480px]">
        <div className="flex h-15 items-center justify-between border-b border-[rgba(0,9,40,0.1)] px-2">
          <div />
          <div className="list-title text-primary-800">分享</div>
          <button
            className="size11 flex items-center justify-center"
            onClick={onClose}
          >
            <Icon iconName="icon-close" size="l" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-y-10 p-5 sm:flex sm:gap-0">
          {shareMedia.map((media) => (
            <a
              key={media.id}
              href={getShareUrl(media.template)}
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
})
