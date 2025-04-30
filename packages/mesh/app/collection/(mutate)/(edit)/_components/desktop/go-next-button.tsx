'use client'

import Button from '@/components/button'
import { useEditCollection } from '@/context/edit-collection'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

import { DesktopEditCollectionType } from '../../_types/edit-collection'

export default function DesktopGoNextButton() {
  const { t } = useCustomTranslation()
  const {
    setDesktopEditType,
    desktopEditType,
    isDesktopEditTypeFullfilled,
    updateWholeCollection,
  } = useEditCollection()

  const finishAddingStory = () => {
    setDesktopEditType(DesktopEditCollectionType.EditAll)
  }

  switch (desktopEditType) {
    case DesktopEditCollectionType.EditAll:
      return (
        <Button
          onClick={updateWholeCollection}
          disabled={!isDesktopEditTypeFullfilled}
          size="lg"
          color="primary"
          text={t('Pages.Collection.DesktopGoNextButton-save', '儲存')}
        />
      )
    case DesktopEditCollectionType.AddStories:
      return (
        <Button
          onClick={finishAddingStory}
          disabled={!isDesktopEditTypeFullfilled}
          size="lg"
          color="primary"
          text={t('Pages.Collection.DesktopGoNextButton-finish', '完成')}
        />
      )

    default:
      return null
  }
}
