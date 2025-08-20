'use client'

import { useEffect, useRef, useState } from 'react'

import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Organization,
  TextBlockAlign,
  Video_Readr,
} from '../types'

type ContentBackgroundVideo = {
  body: string
  video: Video_Readr
  textBlockAlign: TextBlockAlign
}

// Readr only
export interface ApiDataBackgroundVideo extends ApiDataBlockBase {
  type: ApiDataBlockType.BackgroundVideo
  content: [ContentBackgroundVideo]
  alignment: 'center'
}

const BackgroundVideo = ({ content }: { content: ContentBackgroundVideo }) => {
  const [bgVideoCss, setBgVideoCss] = useState({})
  const bgRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { body, video, textBlockAlign } = content

  // parallax scrolling
  const isParallax = textBlockAlign !== 'fixed'

  useEffect(() => {
    if (bgRef.current && topRef.current && bottomRef.current) {
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ boundingClientRect }) => {
            if (!boundingClientRect.width || !bgRef.current) {
              return
            }

            const bounding = bgRef.current.getBoundingClientRect()

            if (bounding.height) {
              if (bounding.y > 0) {
                setBgVideoCss({
                  position: 'absolute',
                  top: 0,
                  bottom: 'unset',
                })
                videoRef.current?.pause()
              } else if (bounding.y + bounding.height > window.innerHeight) {
                setBgVideoCss({
                  position: 'fixed',
                  top: 0,
                  bottom: 'unset',
                })
                videoRef.current?.play()
              } else {
                setBgVideoCss({
                  position: 'absolute',
                  top: 'unset',
                  bottom: 0,
                })
                videoRef.current?.pause()
              }
            }
          })
        },
        {
          threshold: [0, 0.4, 0.7, 1.0],
        }
      )

      if (!isParallax) {
        intersectionObserver.observe(bgRef.current)
      } else {
        intersectionObserver.observe(topRef.current)
        intersectionObserver.observe(bottomRef.current)
      }
      return () => {
        intersectionObserver.disconnect()
      }
    }
  }, [isParallax])

  return (
    <div className="background-video-block" ref={bgRef}>
      <div ref={topRef} />
      <div className="background-video" style={bgVideoCss}>
        <video
          ref={videoRef}
          src={video?.url}
          muted
          preload="audio"
          loop
          playsInline
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

export default function BackgroundVideoBlock({
  apiDataBlock,
  organization,
}: {
  apiDataBlock: ApiDataBackgroundVideo
  organization: Organization
}) {
  switch (organization) {
    case 'mirror-media':
      console.error(
        'Background Image is not supported yet, implement the renderer if MM use this button'
      )
      return null
    case 'readr-media':
      return <BackgroundVideo content={apiDataBlock.content[0]} />

    default:
      return null
  }
}
