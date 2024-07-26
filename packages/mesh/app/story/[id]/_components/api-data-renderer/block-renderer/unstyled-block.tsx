import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataUnstyled extends ApiDataBlockBase {
  type: ApiDataBlockType.Unstyled
  content: [string]
  alignment: 'center'
}

export default function UnstyledBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataUnstyled
}) {
  return <div dangerouslySetInnerHTML={{ __html: apiDataBlock.content }} />
}
