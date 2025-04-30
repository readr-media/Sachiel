import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function TransactionOngoing() {
  const { t } = useCustomTranslation()

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white pb-[60px]">
      <div className="flex grow flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <div className="dot-flashing" />
          <div className="body-2 text-center text-primary-500">
            {t(
              'Components.TransactionOngoing.transaction-on-going-1',
              '交易進行中'
            )}
            <br />
            {t(
              'Components.TransactionOngoing.transaction-on-going-2',
              '請稍候，感謝您的耐心'
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
