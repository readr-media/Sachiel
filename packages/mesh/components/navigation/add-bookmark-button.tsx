'use client'

import { useTranslations } from 'next-intl'

import { addBookmark, removeBookmark } from '@/app/actions/bookmark'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import useRedirectLogin from '@/hooks/use-redirect-login'
import { BookmarkObjective } from '@/types/objective'

import Icon from '../icon'

export default function AddBookMarkButton({
  bookmarkObjective,
  targetId,
}: {
  bookmarkObjective: BookmarkObjective
  targetId: string
}) {
  const toastT = useTranslations('Others.toast')
  const { addToast } = useToast()
  const { user, setUser } = useUser()
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()
  const userBookmarkSetKey =
    bookmarkObjective === BookmarkObjective.Story
      ? 'bookmarkStoryIds'
      : ('bookmarkCollectionIds' as const)
  const isAddedBookmark = user[userBookmarkSetKey].has(targetId)

  const onToggleBookmark = async () => {
    if (detectIfShouldRedirectToLogin()) {
      return
    }
    if (isAddedBookmark) {
      const removeBookmarkResponse = await removeBookmark({
        memberId: user.memberId,
        // TODO: for now bookmark pub/sub only support storyId, update the param when pub/sub update
        storyId: targetId,
      })
      if (removeBookmarkResponse) {
        setUser((oldUser) => ({
          ...oldUser,
          [userBookmarkSetKey]: new Set(
            [...oldUser[userBookmarkSetKey]].filter(
              (bookmarkObjectId) => bookmarkObjectId !== targetId
            )
          ),
        }))
      } else {
        addToast({
          status: 'fail',
          text: toastT(TOAST_MESSAGE.deleteBookmarkFailed),
        })
      }
    } else {
      const addBookmarkResponse = await addBookmark({
        memberId: user.memberId,
        // TODO: for now bookmark pub/sub only support storyId, update the param when pub/sub update
        storyId: targetId,
      })
      if (addBookmarkResponse) {
        setUser((oldUser) => ({
          ...oldUser,
          [userBookmarkSetKey]: new Set([
            ...oldUser[userBookmarkSetKey],
            targetId,
          ]),
        }))
      } else {
        addToast({
          status: 'fail',
          text: toastT(TOAST_MESSAGE.addBookmarkFailed),
        })
      }
    }
  }
  return (
    <button
      type="button"
      className="flex size-11 items-center justify-center sm:size-6"
      onClick={onToggleBookmark}
    >
      <Icon
        iconName={isAddedBookmark ? 'icon-bookmark-off' : 'icon-bookmark'}
        size="l"
      />
    </button>
  )
}
