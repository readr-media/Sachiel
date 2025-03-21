import { useTranslations } from 'next-intl'

export default function TransactionOngoing() {
  const t = useTranslations('Components.TransactionOngoing')
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white pb-[60px]">
      <div className="flex grow flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <div className="dot-flashing" />
          <div className="body-2 text-center text-primary-500">
            {t('transaction-on-going-1')}
            <br />
            {t('transaction-on-going-2')}
          </div>
        </div>
      </div>
    </div>
  )
}
