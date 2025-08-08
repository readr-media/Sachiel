'use client'

import ImageWithFallback from '@/app/[lng]/_components/image-with-fallback'
import { ImageCategory } from '@/constants/fallback-src'

type Size = 's' | 'm' | 'l' | 'xl' | 'xxl'
export type RingColor = keyof typeof avatarRingColors

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

const avatarRingColors = {
  'primary-100': 'ring-primary-100',
  'multi-layer-light': 'ring-multi-layer-light',
  white: 'ring-white',
}

export default function Avatar({
  src,
  size,
  isRound = true,
  extra = '',
  ringColor = 'white',
  alt = '',
}: {
  src: string
  size: Size
  isRound?: boolean
  extra?: string
  ringColor?: RingColor
  alt?: string
}) {
  const sideLength = avatarSizes[size]
  const avatarClass = avatarClasses[size]
  const ringColorClass = avatarRingColors[ringColor]

  return (
    <ImageWithFallback
      style={{ objectFit: 'cover' }}
      className={`${avatarClass} inline-block ${
        isRound && 'rounded-full'
      } bg-white ring-2 ${ringColorClass} ${extra} object-cover`}
      src={src}
      width={sideLength}
      height={sideLength}
      alt={alt ?? src}
      fallbackCategory={ImageCategory.AVATAR}
    />
  )
}
