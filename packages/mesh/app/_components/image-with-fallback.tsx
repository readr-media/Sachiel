import type { ImageProps } from 'next/image'
import Image from 'next/image'
import React, { useState } from 'react'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc: string
  alt: string
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src)

  const handleError = () => {
    setImgSrc(fallbackSrc)
  }

  return <Image {...props} src={imgSrc} alt={alt} onError={handleError} />
}

export default ImageWithFallback
