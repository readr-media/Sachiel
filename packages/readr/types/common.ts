import type { RawDraftContentState } from 'draft-js'

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
  id: string
  name: string
  urlOriginal: string
  resized: ResizedImages | null
  resizedWebp: ResizedImages | null
  imageFile: GenericImageFile | null
}

export type PhotoWithResizedOnly = Pick<GenericPhoto, 'resized' | 'resizedWebp'>

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

export enum ValidJobTitles {
  FRONT_END_ENGINEER = 'front-end engineer',
  APP_ENGINEER = 'App engineer',
  FULL_STACK_ENGINEER = 'full-stack engineer',
  BACK_END_ENGINEER = 'back-end engineer',
  EDITOR_IN_CHIEF = 'editor in chief',
  PRODUCT_DESIGNER = 'product designer',
  JOURNALIST = 'journalist',
  SOCIAL_MEDIA_EDITOR = 'social media editor',
  FEATURE_PRODUCER = 'Feature Producer',
  PRODUCT_MANAGER = 'product manager',
}

export enum ValidPostContentType {
  NORMAL = 'normal',
  SUMMARY = 'summary',
  ACTIONLIST = 'actionlist',
  CITATION = 'citation',
}

/* eslint-enable no-unused-vars */

export type GenericAuthor = {
  id: string | number
  name: string
  isMember: boolean
  name_en: string
  title: string
  special_number: string
  number_desc: string
  number_desc_en: string
  postsCount: number
  posts: GenericPost[]
}

export type GenericProject = {
  id: string
  name: string
}

export type GenericPost = {
  id: string
  slug: string
  style: ValidPostStyle
  name: string
  title: string // alias to `name`
  subtitle: string
  sortOrder: number
  heroImage: GenericPhoto | null
  ogImage: GenericPhoto | null
  ogDescription: string | null
  heroCaption: string
  content: RawDraftContentState // draft-renderer JSON
  summary: RawDraftContentState // draft-renderer JSON
  actionList: RawDraftContentState // draft-renderer JSON
  citation: RawDraftContentState // draft-renderer JSON
  categories: GenericCategory[]
  writers: GenericAuthor[] //作者
  photographers: GenericAuthor[] //攝影
  cameraOperators: GenericAuthor[] //影音
  designers: GenericAuthor[] //設計
  engineers: GenericAuthor[] //工程
  dataAnalysts: GenericAuthor[] //資料分析
  manualOrderOfWriters: GenericAuthor[] //作者 JSON
  manualOrderOfPhotographers: GenericAuthor[] //攝影 JSON
  manualOrderOfCameraOperators: GenericAuthor[] //影音 JSON
  manualOrderOfDesigners: GenericAuthor[] //設計 JSON
  manualOrderOfEngineers: GenericAuthor[] //工程 JSON
  manualOrderOfDataAnalysts: GenericAuthor[] //資料分析 JSON
  otherByline: string //作者（其他）
  relatedPosts: GenericPost[]
  manualOrderOfRelatedPosts: unknown // it is hard to describe JSON type
  publishTime: string
  readingTime: number
  tags: GenericTag[]
  state: string
  leadingEmbeddedCode: string
}

export type GenericCategory = {
  id: string
  slug: string
  title: string
  posts: GenericPost[]
  reports: GenericPost[]
  ogImage: GenericPhoto | null
  ogDescription: string | null
  updatedAt: string | null
  createdAt: string | null
  sortOrder: number | null
}

export type GenericTag = {
  id: string
  name: string
  state: string
  posts: GenericPost[]
}

export type GenericEditorChoice = {
  id: string
  name: string
  link: string
  heroImage: GenericPhoto | null
  choices: GenericPost | null
}

export type GenericFeature = {
  description: string
  featurePost: GenericPost | null
}

export type GenericQuote = {
  id: string
  name: string
  title: string
  byline: string
}

export type GenericCollaboration = {
  id: string
  title: string
  name: string
  description: string
  progress: number
  achvLink: string
  collabLink: string
  requireTime: number
  endTime: string
  heroImage: GenericPhoto | null
  bannerDesktop: GenericPhoto | null
  bannerTablet: GenericPhoto | null
  bannerMobile: GenericPhoto | null
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
