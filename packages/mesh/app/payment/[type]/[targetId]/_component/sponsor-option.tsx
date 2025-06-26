import Icon, { type IconName } from '@/components/icon'

export enum SponsorshipPoints {
  SPONSOR_100 = 100,
  SPONSOR_300 = 300,
  SPONSOR_500 = 500,
}

const sponsorshipOptions: {
  iconName: IconName
  points: SponsorshipPoints | undefined
  label: string
}[] = [
  {
    iconName: 'icon-sponsor-100',
    points: SponsorshipPoints.SPONSOR_100,
    label: '讀選點數',
  },
  {
    iconName: 'icon-sponsor-300',
    points: SponsorshipPoints.SPONSOR_300,
    label: '讀選點數',
  },
  {
    iconName: 'icon-sponsor-500',
    points: SponsorshipPoints.SPONSOR_500,
    label: '讀選點數',
  },
  { iconName: 'icon-sponsor-input', points: undefined, label: '讀選點數' },
]

export default function SponsorOption({
  publisherTitle,
  selectedOption,
  onClick,
}: {
  publisherTitle: string
  selectedOption: SponsorshipPoints | undefined | null
  onClick: (value: SponsorshipPoints | undefined) => void
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
            const isSelected = points === selectedOption
            return (
              <div key={index}>
                <div
                  className={`relative flex h-36 items-center justify-center rounded-md border ${
                    isSelected ? 'border-custom-blue' : 'border-primary-200'
                  }`}
                  onClick={() => onClick(sponsorshipOptions[index].points)}
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
              <p>
                贊助方式：您可以選擇平台提供的預設贊助點數金額，或是自行設置您想要的贊助額度，支持您喜愛的媒體。
              </p>
            </div>
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">2</span>
            <div className="flex flex-col gap-1">
              <p>
                贊助用途：您的贊助將直接用於支持該媒體的內容創作、報導開支和平台運營，以維持優質內容的持續輸出。
              </p>
            </div>
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">3</span>
            <div className="flex flex-col gap-1">
              <p>
                贊助確認：每筆贊助完成後無法取消或退還，請確認贊助金額無誤後再提交。
              </p>
            </div>
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">4</span>
            <div className="flex flex-col gap-1">
              <p>
                紀錄查詢：您可以在個人帳戶的【讀選點數】頁面中查看已完成的贊助詳情，隨時掌握您的支付狀態。
              </p>
              <p>
                若有任何疑問或遇到贊助問題，歡迎聯繫我們的客服團隊。我們將隨時為您提供協助。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
