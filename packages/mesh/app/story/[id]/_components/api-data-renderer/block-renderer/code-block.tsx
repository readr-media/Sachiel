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
    <pre className="code-block">{apiDataBlock.content[0]}</pre>
  ) : null
}
