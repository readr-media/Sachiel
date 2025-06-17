'use client'

import { addBookmark, removeBookmark } from '@/app/actions/bookmark'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
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
  const { t } = useCustomTranslation()
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
          text: t(
            `Others.toast.${TOAST_MESSAGE.deleteBookmarkFailed}`,
            '刪除書籤失敗，請重新嘗試'
          ),
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
          text: t(
            `Others.toast.${TOAST_MESSAGE.addBookmarkFailed}`,
            '加入書籤失敗，請重新嘗試'
          ),
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
