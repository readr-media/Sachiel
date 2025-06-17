'use client'

import Icon from '@/components/icon'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function NotExist() {
  const { t } = useCustomTranslation()
  return (
    <main className="flex max-w-[theme(width.maxMain)] grow flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <Icon
          iconName="icon-deleted-collection"
          size={{ width: 80, height: 80 }}
        />
        <div className="flex flex-col items-center gap-1">
          <h1 className="title-1 text-primary-700">
            {t('Pages.Collection.NotExist-title', '集錦不存在')}
          </h1>
          <span className="body-3 text-primary-600">
            {t('Pages.Collection.NotExist-description', '這個集錦已經被刪除了')}
          </span>
        </div>
      </div>
    </main>
  )
}
