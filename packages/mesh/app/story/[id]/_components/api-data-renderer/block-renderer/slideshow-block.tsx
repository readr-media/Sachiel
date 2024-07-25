import {
  type ApiDataBlockBase,
  type Image as ImageType,
  ApiDataBlockType,
} from '../types'

export type SlideshowImage = Pick<
  ImageType,
  'id' | 'desc' | 'name' | 'resized' | 'resizedWebp'
>

type ContentSlideshowV1 = SlideshowImage[]

type ContentSlideshowV2 = {
  delay: number
  images: SlideshowImage[]
}

interface ApiDataSlideshowV1 extends ApiDataBlockBase {
  type: ApiDataBlockType.Slideshow
  content: [ContentSlideshowV1]
  alignment: 'center'
}
interface ApiDataSlideshowV2 extends ApiDataBlockBase {
  type: ApiDataBlockType.SlideshowV2
  content: [ContentSlideshowV2]
  alignment: 'center'
}

export type ApiDataSlideshow = ApiDataSlideshowV1 | ApiDataSlideshowV2
