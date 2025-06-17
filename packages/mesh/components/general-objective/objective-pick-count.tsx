import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function ObjectivePickCount({
  picksCount,
  onClickDisplayPicker,
  disabled,
}: {
  picksCount: number
  onClickDisplayPicker: () => void
  disabled: boolean
}) {
  const { t } = useCustomTranslation()

  if (picksCount === 0) {
    return (
      <span>{t('Components.ObjectivePickCount.no-picks', '尚無人精選')}</span>
    )
  }

  const displayCount =
    picksCount < 10000
      ? picksCount
      : (Math.floor(picksCount / 1000) / 10).toFixed(1)

  return (
    <button
      onClick={onClickDisplayPicker}
      className={`${!disabled && 'hover-or-active:text-primary-700'}`}
      disabled={disabled}
    >
      <span className="pr-1 text-primary-700">{displayCount}</span>
      <span>
        {picksCount < 10000
          ? t('Components.ObjectivePickCount.pick-under-10000', '人精選')
          : t('Components.ObjectivePickCount.pick-over-10000', '萬人精選')}
      </span>
    </button>
  )
}
