import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

type ContentEmbedCode = {
  caption: string
  scripts: any[]
  embeddedCode: string
  embeddedCodeWithoutScript: string
}

export interface ApiDataEmbedCode extends ApiDataBlockBase {
  type: ApiDataBlockType.EmbedCode
  content: [ContentEmbedCode]
  alignment: 'center'
}
