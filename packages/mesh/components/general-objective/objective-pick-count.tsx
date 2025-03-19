import { useTranslations } from 'next-intl'

export default function ObjectivePickCount({
  picksCount,
  onClickDisplayPicker,
  disabled,
}: {
  picksCount: number
  onClickDisplayPicker: () => void
  disabled: boolean
}) {
  const t = useTranslations('Components.ObjectivePickCount')
  if (picksCount === 0) {
    return <span>{t('no-picks')}</span>
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
        {picksCount < 10000 ? t('pick-under-10000') : t('pick-over-10000')}
      </span>
    </button>
  )
}
