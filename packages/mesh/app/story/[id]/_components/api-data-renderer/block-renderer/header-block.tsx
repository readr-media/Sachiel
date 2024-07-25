import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataHeader2 extends ApiDataBlockBase {
  type: ApiDataBlockType.HeaderTwo
  content: [string]
  alignment: 'center'
}

export interface ApiDataHeader3 extends ApiDataBlockBase {
  type: ApiDataBlockType.HeaderThree
  content: [string]
  alignment: 'center'
}

export function Header2Block({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataHeader2
}) {
  return <h2>{apiDataBlock.content[0]}</h2>
}

export function Header3Block({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataHeader3
}) {
  return <h3>{apiDataBlock.content[0]}</h3>
}
