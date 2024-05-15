import Image from 'next/image'

type SizeCode = 's' | 'm' | 'l' | 'xl' | '2xl'
type CustomSize = { width: number; height: number }
export type Size = SizeCode | CustomSize
export type IconName =
  | 'icon-dollar-white'
  | 'icon-star-primary'
  | 'icon-star-white'
  | 'icon-search'
  | 'icon-notifications'
  | 'icon-notifications-new'
  | 'icon-search-bar'
  | 'icon-readr-logo'
  | 'icon-readr-logo-lg'
  | 'icon-google-play'
  | 'icon-app-store'
  | 'icon-facebook'
  | 'icon-x'
  | 'icon-instagram'
  | 'icon-discord'
  | 'icon-facebook-hover'
  | 'icon-x-hover'
  | 'icon-instagram-hover'
  | 'icon-discord-hover'

export type IconProps = {
  size: Size
  iconName: IconName
}
export const sizeVariant = {
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
