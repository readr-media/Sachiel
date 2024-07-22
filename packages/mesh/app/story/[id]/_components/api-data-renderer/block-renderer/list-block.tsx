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

export function UnorderListBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataUnorderList
}) {
  const list = apiDataBlock.content[0]
  return (
    <ul>
      {list.map((listItem) => (
        <li key={listItem}>{listItem}</li>
      ))}
    </ul>
  )
}

export function OrderListBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataOrderList
}) {
  const list = apiDataBlock.content[0]
  return (
    <ol>
      {list.map((listItem) => (
        <li key={listItem}>{listItem}</li>
      ))}
    </ol>
  )
}
