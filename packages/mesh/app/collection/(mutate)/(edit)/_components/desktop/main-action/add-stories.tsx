'use client'

import { useTranslations } from 'next-intl'

import DesktopGoNextButton from '../go-next-button'
import DesktopNavigation from '../navigtaion'

export default function DesktopAddStories() {
  const t = useTranslations('Pages.Collection')
  return (
    <>
      <DesktopNavigation />
      <div className="flex h-full flex-col gap-6 px-5">
        <div className="body-2 text-primary-500">
          {t('DesktopAddStories-hint')}
        </div>
      </div>
      <div className="px-5 py-3">
        <DesktopGoNextButton />
      </div>
    </>
  )
}
