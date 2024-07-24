import type { ApiDataBlockBase, ApiDataBlockType, Image } from '../types'

type RelatedPostImage = Pick<Image, 'id' | 'name' | 'resized' | 'resizedWebp'>

type ContentRelatedPost = {
  id: string
  name: string
  slug: string
  ogImage: RelatedPostImage | null
  subtitle: string | null
  heroImage: RelatedPostImage | null
}

// Readr only
export interface ApiDataRelatedPost extends ApiDataBlockBase {
  type: ApiDataBlockType.RelatedPost
  content: [ContentRelatedPost]
  alignment: 'center'
}
