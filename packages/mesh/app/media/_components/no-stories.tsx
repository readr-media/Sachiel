'use client'

import Icon from '@/components/icon'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function NoStories() {
  const { t } = useCustomTranslation()
  return (
    <>
      <div className="flex flex-col items-center sm:grow sm:bg-multi-layer-light sm:py-10">
        <div className="flex w-full max-w-[600px] flex-col items-center bg-white p-5 pb-8 sm:rounded-md sm:px-10 sm:py-15">
          <Icon iconName="icon-no-story" size={{ width: 91, height: 62 }} />
          <h1 className="title-1 mt-6 text-primary-700">
            {t('Pages.Media.NoStories-title', '這個分類沒有新文章')}
          </h1>
          <h2 className="body-2 mt-2 text-primary-500">
            {t('Pages.Media.NoStories-description', '看看其他分類吧👆')}
          </h2>
        </div>
      </div>
    </>
  )
}
