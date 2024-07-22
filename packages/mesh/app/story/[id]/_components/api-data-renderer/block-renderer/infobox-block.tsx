import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

type ContentInfobox = {
  body: string
  title: string
}

export interface ApiDataInfobox extends ApiDataBlockBase {
  type: ApiDataBlockType.Infobox
  content: [ContentInfobox]
  alignment: 'center'
}
