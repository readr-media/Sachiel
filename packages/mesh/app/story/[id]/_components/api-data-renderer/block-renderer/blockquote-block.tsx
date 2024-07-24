import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataBlockquote extends ApiDataBlockBase {
  type: ApiDataBlockType.Blockquote
  content: [string]
  alignment: 'center'
}

export default function BlockquoteBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataBlockquote
}) {
  return (
    <div className="blockquote-block">
      <blockquote
        className="body"
        dangerouslySetInnerHTML={{ __html: apiDataBlock.content[0] }}
      />
    </div>
  )
}
