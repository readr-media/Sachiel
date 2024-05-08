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
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const buttonColor = {
    transparent:
      'bg-transparent text-primary-700 border border-primary-700 disabled:bg-disable disabled:text-primary-400 disabled:border-none disabled:cursor-not-allowed',
    white:
      'bg-white text-primary-700 border border-primary-700 hover:bg-primary-100 disabled:bg-disable disabled:text-primary-400 disabled:border-none disabled:cursor-not-allowed',
    blue: 'bg-custom-blue text-white disabled:bg-disable disabled:text-primary-400 disabled:cursor-not-allowed',
    primary:
      'bg-primary-700 text-white hover:bg-primary-800 disabled:bg-disable disabled:text-primary-400 disabled:cursor-not-allowed',
  }
  const buttonStyles = {
    xs: 'h-[30px] px-4 py-2 rounded-[100px] text-sm',
    sm: 'h-8 px-3 py-1 rounded text-sm gap-0.5',
    md: 'h-[38px] px-5 py-2 rounded text-base',
    'md-100': 'h-[38px] px-4 py-2 rounded-[100px] text-base',
    lg: 'w-full h-[46px] rounded text-base gap-1',
  }

  const {
    isActive = false,
    activeText = '',
    activeIcon = null,
  } = activeState || {}

  return (
    <button
      className={`flex ${
        buttonStyles[size]
      } items-center justify-center font-normal ${
        isActive ? buttonColor['primary'] : buttonColor[color]
      } `}
      onClick={onClick}
      disabled={disabled}
    >
      {isActive && activeIcon ? (
        <Icon {...activeIcon} />
      ) : icon ? (
        <Icon {...icon} />
      ) : null}
      {isActive && activeText !== '' ? activeText : text}
    </button>
  )
}
