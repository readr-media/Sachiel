import CustomImage from '@readr-media/react-image'
import Image from 'next/image'
import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react'

import type { SlideshowImage } from '.'

type SidebarProps = {
  images: SlideshowImage[]
  focusImageIndex: number
  setFocusImageIndedx: Dispatch<SetStateAction<number>>
}
export default function Sidebar({
  images,
  focusImageIndex,
  setFocusImageIndedx,
}: SidebarProps) {
  const imagesRef = useRef<(HTMLButtonElement | null)[]>(
    Array.from(Array(images.length))
  )
  const showUpArrow = focusImageIndex !== 0
  const showDownArrow = focusImageIndex !== images.length - 1

  const updateFocusImageIndex = (index: number) => {
    setFocusImageIndedx(index)
  }

  useEffect(() => {
    const focusdImageRef = imagesRef.current[focusImageIndex]

    if (focusdImageRef) {
      focusdImageRef.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [focusImageIndex])

  return (
    <div className="sidebar">
      <button
        className={`arrow ${showUpArrow ? '' : 'hide'} `}
        onClick={() => {
          updateFocusImageIndex(focusImageIndex - 1)
        }}
      >
        <Image
          src="/icons/icon-slideshow-lightbox-sidebar-up.png"
          alt="slideshow lightbox go up"
          width={64}
          height={64}
        />
      </button>
      <div className="images">
        {images.map((image, i) => (
          <button
            key={image.id}
            className={`image ${focusImageIndex === i ? 'focus' : ''}`}
            onClick={() => {
              updateFocusImageIndex(i)
            }}
            ref={(element) => {
              imagesRef.current[i] = element
            }}
          >
            <CustomImage
              images={image.resized}
              imagesWebP={image.resizedWebp}
              alt={image.name}
            />
          </button>
        ))}
      </div>
      <button
        className={`arrow ${showDownArrow ? '' : 'hide'} `}
        onClick={() => {
          updateFocusImageIndex(focusImageIndex + 1)
        }}
      >
        <Image
          src="/icons/icon-slideshow-lightbox-sidebar-down.png"
          alt="slideshow lightbox go up"
          width={64}
          height={64}
        />
      </button>
    </div>
  )
}
