import Icon, { type IconProps } from './icon'

export default function Button({
  size,
  bgColor,
  text,
  icon,
  activeState,
  disable,
  onClick,
}: {
  size: keyof typeof sizeDefault
  bgColor: keyof typeof colorDefault
  text: string
  icon?: IconProps
  activeState?: {
    isActive: boolean
    activeText?: string
    activeIcon?: IconProps
  }
  disable?: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const colorDefault = {
    white:
      'bg-white text-primary-700 border border-primary-700 hover:bg-primary-100 disabled:bg-disable disabled:text-primary-400 disabled:border-none disabled:cursor-not-allowed',
    blue: 'bg-custom-blue text-white disabled:bg-disable disabled:text-primary-400 disabled:cursor-not-allowed',
    primary:
      'bg-primary-700 text-white hover:bg-primary-800 disabled:bg-disable disabled:text-primary-400 disabled:cursor-not-allowed',
  }
  const sizeDefault = {
    xs: 'h-[30px] px-4 py-2 rounded-[100px]',
    sm: 'h-8 px-3 py-1 rounded',
    md: 'h-[38px] px-5 py-2 rounded',
    'md-100': 'h-[38px] px-4 py-2 rounded-[100px]',
    lg: 'w-full h-[46px] rounded',
  }

  const fontSize = size === 'xs' || size === 'sm' ? 'text-sm' : 'text-base'
  const {
    isActive = false,
    activeText = '',
    activeIcon = null,
  } = activeState || {}

  return (
    <button
      className={`flex ${sizeDefault[size]} items-center justify-center ${
        isActive ? colorDefault['primary'] : colorDefault[bgColor]
      } `}
      onClick={onClick}
      disabled={disable}
    >
      <span className="flex items-center">
        {isActive && activeIcon ? (
          <Icon {...activeIcon} />
        ) : icon ? (
          <Icon {...icon} />
        ) : null}
        <div className={`${fontSize} font-normal`}>
          {isActive && activeText !== '' ? activeText : text}
        </div>
      </span>
    </button>
  )
}
