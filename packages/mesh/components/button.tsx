import type { ButtonHTMLAttributes } from 'react'

import Icon, { type IconProps } from './icon'

export type ButtonColor = keyof typeof buttonColor

const buttonColor = {
  transparent:
    'bg-transparent text-primary-700 border border-primary-700 hover:bg-primary-100 disabled:bg-disable disabled:text-primary-400 disabled:border-none disabled:cursor-not-allowed',
  'transparent-no-border':
    'bg-transparent text-custom-blue hover:bg-primary-100 disabled:bg-disable disabled:text-primary-400 disabled:border-none disabled:cursor-not-allowed',
  'transparent-blue':
    'bg-transparent text-custom-blue disabled:bg-disable disabled:text-primary-400 disabled:border-none disabled:cursor-not-allowed',
  white:
    'bg-white text-primary-700 border border-primary-700 hover:bg-primary-100 disabled:bg-disable disabled:text-primary-400 disabled:border-none disabled:cursor-not-allowed',
  'custom-blue':
    'bg-custom-blue text-white disabled:bg-disable disabled:text-primary-400 disabled:cursor-not-allowed hover-or-active:bg-custom-blue-hover',
  'blue-500':
    'bg-blue-500 text-white disabled:bg-disable disabled:text-primary-400 disabled:cursor-not-allowed',
  primary:
    'bg-primary-700 text-white border border-transparent hover:bg-primary-800 disabled:bg-disable disabled:text-primary-400 disabled:cursor-not-allowed',
  'primary-outlined':
    'text-primary-700 border border-primary-700 active:bg-primary-100 hover:bg-primary-100 disabled:bg-disable disabled:text-primary-400 disabled:cursor-not-allowed',
  'nav-button-add':
    'bg-white text-primary-700 border border-primary-200 hover:bg-primary-100 hover:border-primary-700',
  'nav-chip':
    'bg-multi-layer-light text-primary-700 hover:bg-custom-gray-light',
  lightbox:
    'bg-white text-primary-700 border border-primary-200 hover:bg-primary-100 disabled:bg-disable disabled:text-primary-400 disabled:border-none disabled:cursor-not-allowed',
}
const buttonStyles = {
  xs: 'profile-subtitle h-[36px] px-4 py-2 rounded-[100px]', // Nav Chip, Nav Button-Add
  sm: 'button h-8 px-3 py-1 rounded', // all Button Mini
  md: 'button-large h-[38px] px-5 py-2 rounded', // Secondary Button
  'md-100': 'button-large h-[38px] px-4 py-2 rounded-[100px]', // Lightbox Chip
  'md-large': 'button-large w-full h-10 px-5 py-2 rounded', // secondary Button
  lg: 'button-large w-full h-[46px] px-6 py-3 rounded', // Primary Button, Second Button (wide)
}

export default function Button({
  size,
  color,
  text,
  icon,
  activeState,
  disabled,
  type,
  onClick,
}: {
  size: keyof typeof buttonStyles
  color: keyof typeof buttonColor
  text: string
  icon?: IconProps
  activeState?: {
    isActive: boolean
    activeText?: string
    activeIcon?: IconProps
  }
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
  const {
    isActive = false,
    activeText = '',
    activeIcon = null,
  } = activeState || {}

  return (
    <button
      className={`flex ${buttonStyles[size]} items-center justify-center ${
        isActive ? buttonColor['primary'] : buttonColor[color]
      } `}
      onClick={onClick}
      type={type ?? 'button'}
      disabled={disabled}
    >
      <div
        className={`
          ${
            icon && size !== 'lg'
              ? 'flex translate-x-[-2px] items-center'
              : 'flex items-center'
          }`}
      >
        {icon && (
          <div
            className={size === 'sm' ? 'mr-0.5' : size === 'lg' ? 'mr-1' : ''}
          >
            {isActive && activeIcon ? (
              <Icon {...activeIcon} />
            ) : (
              <Icon {...icon} />
            )}
          </div>
        )}
        {isActive && activeText !== '' ? activeText : text}
      </div>
    </button>
  )
}
