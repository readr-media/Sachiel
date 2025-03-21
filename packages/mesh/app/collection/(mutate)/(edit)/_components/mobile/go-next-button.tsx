'use client'

import { useTranslations } from 'use-intl'

import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import { useEditCollection } from '@/context/edit-collection'

import { MobileEditCollectionType } from '../../_types/edit-collection'

export default function MobileGoNextButton() {
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

  if (!isMobileEditTypeFullfilled) return null

  switch (mobileEditType) {
    case MobileEditCollectionType.EditTitle:
      return (
        <MobileNavigationButton
          text={t('MobileGoNextButton-save')}
          type="text"
          onClick={updateCollectionTitleAndHeroImage}
          color="blue"
        />
      )
    case MobileEditCollectionType.EditSummary:
      return (
        <MobileNavigationButton
          text={t('MobileGoNextButton-save')}
          type="text"
          onClick={updateCollectionSummary}
          color="blue"
        />
      )
    case MobileEditCollectionType.EditStories:
      return (
        <MobileNavigationButton
          text={t('MobileGoNextButton-save')}
          type="text"
          onClick={updateCollectionPicks}
          color="blue"
        />
      )
    case MobileEditCollectionType.AddStories:
      return (
        <MobileNavigationButton
          text={t('MobileGoNextButton-finish')}
          type="text"
          onClick={finishAddingStory}
          color="blue"
        />
      )
    default:
      return null
  }
}
