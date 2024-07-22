import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataUnstyled extends ApiDataBlockBase {
  type: ApiDataBlockType.Unstyled
  content: [string]
  alignment: 'center'
}
