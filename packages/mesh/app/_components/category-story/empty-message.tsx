import { useTranslations } from 'next-intl'

import Icon from '@/components/icon'

export default function EmptyMessage() {
  const t = useTranslations('Pages.Home')
  return (
    <div className="flex flex-col items-center py-10">
      <div className="mb-5">
        <Icon iconName="icon-404" size={{ width: 80, height: 80 }} />
      </div>
      <p className="title-1 mb-1 text-primary-700">{t('EmptyMessage-title')}</p>
      <p className="body-3 text-primary-600">{t('EmptyMessage-description')}</p>
    </div>
  )
}
