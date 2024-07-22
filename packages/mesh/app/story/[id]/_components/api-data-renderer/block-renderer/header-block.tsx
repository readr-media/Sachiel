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
