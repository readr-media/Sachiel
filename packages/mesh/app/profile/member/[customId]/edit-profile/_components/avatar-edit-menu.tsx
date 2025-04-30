import { useRef } from 'react'

import Icon from '@/components/icon'
import { useUser } from '@/context/user'
import useClickOutside from '@/hooks/use-click-outside'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

type AvatarEditMenu = {
  handleDeletePhoto: () => void
  hideBottomMenu: () => void
}

export default function AvatarEditMenu({
  hideBottomMenu,
  handleDeletePhoto,
}: AvatarEditMenu) {
  const { t } = useCustomTranslation()
  const { user } = useUser()
  const menuRef = useRef(null)
  useClickOutside(menuRef, hideBottomMenu)
  return (
    <ul
      ref={menuRef}
      onClick={(e) => {
        e.stopPropagation()
      }}
      className="absolute left-1/2 top-1/2 flex h-fit w-[180px] flex-col gap-6 bg-white p-5 shadow-bottom-sheet transition-all"
    >
      <li className="button-large text-primary-700">
        <label htmlFor="avatar" className="flex cursor-pointer gap-1">
          <Icon iconName="icon-photo" size="l" />
          {t('Pages.Edit-Profile.AvatarEditMenu-select-photo', '選擇相片')}
        </label>
      </li>
      {user.avatarImageId && (
        <li
          className="button-large flex gap-1 text-custom-red-text"
          onClick={handleDeletePhoto}
        >
          <Icon iconName="icon-delete" size="l" />
          {t('Pages.Edit-Profile.AvatarEditMenu-remove-avatar', '刪除大頭貼照')}
        </li>
      )}
    </ul>
  )
}
