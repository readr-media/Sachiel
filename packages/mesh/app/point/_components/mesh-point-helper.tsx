'use client'
import Icon from '@/components/icon'

import TooltipButton from './tooltip-button'

export default function MeshPointHelper() {
  return (
    <div className="flex flex-row items-center justify-center sm:justify-start">
      <p className="profile-subtitle text-primary-500">讀選點數</p>
      <TooltipButton
        className="h-6 w-6"
        color="dark"
        direction="bottom"
        buttonContent={
          <Icon
            iconName="icon-question-mark-circle"
            size="m"
            className="h-6 w-6"
          />
        }
        tooltipText="讀選點數（READR）能用來贊助媒體、支持你喜歡的報導。你可以透過閱讀新聞獲得讀選點數。"
        onClick={() => console.log('velociraptor')}
      />
    </div>
  )
}
