import { useTranslations } from 'next-intl'

import Icon, { type IconName } from '@/components/icon'

export enum SponsorshipPoints {
  SPONSOR_100 = 100,
  SPONSOR_300 = 300,
  SPONSOR_500 = 500,
}

const sponsorshipOptions: {
  iconName: IconName
  points: SponsorshipPoints | undefined
  labelKey: string
}[] = [
  {
    iconName: 'icon-sponsor-100',
    points: SponsorshipPoints.SPONSOR_100,
    labelKey: 'SponsorOption-mesh-point',
  },
  {
    iconName: 'icon-sponsor-300',
    points: SponsorshipPoints.SPONSOR_300,
    labelKey: 'SponsorOption-mesh-point',
  },
  {
    iconName: 'icon-sponsor-500',
    points: SponsorshipPoints.SPONSOR_500,
    labelKey: 'SponsorOption-mesh-point',
  },
  {
    iconName: 'icon-sponsor-input',
    points: undefined,
    labelKey: 'SponsorOption-mesh-point',
  },
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
  const t = useTranslations('Pages.Payment')
  return (
    <div className="px-5 pt-5 sm:pb-10 sm:pt-4 lg:px-10">
      <div className="flex max-w-[600px] grow flex-col">
        <div className="flex flex-col gap-1">
          <p className="profile-title">
            {t('SponsorOption-sponsor')}
            <span className="text-custom-blue">{publisherTitle}</span>
          </p>
          <p className="body-3 text-primary-500">
            {t('SponsorOption-support-publisher')}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 pb-5 pt-3 sm:grid-cols-4">
          {sponsorshipOptions.map((option, index) => {
            const { iconName, points, labelKey } = option
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
                      {points ?? t('SponsorOption-custom')}
                    </p>
                    <p className="caption-1 text-primary-500">{t(labelKey)}</p>
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
          <p className="profile-title">{t('SponsorOption-good-to-know')}</p>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">1</span>
            <div className="flex flex-col gap-1">
              <p>{t('SponsorOption-how-to-sponsor')}</p>
            </div>
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">2</span>
            <div className="flex flex-col gap-1">
              <p>{t('SponsorOption-where-the-money-go')}</p>
            </div>
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">3</span>
            <div className="flex flex-col gap-1">
              <p>{t('SponsorOption-confirm-sponsor')}</p>
            </div>
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="pr-3">4</span>
            <div className="flex flex-col gap-1">
              <p>{t('SponsorOption-check-record')}</p>
              <p>{t('SponsorOption-reach-us')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
