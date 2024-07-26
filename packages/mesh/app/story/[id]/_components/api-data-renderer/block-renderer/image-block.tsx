import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Image as ImageType,
} from '../types'

export interface ApiDataImage extends ApiDataBlockBase {
  type: ApiDataBlockType.Image
  content: [ImageType]
  alignment: 'center' | 'left' | 'right'
}
