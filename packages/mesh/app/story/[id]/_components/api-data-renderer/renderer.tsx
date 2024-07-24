import BlockquoteBlock from './block-renderer/blockquote-block'
import CodeBlock from './block-renderer/code-block'
import ColorBoxBlock from './block-renderer/color-box'
import DividerBlock from './block-renderer/divider-block'
import { Header2Block, Header3Block } from './block-renderer/header-block'
import InfoboxBlock from './block-renderer/infobox-block'
import { OrderListBlock, UnorderListBlock } from './block-renderer/list-block'
import type { ApiDataBlock } from './block-renderer/types'
import UnstyledBlock from './block-renderer/unstyled-block'
import { ApiDataBlockType } from './types'

export type ApiData = ApiDataBlock[]

export default function ApiDataRenderer({ apiData }: { apiData: ApiData }) {
  return (
    <article>
      {apiData.map((apiDataBlock) => {
        switch (apiDataBlock.type) {
          case ApiDataBlockType.Unstyled:
            return (
              <UnstyledBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.HeaderTwo:
            return (
              <Header2Block key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
            )
          case ApiDataBlockType.HeaderThree:
            return (
              <Header3Block key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
            )
          case ApiDataBlockType.Blockquote:
            return (
              <BlockquoteBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.OrderList:
            return (
              <OrderListBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.UnorderList:
            return (
              <UnorderListBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.CodeBlock:
            return (
              <CodeBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
            )
          case ApiDataBlockType.Divider:
            return <DividerBlock key={apiDataBlock.id} />
          case ApiDataBlockType.Infobox:
            return (
              <InfoboxBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
            )
          case ApiDataBlockType.ColorBox:
            return (
              <ColorBoxBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )

          default:
            console.error('unhandled apiData type', apiDataBlock?.type)
            return null
        }
      })}
    </article>
  )
}
