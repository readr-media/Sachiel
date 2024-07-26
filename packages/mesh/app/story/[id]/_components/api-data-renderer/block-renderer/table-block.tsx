import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

type ContentTableCell = {
  html: string
}
export interface ApiDataTable extends ApiDataBlockBase {
  type: ApiDataBlockType.Table
  content: ContentTableCell[][]
}
