import Image from 'next/image'

import Icon from '@/components/icon'

type Size = 'm' | 'l' | 'xl'

const avatarSizes = {
  m: 28,
  l: 44,
  xl: 64,
} as const

const avatarClasses = {
  m: 'h-[28px] w-[28px]',
  l: 'h-11 w-11',
  xl: 'h-16 w-16',
}

export default function Avatar({ src, size }: { src: string; size: Size }) {
  const sideLength = avatarSizes[size]
  const avatarClass = avatarClasses[size]

  return src ? (
    <Image
      className={`${avatarClass} inline-block rounded-full bg-white ring-2 ring-white`}
      src={src}
      width={sideLength}
      height={sideLength}
      alt={src}
    />
  ) : (
    <Icon
      iconName="icon-avatar-default"
      className={`${avatarClass} inline-block rounded-full bg-white ring-2 ring-white`}
      size={{ width: sideLength, height: sideLength }}
    />
  )
}
