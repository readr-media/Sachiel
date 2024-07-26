import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Image,
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
