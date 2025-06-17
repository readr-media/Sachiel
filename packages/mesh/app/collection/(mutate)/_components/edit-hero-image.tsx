'use client'

import { useState } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import { ImageCategory } from '@/constants/fallback-src'

import type { UseCollection } from '../_types/collection'
import ImageSelector from './image-selector'

const getHeroImageSrc = (image: File | null | string) => {
  if (typeof image === 'string') return image
  if (!image || !image.type.startsWith('image/')) return ''
  return URL.createObjectURL(image)
}

export default function EditHeroImage({
  useCollection,
}: {
  useCollection: UseCollection
}) {
  const [showImageSelector, setShowImageSelector] = useState(false)
  const { heroImage, collectionPickStories } = useCollection()

  const heroImageSrc = getHeroImageSrc(heroImage)
  const openImageSelector = () => {
    setShowImageSelector(true)
  }

  const closeImageSelector = () => {
    setShowImageSelector(false)
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:px-5 md:px-[70px] lg:px-0">
        <div
          className="relative aspect-[2/1] cursor-pointer"
          onClick={openImageSelector}
        >
          <ImageWithFallback
            className="sm:rounded-md"
            fallbackCategory={ImageCategory.STORY}
            src={heroImageSrc}
            alt="集錦封面照片"
            style={{
              objectFit: 'cover',
            }}
            fill
          />
        </div>
        <div className="body-2 flex justify-center text-custom-blue">
          <button onClick={openImageSelector}>更換封面照片</button>
        </div>
      </div>
      {showImageSelector && (
        <ImageSelector
          imageSrcs={collectionPickStories.map((story) => story.og_image ?? '')}
          onClose={closeImageSelector}
          useCollection={useCollection}
        />
      )}
    </>
  )
}
