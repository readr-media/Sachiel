import Image from 'next/image'

export type IconProps = {
  size: 's' | 'm' | 'l' | 'xl'
  iconName: 'icon-dollar-white' | 'icon-star-primary' | 'icon-star-white'
}
const sizeVariant = {
  s: 16,
  m: 20,
  l: 24,
  xl: 32,
}
export default function Icon({ iconName, size }: IconProps) {
  return (
    <Image
      src={`/icons/${iconName}.svg`}
      width={sizeVariant[size]}
      height={sizeVariant[size]}
      alt={iconName}
    />
  )
}
