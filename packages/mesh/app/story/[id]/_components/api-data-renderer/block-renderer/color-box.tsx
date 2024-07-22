import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

type ContentColorbox = {
  body: string
  color: string
}

// Readr only
export interface ApiDataColorBox extends ApiDataBlockBase {
  type: ApiDataBlockType.ColorBox
  content: [ContentColorbox]
  alignment: 'center'
}
