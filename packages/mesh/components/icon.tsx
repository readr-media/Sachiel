import Image from 'next/image'

type size = 's' | 'm' | 'l' | 'xl' | '2xl'
type CustomSize = { width: number; height: number }

export type IconProps = {
  size: size | CustomSize
  iconName:
    | 'icon-dollar-white'
    | 'icon-star-primary'
    | 'icon-star-white'
    | 'icon-search'
    | 'icon-notifications'
    | 'icon-notifications-new'
    | 'icon-search-bar'
    | 'icon-readr-logo'
}
const sizeVariant = {
  s: 16,
  m: 20,
  l: 24,
  xl: 32,
  '2xl': 44,
}
export default function Icon({ iconName, size }: IconProps) {
  if (typeof size === 'string') {
    return (
      <Image
        src={`/icons/${iconName}.svg`}
        width={sizeVariant[size]}
        height={sizeVariant[size]}
        alt={iconName}
      />
    )
  } else {
    return (
      <Image
        src={`/icons/${iconName}.svg`}
        width={size.width}
        height={size.height}
        alt={iconName}
      />
    )
  }
}
