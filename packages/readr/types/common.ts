export type GenericImageFile = {
  url: string
}

export type ResizedImages = {
  original?: string
  w480?: string
  w800?: string
  w1200?: string
  w1600?: string
  w2400?: string
}

export type keyOfResizedImages = keyof ResizedImages

export type GenericPhoto = {
  id?: string
  name?: string
  urlOriginal?: string
  resized?: ResizedImages | null
  imageFile?: GenericImageFile | null
}

export type PhotoWithResizedOnly = Pick<Required<GenericPhoto>, 'resized'>

// ref: https://github.com/mirror-media/Lilith/blob/95bb4f8e9b43bd60515e1ba5b9b77d512f880bca/packages/readr/lists/Post.ts#L139
/* eslint-disable no-unused-vars */
export enum ValidPostStyle {
  NEWS = 'news',
  FRAME = 'frame',
  BLANK = 'blank',
  REPORT = 'report',
  PROJECT3 = 'project3',
  EMBEDDED = 'embedded',
  REVIEW = 'review',
  MEMO = 'memo',
  DUMMY = 'dummy',
  CARD = 'card',
  QA = 'qa',
  SCROLLABLE_VIDEO = 'scrollablevideo',
}
/* eslint-enable no-unused-vars */

export type GenericAuthor = {
  id?: string | number
  name?: string
}

export type GenericPost = {
  id: string
  slug?: string
  style?: ValidPostStyle
  name?: string
  title?: string // alias to `name`
  subtitle?: string
  sortOrder?: number
  heroImage?: GenericPhoto | null
  ogImage?: GenericPhoto | null
  heroCaption?: string
  content?: unknown // it is hard to describe JSON type
  summary?: unknown // it is hard to describe JSON type
  actionList?: unknown // it is hard to describe JSON type
  citation?: unknown // it is hard to describe JSON type
  dataAnalysts?: GenericAuthor[]
  writers?: GenericAuthor[]
  designers?: GenericAuthor[]
  categories?: GenericCategory[]
  relatedPosts?: GenericPost[]
  manualOrderOfRelatedPosts?: unknown // it is hard to describe JSON type
  publishTime?: string
  readingTime?: number
}

export type GenericCategory = {
  id: string
  slug?: string
  title?: string
  posts?: GenericPost[]
  reports?: GenericPost[]
}

export type GenericEditorChoice = {
  heroImage: GenericPhoto | null
  choices: GenericPost | null
}

export type GenericFeature = {
  description: string
  featurePost?: GenericPost | null
}

export type GenericQuote = {
  id: string
  name: string
  title: string
  byline: string
}

export type GenericCollaboration = {
  id: string
  title?: string
  name: string
  description: string
  progress: number
  achvLink: string
  collabLink: string
  requireTime: number
  endTime: string
  heroImage: GenericPhoto | null
}

export type GenericGallery = {
  id: string
  link: string
  writer: GenericAuthor[]
  heroImage: GenericPhoto | null
}

export type GenericDataSet = {
  id: string
  name: string
  title: string
  link: string
  gallery: GenericGallery[]
}

// This utility is for overwriting type without extending it
// prettier-ignore
export type Override<T, U extends Partial<Record<keyof T, unknown>>> = Omit<T, keyof U> & U
