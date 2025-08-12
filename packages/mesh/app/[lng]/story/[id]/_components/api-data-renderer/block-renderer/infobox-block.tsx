import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

type ContentInfobox = {
  body: string
  title: string
}

export interface ApiDataInfobox extends ApiDataBlockBase {
  type: ApiDataBlockType.Infobox
  content: [ContentInfobox]
  alignment: 'center'
}

export default function InfoboxBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataInfobox
}) {
  const { body, title } = apiDataBlock.content[0]
  return (
    <section className="infobox-block">
      <div className="title">{title}</div>
      <div className="body" dangerouslySetInnerHTML={{ __html: body }}></div>
    </section>
  )
}
