import CustomImage from '@readr-media/react-image'
import Image from 'next/image'
import { type Dispatch, type SetStateAction, useEffect } from 'react'

import type { SlideshowImage } from '.'
import Sidebar from './lightbox-sidebar'

type LightboxProps = {
  images: SlideshowImage[]
  focusImageIndex: number
  setFocusImageIndedx: Dispatch<SetStateAction<number>>
  setShowLightbox: Dispatch<SetStateAction<boolean>>
}

export default function Lightbox({
  images,
  focusImageIndex,
  setFocusImageIndedx,
  setShowLightbox,
}: LightboxProps) {
  const focusImage = images[focusImageIndex]

  useEffect(() => {
    const onKeyDownHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        setShowLightbox(false)
      }
    }
    document.addEventListener('keydown', onKeyDownHandler)
    return () => {
      document.removeEventListener('keydown', onKeyDownHandler)
    }
  }, [setShowLightbox])

  return (
    <div className="lightbox">
      <Sidebar
        images={images}
        focusImageIndex={focusImageIndex}
        setFocusImageIndedx={setFocusImageIndedx}
      />
      <figure className="image-block">
        <div className="image">
          <CustomImage
            key={focusImage.id}
            images={focusImage.resized}
            imagesWebP={focusImage.resizedWebp}
            alt={focusImage.name}
          />
        </div>
        <div className="meta">
          <figcaption className="desc">{focusImage.desc}</figcaption>
          <p className="pagination">{`${focusImageIndex + 1} / ${
            images.length
          }`}</p>
        </div>
      </figure>
      <div
        className="close"
        onClick={() => {
          setShowLightbox(false)
        }}
      >
        <Image
          className="icon"
          src="/icons/icon-slideshow-lightbox-close.png"
          width={64}
          height={64}
          alt="close lightbox icon"
        />
      </div>
    </div>
  )
}
