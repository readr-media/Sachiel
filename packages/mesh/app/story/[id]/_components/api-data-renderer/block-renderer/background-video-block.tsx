import type {
  ApiDataBlockBase,
  ApiDataBlockType,
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
