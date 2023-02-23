export type Post = {
  id: string | number
  sortOrder: number
  slug: string
  name: string
  subtitle: string
  publishTime: string
  categories: Category[]
  writers: Author[]
  designers: Author[]
  dataAnalysts: Author[]
  heroImage: Photo
  heroCaption: string
  content: string
  readingTime: string
}

export type Category = {
  id: string
  slug?: string
  title: string
}

export type Author = {
  id: string
  name: string
}

export type Photo = {
  id?: string
  name?: string
  resized?: {
    original: string
    w480: string
    w800: string
    w1200: string
    w1600: string
    w2400: string
  }
}

// export type ResizedImages = {
//   original: string
//   w480: string
//   w800: string
//   w1200: string
//   w1600: string
//   w2400: string
// }
