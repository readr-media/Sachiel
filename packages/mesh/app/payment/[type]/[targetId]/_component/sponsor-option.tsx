import Icon, { type IconName } from '@/components/icon'

const sponsorshipOptions: {
  iconName: IconName
  points: number | undefined
  label: string
}[] = [
  { iconName: 'icon-sponsor-100', points: 100, label: '讀選點數' },
  { iconName: 'icon-sponsor-300', points: 300, label: '讀選點數' },
  { iconName: 'icon-sponsor-500', points: 500, label: '讀選點數' },
  { iconName: 'icon-sponsor-input', points: undefined, label: '讀選點數' },
]

export default function SponsorOption({
  publisherTitle,
  selectedOption,
  onClick,
}: {
  publisherTitle: string
  selectedOption: number | null
  onClick: (option: number, value: number | undefined) => void
}) {
  return (
    <div className="px-5 pt-5 sm:pb-10 sm:pt-4 lg:px-10">
      <div className="flex max-w-[600px] grow flex-col">
        <div className="flex flex-col gap-1">
          <p className="profile-title">
            贊助
            <span className="text-custom-blue">{publisherTitle}</span>
          </p>
          <p className="body-3 text-primary-500">
            支持喜歡的媒體，做出更多優質報導！
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 pb-5 pt-3 sm:grid-cols-4">
          {sponsorshipOptions.map((option, index) => {
            const { iconName, points, label } = option
            const isSelected = index === selectedOption
            return (
              <div key={index}>
                <div
                  className={`relative flex h-36 items-center justify-center rounded-md border ${
                    isSelected ? 'border-custom-blue' : 'border-primary-200'
                  }`}
                  onClick={() =>
                    onClick(index, sponsorshipOptions[index].points)
                  }
                >
                  <div className="flex flex-col items-center">
                    <Icon
                      iconName={iconName}
                      size={{ width: 60, height: 56 }}
                      className="pb-2"
                    />
                    <p className="profile-title-2 text-primary-600">
                      {points ?? '自訂'}
                    </p>
                    <p className="caption-1 text-primary-500">{label}</p>
                    <Icon
                      iconName={
                        isSelected
                          ? 'icon-check-circle-blue'
                          : 'icon-check-circle-empty'
                      }
                      size="l"
                      className="absolute right-2 top-2"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col gap-3 py-5">
          <p className="profile-title">贊助須知</p>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">1</span>
            <div className="flex flex-col gap-1">
              <p>第一條。格式跟文章頁的註解一樣。</p>
            </div>
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">2</span>
            <div className="flex flex-col gap-1">
              <p>
                註解二。有超過一段的話。月方案計算天數為 30 日，年方案計算天數為
                365 日。
              </p>
              <p>
                這是註解二的第二段。月訂閱方案經會員授權扣款購買即為完成服務，因此月費會員無法退費，但可取消繼續訂閱。
              </p>
            </div>
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">3</span>
            <div className="flex flex-col gap-1">
              <p>第一條。格式跟文章頁的註解一樣。</p>
            </div>
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">4</span>
            <div className="flex flex-col gap-1">
              <p>
                註解二。有超過一段的話。月方案計算天數為 30 日，年方案計算天數為
                365 日。
              </p>
              <p>
                這是註解二的第二段。月訂閱方案經會員授權扣款購買即為完成服務，因此月費會員無法退費，但可取消繼續訂閱。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
