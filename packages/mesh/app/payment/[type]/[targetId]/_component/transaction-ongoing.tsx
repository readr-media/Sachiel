import Icon from '@/components/icon'

export default function TransactionOngoing() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white pb-[60px]">
      <div className="flex grow flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <div className="dot-flashing" />
          <div className="body-2 text-center text-primary-500">
            交易進行中
            <br />
            您可以稍後再回來查看交易結果
          </div>
        </div>
      </div>
      <div>
        <a
          className="footnote flex items-center text-primary-500"
          href="/"
          target="_blank"
        >
          回首頁
          <Icon iconName="icon-open-new-tab-gray" size="m" />
        </a>
      </div>
    </div>
  )
}
