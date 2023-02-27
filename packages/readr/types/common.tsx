export type ResizedImages = {
  original: string
  w480: string
  w800: string
  w1200: string
  w1600: string
  w2400: string
}

export type keyOfResizedImages = keyof ResizedImages

export type GenericPhoto = {
  resized: ResizedImages | null
}

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

export type GenericPost = {
  id: string
  slug?: string
  style?: ValidPostStyle
  name?: string
  title?: string // alias to `name`
  heroImage?: GenericPhoto | null
  ogImage?: GenericPhoto | null
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
  heroImage?: GenericPhoto
  choices?: GenericPost[]
  publishTime?: string
}
