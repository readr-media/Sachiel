'use client'

import type { ForwardedRef, MouseEventHandler, RefObject } from 'react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

import Icon from '@/components/icon'
import ShareSheet from '@/components/share-sheet'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import useClickOutside from '@/hooks/use-click-outside'
import { getMemberProfileUrl } from '@/utils/get-url'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

import BlockSheet from './block-sheet'
import ReportSheet from './report-sheet'

type Position = {
  top: number
  left: number
}
type TypeOfUser = 'member' | 'publisher'
const isPositionValid = (position: Position) => {
  return Number.isFinite(position.top) && Number.isFinite(position.left)
}

export default function ProfileMoreActionButton({
  customId,
  nestedScrollContainerRef,
  className,
  typeOfUser,
}: {
  customId: string
  nestedScrollContainerRef?: RefObject<HTMLElement>
  className?: string
  typeOfUser: TypeOfUser
}) {
  const [shouldShowShareSheet, setShouldShowShareSheet] = useState(false)
  const [shouldShowActionSheet, setShouldShowActionSheet] = useState(false)
  const [shouldShowReportSheet, setShouldShowReportSheet] = useState(false)
  const [shouldShowBlockSheet, setShouldShowBlockSheet] = useState(false)
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
    if (window.innerWidth >= getTailwindConfigBreakpointNumber('sm')) {
      const button = evt.target as HTMLButtonElement
      const { top, left } = button.getBoundingClientRect()
      setPosition({ top, left })
    } else {
      setPosition({ top: Infinity, left: Infinity })
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

  const openReportSheet = () => {
    setShouldShowActionSheet(false)
    setShouldShowReportSheet(true)
  }

  const closeReportSheet = () => {
    setShouldShowReportSheet(false)
  }

  const openBlockSheet = () => {
    setShouldShowActionSheet(false)
    setShouldShowBlockSheet(true)
  }

  const closeBlockSheet = () => {
    setShouldShowBlockSheet(false)
  }
  useEffect(() => {
    const onScroll = () => {
      closeActionSheet()
    }
    const nestedScrollContainer = nestedScrollContainerRef?.current

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
        className={twMerge('group flex items-center justify-center', className)}
      >
        <Icon
          iconName="icon-more-horiz"
          size="l"
          className="group-hover:hidden"
        />
        <Icon
          iconName="icon-more-horiz-hover"
          size="l"
          className="hidden group-hover:block"
        />
      </button>
      {shouldShowActionSheet && (
        <ActionSheet
          customId={customId}
          ref={actionSheetRef}
          onClose={closeActionSheet}
          openShareSheet={openShareSheet}
          openReportSheet={openReportSheet}
          openBlockSheet={openBlockSheet}
          position={position}
          typeOfUser={typeOfUser}
        />
      )}
      {shouldShowShareSheet && (
        <ShareSheet
          onClose={closeShareSheet}
          url={getMemberProfileUrl(customId, typeOfUser)}
        />
      )}
      {shouldShowReportSheet && <ReportSheet onClose={closeReportSheet} />}
      {shouldShowBlockSheet && (
        <BlockSheet customId={customId} onClose={closeBlockSheet} />
      )}
    </div>
  )
}

enum ActionType {
  CopyLink = 'copy-link',
  Share = 'Share',
  REPORT = 'report',
  BLOCK = 'block',
}

const actions = [
  { type: ActionType.CopyLink, text: '複製個人檔案連結', icon: 'icon-copy' },
  { type: ActionType.Share, text: '分享這個人的個人檔案', icon: 'icon-share' },
  { type: ActionType.REPORT, text: '檢舉', icon: 'icon-flag' },
  { type: ActionType.BLOCK, text: '封鎖', icon: 'icon-forbidden' },
] as const

const ActionSheet = forwardRef(function ActionSheet(
  {
    customId,
    openShareSheet,
    openBlockSheet,
    openReportSheet,
    position,
    onClose,
    typeOfUser,
  }: {
    customId: string
    openShareSheet: () => void
    openReportSheet: () => void
    openBlockSheet: () => void
    position: Position
    onClose: () => void
    typeOfUser: TypeOfUser
  },
  ref: ForwardedRef<HTMLDivElement>
) {
  const hasPosition = isPositionValid(position)
  const sheetMinWidth = 180
  const sheetButtonOverlap = 20
  const { addToast } = useToast()

  const onAction = async (type: ActionType) => {
    if (!customId) {
      addToast({ status: 'fail', text: TOAST_MESSAGE.moreActionError })
      console.error(`more action on profile error,customId : ${customId}`)
      return
    }
    switch (type) {
      case ActionType.CopyLink: {
        const storyUrl = getMemberProfileUrl(customId, typeOfUser)
        navigator.clipboard
          .writeText(storyUrl)
          .then(() => {
            addToast({
              status: 'success',
              text: TOAST_MESSAGE.copyStoryLinkSuccess,
            })
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
      case ActionType.REPORT:
        openReportSheet()
        break
      case ActionType.BLOCK:
        openBlockSheet()
        break
      default:
        break
    }
  }

  const alternativeClasses = hasPosition
    ? 'sm:fixed sm:right-[unset] sm:top-[unset]'
    : ''

  return createPortal(
    <div
      ref={ref}
      className={twMerge(
        'fixed bottom-0 left-0 z-modal flex w-full flex-col bg-white py-2 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1),0px_-8px_20px_0px_rgba(0,0,0,0.1)] sm:absolute sm:bottom-[unset] sm:left-[unset] sm:top-0 sm:w-[unset] sm:min-w-[180px] sm:rounded-md sm:px-0 sm:shadow-light-box',
        alternativeClasses
      )}
      style={
        hasPosition
          ? {
              top: position.top,
              left: position.left - sheetMinWidth + sheetButtonOverlap,
            }
          : undefined
      }
      onClick={(evt) => {
        evt.stopPropagation()
      }}
    >
      {actions.map((action) => {
        switch (action.type) {
          // TODO: wait for report and block functions
          case ActionType.REPORT:
            return null
          case ActionType.BLOCK:
            return null
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
    </div>,
    document.body
  )
})
