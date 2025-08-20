'use client'

import type { ImageProps } from 'next/image'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import type { ImageCategory } from '@/constants/fallback-src'
import { DEFAULT_IMAGES } from '@/constants/fallback-src'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string | undefined
  fallbackCategory: ImageCategory
  alt: string
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackCategory,
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_IMAGES[fallbackCategory])

  useEffect(() => {
    if (src) {
      setImgSrc(src)
    }
  }, [src])

  const handleError = () => {
    setImgSrc(DEFAULT_IMAGES[fallbackCategory])
  }

  return <Image {...props} src={imgSrc} alt={alt} onError={handleError} />
}

export default ImageWithFallback
