import { useTranslations } from 'next-intl'

export default function NoRecord() {
  const t = useTranslations('Page.Point-Subscribe-Stories')

  return (
    <div className="flex h-[calc(100vh-124px)] items-center justify-center bg-multi-layer-light sm:h-[calc(100vh-445px)] sm:bg-transparent">
      <p className="button-large w-dvw text-center text-primary-400">
        {t('Page-no-record')}
      </p>
    </div>
  )
}
