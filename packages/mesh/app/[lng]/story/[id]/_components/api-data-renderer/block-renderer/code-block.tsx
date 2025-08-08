import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataCodeBlock extends ApiDataBlockBase {
  type: ApiDataBlockType.CodeBlock
  content: [string]
  alignment: 'center'
}

export default function CodeBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataCodeBlock
}) {
  const content = apiDataBlock.content[0]

  return content ? (
    <pre
      className="code-block"
      dangerouslySetInnerHTML={{ __html: apiDataBlock.content[0] }}
    />
  ) : null
}
