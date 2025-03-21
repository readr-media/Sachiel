'use client'

import { useTranslations } from 'next-intl'

import Button from '@/components/button'
import { useEditCollection } from '@/context/edit-collection'

import { MobileEditCollectionType } from '../../_types/edit-collection'

export default function TabletGoNextButton() {
  const t = useTranslations('Pages.Collection')
  const {
    mobileEditType,
    setMobileEditType,
    isMobileEditTypeFullfilled,
    updateCollectionTitleAndHeroImage,
    updateCollectionSummary,
    updateCollectionPicks,
  } = useEditCollection()

  const finishAddingStory = () => {
    setMobileEditType(MobileEditCollectionType.EditStories)
  }

  switch (mobileEditType) {
    case MobileEditCollectionType.EditTitle:
      return (
        <Button
          text={t('TabletGoNextButton-save')}
          size="lg"
          color="primary"
          disabled={!isMobileEditTypeFullfilled}
          onClick={updateCollectionTitleAndHeroImage}
        />
      )
    case MobileEditCollectionType.EditSummary:
      return (
        <Button
          text={t('TabletGoNextButton-save')}
          size="lg"
          color="primary"
          disabled={!isMobileEditTypeFullfilled}
          onClick={updateCollectionSummary}
        />
      )
    case MobileEditCollectionType.EditStories:
      return (
        <Button
          text={t('TabletGoNextButton-save')}
          size="lg"
          color="primary"
          disabled={!isMobileEditTypeFullfilled}
          onClick={updateCollectionPicks}
        />
      )
    case MobileEditCollectionType.AddStories:
      return (
        <Button
          text={t('TabletGoNextButton-finish')}
          size="lg"
          color="primary"
          disabled={!isMobileEditTypeFullfilled}
          onClick={finishAddingStory}
        />
      )
    default:
      return null
  }
}
