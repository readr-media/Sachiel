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
