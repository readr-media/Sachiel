import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataUnorderList extends ApiDataBlockBase {
  type: ApiDataBlockType.UnorderList
  content: string[][] | string[]
  alignment: 'center'
}

export interface ApiDataOrderList extends ApiDataBlockBase {
  type: ApiDataBlockType.OrderList
  content: string[][] | string[]
  alignment: 'center'
}

export function UnorderListBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataUnorderList
}) {
  let list: string[]

  if (Array.isArray(apiDataBlock.content[0])) {
    list = apiDataBlock.content[0]
  } else {
    list = apiDataBlock.content as string[]
  }

  return (
    <ul>
      {list.map((listItem) => (
        <li key={listItem} dangerouslySetInnerHTML={{ __html: listItem }} />
      ))}
    </ul>
  )
}

export function OrderListBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataOrderList
}) {
  let list: string[]

  if (Array.isArray(apiDataBlock.content[0])) {
    list = apiDataBlock.content[0]
  } else {
    list = apiDataBlock.content as string[]
  }
  return (
    <ol>
      {list.map((listItem) => (
        <li key={listItem} dangerouslySetInnerHTML={{ __html: listItem }} />
      ))}
    </ol>
  )
}
