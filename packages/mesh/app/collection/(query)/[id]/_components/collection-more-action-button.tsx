'use client'

import { useRouter } from 'next/navigation'
import type { ForwardedRef, MouseEventHandler, RefObject } from 'react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

import { removeCollection } from '@/app/actions/collection'
import Dialog from '@/components/dialog'
import Icon from '@/components/icon'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import useClickOutside from '@/hooks/use-click-outside'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import useRedirectLogin from '@/hooks/use-redirect-login'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

import type { Collection } from '../../_types/collection'

type Position = {
  top: number
  left: number
}

enum ActionType {
  EditTitle = 'edit-title',
  EditDescription = 'edit-description',
  EditStories = 'edit-stories',
  EditAll = 'edit-all',
  Delete = 'delete',
  Report = 'report',
}

type DialogActionType = ActionType.Delete | ActionType.Report

const isPositionValid = (position: Position) => {
  return Number.isFinite(position.top) && Number.isFinite(position.left)
}

export default function CollectionMoreActionButton({
  collection,
  nestedScrollContainerRef,
  className,
}: {
  collection: Collection
  nestedScrollContainerRef?: RefObject<HTMLElement>
  className?: string
}) {
  const { t } = useCustomTranslation()
  const [shouldShowActionSheet, setShouldShowActionSheet] = useState(false)
  const [position, setPosition] = useState<Position>({
    top: Infinity,
    left: Infinity,
  })
  const [dialogActionType, setDialogActionType] = useState<DialogActionType>(
    ActionType.Delete
  )
  const actionSheetRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()

  const { user } = useUser()
  const { addToast } = useToast()
  const { width } = useWindowDimensions()

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

  const openDialog = (dialogActionType: DialogActionType) => {
    setDialogActionType(dialogActionType)
    closeActionSheet()
    dialogRef.current?.showModal()
  }

  const dialogInfos = {
    [ActionType.Delete]: {
      title: t(
        'Pages.Collection.CollectionMoreActionButton-delete-title',
        '確認刪除集錦'
      ),
      description: t(
        'Pages.Collection.CollectionMoreActionButton-delete-warning',
        '此動作無法還原'
      ),
      primaryAction: {
        text: t(
          'Pages.Collection.CollectionMoreActionButton-delete-cancel',
          '取消'
        ),
        action: () => {
          dialogRef.current?.close()
        },
      },
      secondaryAction: {
        text: t(
          'Pages.Collection.CollectionMoreActionButton-delete',
          '刪除集錦'
        ),
        action: async () => {
          const response = await removeCollection({
            collectionId: collection.id,
            heroImageId: collection.heroImage?.id ?? '',
            memberId: user.memberId,
          })
          if (response) {
            router.push(`/profile/member/${user.customId}?tab=COLLECTIONS`)
          } else {
            addToast({
              status: 'fail',
              text: t(
                `Others.toast.${TOAST_MESSAGE.deleteCollectionFailed}`,
                '刪除集錦失敗，請重新嘗試'
              ),
            })
          }
          dialogRef.current?.close()
        },
      },
    },
    [ActionType.Report]: {
      title: t(
        'Pages.Collection.CollectionMoreActionButton-report-title',
        '檢舉成功'
      ),
      description: t(
        'Pages.Collection.CollectionMoreActionButton-report-detail',
        '我們已收到您的檢舉，感謝提供資訊。'
      ),
      primaryAction: {
        text: t(
          'Pages.Collection.CollectionMoreActionButton-report-confirm',
          '好的'
        ),
        action: () => {
          dialogRef.current?.close()
        },
      },
    },
  }

  const dialogInfo = dialogInfos[dialogActionType]

  useEffect(() => {
    const onScroll = () => {
      closeActionSheet()
    }
    const nestedScrollContainer = nestedScrollContainerRef?.current

    /**
     * Hide the action sheet when scroll, for scroll event on both window and nested scroll container (if exists).
     * Avoid complicated logic to set dynamic position.
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

  useEffect(() => {
    closeActionSheet()
  }, [closeActionSheet, width])

  return (
    <>
      <div className="relative">
        <button
          onClick={openActionSheet}
          className={twMerge(
            'group flex items-center justify-center',
            className
          )}
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
            collection={collection}
            ref={actionSheetRef}
            onClose={closeActionSheet}
            position={position}
            onOpenDialog={openDialog}
          />
        )}
      </div>
      <Dialog ref={dialogRef} {...dialogInfo} />
    </>
  )
}

const creatorActions = [
  {
    type: ActionType.EditTitle,
    textKey: 'CollectionMoreActionButton-action-edit-title',
    icon: 'icon-collection-edit',
    style: 'text-primary-700 lg:hidden',
  },
  {
    type: ActionType.EditDescription,
    textKey: 'CollectionMoreActionButton-action-edit-description',
    icon: 'icon-collection-edit',
    style: 'text-primary-700 lg:hidden',
  },
  {
    type: ActionType.EditStories,
    textKey: 'CollectionMoreActionButton-action-edit-stories',
    icon: 'icon-collection-edit-stories',
    style: 'text-primary-700 lg:hidden',
  },
  {
    type: ActionType.EditAll,
    textKey: 'CollectionMoreActionButton-action-edit-all',
    icon: 'icon-collection-edit',
    style: 'text-primary-700 hidden lg:flex',
  },
  {
    type: ActionType.Delete,
    textKey: 'CollectionMoreActionButton-action-edit-delete',
    icon: 'icon-collection-delete',
    style: 'text-custom-red-text',
  },
] as const

const visitorActions = [
  {
    type: ActionType.Report,
    textKey: 'CollectionMoreActionButton-action-report',
    icon: 'icon-collection-report',
    style: 'text-primary-700',
  },
] as const

const ActionSheet = forwardRef(function ActionSheet(
  {
    collection,
    position,
    onClose,
    onOpenDialog,
  }: {
    collection: Collection
    position: Position
    onClose: () => void
    onOpenDialog: (actionType: DialogActionType) => void
  },
  ref: ForwardedRef<HTMLDivElement>
) {
  const { t } = useCustomTranslation()
  const router = useRouter()
  const { user } = useUser()
  const { addToast } = useToast()
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()

  const hasPosition = isPositionValid(position)

  const isCreator = collection.creator?.customId === user.customId
  const actions = isCreator ? creatorActions : visitorActions
  const onAction = async (type: ActionType) => {
    if (!collection) {
      addToast({
        status: 'fail',
        text: t(
          `Others.toast.${TOAST_MESSAGE.moreActionError}`,
          '有點怪怪的，請稍後再試'
        ),
      })
      console.error(
        `more action on collection error, collection: ${collection}`
      )
    }
    switch (type) {
      case ActionType.EditTitle: {
        router.push(`${window.location.pathname}/edit-title`)
        break
      }
      case ActionType.EditDescription: {
        router.push(`${window.location.pathname}/edit-summary`)
        break
      }
      case ActionType.EditStories: {
        router.push(`${window.location.pathname}/edit-stories`)
        onClose()
        break
      }
      case ActionType.EditAll: {
        router.push(`${window.location.pathname}/edit`)
        break
      }
      case ActionType.Delete: {
        onOpenDialog(ActionType.Delete)
        break
      }
      case ActionType.Report: {
        // TODO: report the collection
        if (detectIfShouldRedirectToLogin()) {
          return
        }
        onOpenDialog(ActionType.Report)
        break
      }
      default:
        break
    }
  }

  return (
    <>
      {createPortal(
        <div
          ref={ref}
          className="fixed bottom-0 left-0 z-modal flex w-full flex-col bg-white py-2 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1),0px_-8px_20px_0px_rgba(0,0,0,0.1)] sm:fixed sm:inset-[unset] sm:top-0 sm:w-[unset] sm:min-w-[180px] sm:rounded-md sm:px-0 sm:shadow-light-box"
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
            return (
              <button
                key={action.type}
                className={`flex w-full cursor-pointer gap-1 px-5 py-3 hover:bg-primary-100 sm:w-auto sm:min-w-max sm:py-[9px] ${action.style}`}
                onClick={onAction.bind(null, action.type)}
              >
                <Icon iconName={action.icon} size="l" />
                <span className="button-large shrink-0">
                  {t(`Pages.Collection.${action.textKey}`, '')}
                </span>
              </button>
            )
          })}
        </div>,
        document.body
      )}
    </>
  )
})
