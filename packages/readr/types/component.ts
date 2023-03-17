import { ResizedImages } from './common'

export type ArticleCard = {
  id?: string
  href?: string
  title: string
  image?: string
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
