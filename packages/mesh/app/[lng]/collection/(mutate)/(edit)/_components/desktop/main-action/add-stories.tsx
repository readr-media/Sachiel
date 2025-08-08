'use client'

import DesktopGoNextButton from '../go-next-button'
import DesktopNavigation from '../navigtaion'

export default function DesktopAddStories() {
  return (
    <>
      <DesktopNavigation />
      <div className="flex h-full flex-col gap-6 px-5">
        <div className="body-2 text-primary-500">
          從你的精選文章、書籤或全站文章中，挑選要加入集錦的文章
        </div>
      </div>
      <div className="px-5 py-3">
        <DesktopGoNextButton />
      </div>
    </>
  )
}
