import { type MouseEventHandler } from 'react'
import { twMerge } from 'tailwind-merge'
import { type XOR } from 'ts-xor'

import Icon, { type IconName } from '@/components/icon'

type TextColor = 'gray' | 'blue'

type NavigationIcon =
  | 'icon-chevron-left'
  | 'icon-more-horiz'
  | 'icon-share'
  | 'icon-bookmark'
  | 'icon-setting'
  | 'icon-navigate-previous'

export type NavigationButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
} & XOR<
  {
    type: 'icon'
    icon: NavigationIcon
  },
  {
    type: 'text'
    text: string
    color: TextColor
    customCss?: string
  }
>

export default function MobileNavigationButton({
  type,
  icon,
  onClick,
  text,
  color,
  customCss = '',
}: NavigationButtonProps) {
  switch (type) {
    case 'icon':
      return <IconButton icon={icon} onClick={onClick} />

    case 'text':
      return (
        <TextButton
          color={color}
          text={text}
          customCss={customCss}
          onClick={onClick}
        />
      )
    default:
      return null
  }
}

const IconButton = ({
  onClick,
  icon,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
  icon: IconName
}) => {
  return (
    <button
      type="button"
      className="flex size-11 items-center justify-center"
      onClick={onClick}
    >
      <Icon iconName={icon} size="m" />
    </button>
  )
}

const colorMap = {
  blue: 'text-custom-blue',
  gray: 'text-primary-500',
} as const

const TextButton = ({
  color,
  text,
  onClick,
  customCss,
}: {
  color: TextColor
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
  customCss: string
}) => {
  return (
    <button
      className={twMerge('list-title mx-3', colorMap[color], customCss)}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
