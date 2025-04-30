import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function NoRecord() {
  const { t } = useCustomTranslation()

  return (
    <div className="flex h-[calc(100vh-124px)] items-center justify-center bg-multi-layer-light sm:h-[calc(100vh-445px)] sm:bg-transparent">
      <p className="button-large w-dvw text-center text-primary-400">
        {t(
          'Page.Point-Subscribe-Stories.Page-no-record',
          '目前還沒有訂閱中的文章'
        )}
      </p>
    </div>
  )
}
