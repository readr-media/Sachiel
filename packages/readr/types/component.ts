import { ResizedImages } from './common'

export type ArticleCard = {
  id?: string
  href?: string
  title: string
  images?: ResizedImages
  date?: string
  readTimeText?: string
  isReport?: boolean
}

export type FeaturedArticle = ArticleCard & {
  subtitle?: string
  description?: string
}

export type CollaborationItem = {
  id: string
  title: string
  description: string
  achvLink?: string
  collabLink: string
  images: ResizedImages
  progress?: number
  requireTime?: number
  endTime?: string
}

type Gallery = {
  id: string
  href?: string
  images: ResizedImages
}

export type DataSetItem = {
  id: string
  href?: string
  title?: string
  writerName?: string
  galleries: Gallery[]
}
