'use client'

import DesktopGoNextButton from '../go-next-button'
import DesktopNavigation from '../navigtaion'

export default function DesktopStep2SortStories() {
  return (
    <>
      <DesktopNavigation />
      <div className="flex h-full flex-col gap-6 px-5">
        <div className="body-2 text-primary-500">
          預設是以加入集錦的時間排序新聞，你也可以拖動新聞，重新排列順序。
        </div>
      </div>
      <div className="px-5 py-3">
        <DesktopGoNextButton />
      </div>
    </>
  )
}
