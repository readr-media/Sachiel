import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataCodeBlock extends ApiDataBlockBase {
  type: ApiDataBlockType.CodeBlock
  content: [string]
  alignment: 'center'
}
