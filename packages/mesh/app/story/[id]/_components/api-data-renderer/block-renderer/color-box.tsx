import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

type ContentColorbox = {
  body: string
  color: string
}

// Readr only
export interface ApiDataColorBox extends ApiDataBlockBase {
  type: ApiDataBlockType.ColorBox
  content: [ContentColorbox]
  alignment: 'center'
}

export default function ColorBoxBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataColorBox
}) {
  const { body } = apiDataBlock.content[0]
  return (
    <section className="color-box">
      <div className="body" dangerouslySetInnerHTML={{ __html: body }}></div>
    </section>
  )
}
