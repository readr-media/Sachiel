import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataBlockquote extends ApiDataBlockBase {
  type: ApiDataBlockType.Blockquote
  content: [string]
  alignment: 'center'
}
