import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataDivider extends ApiDataBlockBase {
  type: ApiDataBlockType.Divider
  content: ['<hr>']
  alignment: 'center'
}

export default function DividerBlock() {
  return <hr />
}
