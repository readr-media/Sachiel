'use client'

import Image from 'next/image'
import { useState } from 'react'

import Icon from '@/components/icon'

type Size = 's' | 'm' | 'l' | 'xl' | 'xxl'

const avatarSizes = {
  s: 26,
  m: 28,
  l: 44,
  xl: 64,
  xxl: 80,
} as const

const avatarClasses = {
  s: 'h-[26px] w-[26px]',
  m: 'h-[28px] w-[28px]',
  l: 'h-11 w-11',
  xl: 'h-16 w-16',
  xxl: 'h-20 w-20',
}

export default function Avatar({
  src,
  size,
  isRound = true,
  extra = '',
}: {
  src: string
  size: Size
  isRound?: boolean
  extra?: string
}) {
  const sideLength = avatarSizes[size]
  const avatarClass = avatarClasses[size]
  const [imgSrc, setImgSrc] = useState(src)

  // TODO: replace with <ImageWithFallback/>
  return src ? (
    <Image
      className={`${avatarClass} inline-block ${
        isRound && 'rounded-full'
      } bg-white ring-2 ring-white ${extra} object-cover`}
      src={imgSrc}
      width={sideLength}
      height={sideLength}
      alt={src}
      onError={() => setImgSrc('/images/default-avatar-image.png')}
    />
  ) : (
    <Icon
      iconName="icon-avatar-default"
      className={`${avatarClass} inline-block rounded-full bg-white ring-2 ring-white ${extra}`}
      size={{ width: sideLength, height: sideLength }}
    />
  )
}
