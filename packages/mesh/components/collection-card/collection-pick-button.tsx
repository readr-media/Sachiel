'use client'

import type { ButtonColor, ButtonSize } from '@/components/button'
import Button from '@/components/button'
import { usePickModal } from '@/context/pick-modal'
import { useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import useRedirectLogin from '@/hooks/use-redirect-login'
import { PickObjective } from '@/types/objective'
import { debounce } from '@/utils/performance'

export default function CollectionPickButton({
  collectionId,
  collectionTitle,
  color = 'white',
  size = 'sm',
  gtmClassName = '',
}: {
  collectionId: string
  collectionTitle: string
  color?: ButtonColor
  size?: ButtonSize
  gtmClassName?: string
}) {
  const { t } = useCustomTranslation()
  const { user } = useUser()
  const { openPickModal } = usePickModal()
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()
  const isStoryPicked = user.pickCollectionIds.has(collectionId)

  const handleClickPick = debounce(async () => {
    if (detectIfShouldRedirectToLogin()) {
      return
    }
    openPickModal(
      PickObjective.Collection,
      collectionId,
      collectionTitle,
      isStoryPicked
    )
  })

  return (
    <Button
      size={size}
      color={color}
      text={t('Components.CollectionPickButton.pick', '精選')}
      icon={{ iconName: 'icon-star-primary', size: 's' }}
      onClick={handleClickPick}
      activeState={{
        isActive: isStoryPicked,
        activeText: t(
          'Components.CollectionPickButton.already-picked',
          '已精選'
        ),
        activeIcon: { iconName: 'icon-star-white', size: 's' },
      }}
      gtmClassName={gtmClassName}
    />
  )
}
