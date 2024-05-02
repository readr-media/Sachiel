import React from 'react'

export default function IconButton({
  size,
  bgColor,
  text,
  activeText,
  isActive,
  children,
  disable,
  onClick,
}: React.PropsWithChildren<{
  size: keyof typeof sizeDefault
  bgColor: keyof typeof colorVariants
  text: string
  activeText?: string
  isActive?: boolean
  disable?: boolean
  children?: React.ReactNode
  onClick: () => void
}>) {
  const colorVariants = {
    white:
      'bg-white text-primary-700 border border-primary-700 hover:bg-primary-100',
    blue: 'bg-custom-blue-300 text-white',
    primary: 'bg-primary-700 text-white hover:bg-primary-800',
    disable: 'bg-custom-gray-500 text-primary-400',
  }
  const sizeDefault = {
    xs: 'w-[52px] h-8',
    sm: 'w-[68px] h-8',
    md: 'w-[72px] h-[38px]',
    lg: 'w-[295px] h-[46px]',
  }
  const sizeActive: Partial<typeof sizeDefault> = {
    sm: 'w-[82px] h-8',
    md: 'w-[88px] h-[38px]',
  }
  const fontSize = size === 'xs' || size === 'sm' ? 'text-sm' : 'text-base'
  const iconSize = size === 'lg' ? 'h-5 w-5 text-xl' : 'h-4 w-4 text-base'

  return (
    <button
      className={`flex ${
        isActive ? sizeActive[size] : sizeDefault[size]
      } items-center justify-center rounded  ${
        disable
          ? colorVariants['disable']
          : isActive
          ? colorVariants['primary']
          : colorVariants[bgColor]
      } `}
      onClick={onClick}
      disabled={disable}
    >
      <span className="flex items-center">
        {children && (
          <div className={`flex ${iconSize} items-center justify-center`}>
            {children}
          </div>
        )}
        <div className={`${fontSize} font-normal`}>
          {isActive ? activeText : text}
        </div>
      </span>
    </button>
  )
}
