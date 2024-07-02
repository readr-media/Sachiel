import Icon, { type IconProps } from './icon'

export default function Button({
  size,
  color,
  text,
  icon,
  activeState,
  disabled,
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
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) {
  const buttonColor = {
    transparent:
      'bg-transparent text-primary-700 border border-primary-700 hover:bg-primary-100 disabled:bg-disable disabled:text-primary-400 disabled:border-none disabled:cursor-not-allowed',
    white:
      'bg-white text-primary-700 border border-primary-700 hover:bg-primary-100 disabled:bg-disable disabled:text-primary-400 disabled:border-none disabled:cursor-not-allowed',
    'custom-blue':
      'bg-custom-blue text-white disabled:bg-disable disabled:text-primary-400 disabled:cursor-not-allowed',
    primary:
      'bg-primary-700 text-white hover:bg-primary-800 disabled:bg-disable disabled:text-primary-400 disabled:cursor-not-allowed',
    gray: 'bg-primary-700-dark text-primary-700 hover:bg-custom-gray-light',
  }
  const buttonStyles = {
    xs: 'profile-subtitle h-[36px] px-4 py-2 rounded-[100px]',
    sm: 'button h-8 px-3 py-1 rounded', // all Button Mini
    md: 'button-large h-[38px] px-5 py-2 rounded', // Secondary Button
    'md-100': 'button-large h-[38px] px-4 py-2 rounded-[100px]',
    lg: 'button-large w-full h-[46px] px-6 py-3 rounded', // Primary Button, Second Button (wide)
  }

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
      disabled={disabled}
    >
      <div
        className={`${
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
