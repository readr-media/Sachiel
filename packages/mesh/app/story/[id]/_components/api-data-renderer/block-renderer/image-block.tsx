'use client'

import CustomImage from '@readr-media/react-image'

import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Image as ImageType,
} from '../types'

export interface ApiDataImage extends ApiDataBlockBase {
  type: ApiDataBlockType.Image
  content: [ImageType]
  alignment: 'center' | 'left' | 'right'
}

export default function ImageBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataImage
}) {
  const image = apiDataBlock.content[0]

  return (
    <figure className="image-block">
      <div className="image-wrapper">
        <CustomImage
          images={image.resized}
          imagesWebP={image.resizedWebp}
          alt={image.name}
        />
      </div>
      {image.desc && <figcaption>{image.desc}</figcaption>}
    </figure>
  )
}
