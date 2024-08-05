import Link from 'next/link'

import Icon from '@/components/icon'

import TooltipButton from './tooltip-button'

export default function MeshPointHelper() {
  return (
    <div className="inline-flex justify-center sm:justify-start">
      <TooltipButton
        color="dark"
        direction="bottom"
        buttonContent={
          <>
            <p className="profile-subtitle text-primary-500">讀選點數</p>
            <Icon
              iconName="icon-question-mark-circle"
              size="m"
              className="size-6"
            />
          </>
        }
        tooltipContent={
          <div className="flex flex-col items-start gap-2">
            <p className="caption-1">
              讀選點數（READR）能用來贊助媒體、支持你喜歡的報導。你可以透過閱讀新聞獲得讀選點數。
            </p>
            <Link href={'/'} target={'_blank'} className="footnote">
              {/*TODO: update link */}
              了解更多
            </Link>
          </div>
        }
      />
    </div>
  )
}
