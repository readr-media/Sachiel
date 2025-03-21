'use client'

import { useTranslations } from 'next-intl'

import Button from '@/components/button'
import { useEditCollection } from '@/context/edit-collection'

import { DesktopEditCollectionType } from '../../_types/edit-collection'

export default function DesktopGoNextButton() {
  const t = useTranslations('Pages.Collection')
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
          text={t('DesktopGoNextButton-save')}
        />
      )
    case DesktopEditCollectionType.AddStories:
      return (
        <Button
          onClick={finishAddingStory}
          disabled={!isDesktopEditTypeFullfilled}
          size="lg"
          color="primary"
          text={t('DesktopGoNextButton-finish')}
        />
      )

    default:
      return null
  }
}
