'use client'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

import DesktopGoNextButton from '../go-next-button'
import DesktopNavigation from '../navigtaion'

export default function DesktopStep2SortStories() {
  const { t } = useCustomTranslation()

  return (
    <>
      <DesktopNavigation />
      <div className="flex h-full flex-col gap-6 px-5">
        <div className="body-2 text-primary-500">
          {t(
            'Pages.Collection.DesktopStep2SortStories-detail',
            '預設是以加入集錦的時間排序新聞，你也可以拖動新聞，重新排列順序。'
          )}
        </div>
      </div>
      <div className="px-5 py-3">
        <DesktopGoNextButton />
      </div>
    </>
  )
}
