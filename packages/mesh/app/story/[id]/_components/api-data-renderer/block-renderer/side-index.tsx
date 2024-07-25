import type { ApiDataBlockBase, ApiDataBlockType, Image } from '../types'

type SideIndexImage = Pick<Image, 'id' | 'name' | 'resized' | 'resizedWebp'>

type ContentSideIndex = {
  h2Text: string
  sideIndexUrl: string
  sideIndexText: string
  sideIndexImage?: SideIndexImage
}

// Readr only
export interface ApiDataSideIndex extends ApiDataBlockBase {
  type: ApiDataBlockType.SideIndex
  content: [ContentSideIndex]
  alignment: 'center'
}
