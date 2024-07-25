import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

type ContentYoutube = {
  youtubeId: string
  description: string
}

// mm only
export interface ApiDataYoutube extends ApiDataBlockBase {
  type: ApiDataBlockType.Youtube
  content: [ContentYoutube]
  alignment: 'center'
}
