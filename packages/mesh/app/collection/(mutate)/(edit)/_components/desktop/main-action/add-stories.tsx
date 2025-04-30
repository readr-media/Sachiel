'use client'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

import DesktopGoNextButton from '../go-next-button'
import DesktopNavigation from '../navigtaion'

export default function DesktopAddStories() {
  const { t } = useCustomTranslation()
  return (
    <>
      <DesktopNavigation />
      <div className="flex h-full flex-col gap-6 px-5">
        <div className="body-2 text-primary-500">
          {t(
            'Pages.Collection.DesktopAddStories-hint',
            '從你的精選文章、書籤或全站文章中，挑選要加入集錦的文章'
          )}
        </div>
      </div>
      <div className="px-5 py-3">
        <DesktopGoNextButton />
      </div>
    </>
  )
}
