import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataUnorderList extends ApiDataBlockBase {
  type: ApiDataBlockType.UnorderList
  content: string[][]
  alignment: 'center'
}

export interface ApiDataOrderList extends ApiDataBlockBase {
  type: ApiDataBlockType.OrderList
  content: string[][]
  alignment: 'center'
}
