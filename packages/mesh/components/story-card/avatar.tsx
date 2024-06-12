import Image from 'next/image'

import Icon from '@/components/icon'

type Size = 'm' | 'l'

const avatarSizes = {
  m: 28,
  l: 44,
} as const

export default function Avatar({ src, size }: { src: string; size: Size }) {
  const sideLength = avatarSizes[size]

  return src ? (
    <Image
      className={`inline-block h-[${sideLength}px] w-[${sideLength}px] rounded-full bg-white ring-2 ring-white`}
      src={src}
      width={sideLength}
      height={sideLength}
      alt={src}
    />
  ) : (
    <Icon
      iconName="icon-avatar-default"
      size={{ width: sideLength, height: sideLength }}
    />
  )
}
