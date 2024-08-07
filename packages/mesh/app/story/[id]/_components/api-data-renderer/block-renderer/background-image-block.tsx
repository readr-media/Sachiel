'use client'

import CustomImage from '@readr-media/react-image'
import { useEffect, useRef, useState } from 'react'

import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Image,
  Organization,
  TextBlockAlign,
} from '../types'

type BackgroundImageType = Pick<
  Image,
  'id' | 'name' | 'resized' | 'resizedWebp'
>

type ContentBackgroundImage = {
  body: string
  image: BackgroundImageType
  textBlockAlign: TextBlockAlign
}

// Readr only
export interface ApiDataBackgroundImage extends ApiDataBlockBase {
  type: ApiDataBlockType.BackgroundImage
  content: [ContentBackgroundImage]
  alignment: 'center'
}

const BackgroundImage = ({ content }: { content: ContentBackgroundImage }) => {
  const [bgImageCss, setBgImageCss] = useState({})
  const bgRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { body, image, textBlockAlign } = content

  // parallax scrolling
  const isParallax = textBlockAlign !== 'fixed'

  useEffect(() => {
    if (bgRef.current && topRef.current && bottomRef.current) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(({ boundingClientRect }) => {
          if (!boundingClientRect.width || !bgRef.current) {
            return
          }

          const bounding = bgRef.current.getBoundingClientRect()

          if (bounding.height) {
            if (bounding.y > 0) {
              setBgImageCss({
                position: 'absolute',
                top: 0,
                bottom: 'unset',
              })
            } else if (bounding.y + bounding.height > window.innerHeight) {
              setBgImageCss({
                position: 'fixed',
                top: 0,
                bottom: 'unset',
              })
            } else {
              setBgImageCss({
                position: 'absolute',
                top: 'unset',
                bottom: 0,
              })
            }
          }
        })
      })

      intersectionObserver.observe(topRef.current)
      intersectionObserver.observe(bottomRef.current)

      return () => {
        intersectionObserver.disconnect()
      }
    }
  }, [])

  return (
    <div className="background-image-block" ref={bgRef}>
      <div ref={topRef} />
      <div className="background-image" style={bgImageCss}>
        <CustomImage
          images={image.resized}
          imagesWebP={image.resizedWebp}
          alt={image.name}
        />
      </div>
      <div className={`content ${isParallax ? 'parallax' : 'static'}`}>
        {isParallax && <div className="row-empty" />}
        <div className={`row-content ${textBlockAlign}`}>
          <div className="body" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </div>
      <div ref={bottomRef} />
    </div>
  )
}

export default function BackgroundImageBlock({
  apiDataBlock,
  organization,
}: {
  apiDataBlock: ApiDataBackgroundImage
  organization: Organization
}) {
  switch (organization) {
    case 'mirror-media':
      console.error(
        'Background Image is not supported yet, implement the renderer if MM use this button'
      )
      return null
    case 'readr-media':
      return <BackgroundImage content={apiDataBlock.content[0]} />

    default:
      return null
  }
}
