import { Option } from '@readr-media/react-feedback/dist/typedef'
import type { LinkProps } from 'next/link'

export type LinkHref = LinkProps['href']

export type GenericGQLData<T, U extends string> = {
  data?: Record<U, T>
  errors: any[]
}

export type StatusOptionsA = 'active' | 'deactive'

export type StatusOptionsB = 'verified' | 'notverified'

export type RawElectionArea = Partial<{
  id: string
  name: string
  city: string
  level: string
  type: string
  aboriginal: string
  description: string
  status: StatusOptionsA
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}>

export type RawElection = Partial<{
  id: string
  name: string
  description: string
  election_year_year: number
  election_year_month: number
  election_year_day: number
  level: string
  type: string
  register_date: string
  location: string
  electionArea: RawElectionArea[]
  status: StatusOptionsA
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
  hidePoliticDetail: string
  addComments: boolean
}>

export type MainCandidate = {
  id: string | null
  name: string | null
  person_id: Person
}

export type Person = {
  id: string | null
}

export type RawPerson = Partial<{
  id: string
  name: string
  alternative: string
  other_names: string
  email: string
  gender: string
  birth_date_year: number
  birth_date_month: number
  birth_date_day: number
  death_date_year: number
  death_date_month: number
  death_date_day: number
  image: string
  summary: string
  biography: string
  national_identity: string
  contact_details: string
  links: string
  source: string
  status: StatusOptionsB
  thread_parent: RawPerson
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}>

export type RawOrganization = Partial<{
  id: string
  name: string
  alternative: string
  other_names: string
  identifiers: string
  classification: string
  abstract: string
  description: string
  founding_date_year: number
  founding_date_month: number
  founding_date_day: number
  dissolution_date_year: number
  dissolution_date_month: number
  dissolution_date_day: number
  image: string
  contact_details: string
  links: string
  address: string
  source: string
  status: StatusOptionsB
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}>

export type RawPersonElection = Partial<{
  id: string
  name: string
  person_id: RawPerson
  election: RawElection
  party: RawOrganization
  legislatoratlarge_number: string
  number: string
  electoral_district: RawElectionArea
  votes_obtained_number: string
  votes_obtained_percentage: string
  elected: boolean
  incumbent: boolean
  source: string
  politicSource: string
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
  mainCandidate: MainCandidate
}>

export type RawOrganizationElection = Partial<{
  id: string
  organization_id: RawOrganization
  elections: RawElection
  party: RawOrganization
  legislatoratlarge_number: string
  number: string
  electionArea: RawElectionArea
  votes_obtained_number: string
  votes_obtained_percentage: string
  source: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  mainCandidate: MainCandidate
  addComments: boolean
  election_year_year: number
  election_year_month: number
  election_year_day: number
  seats: string
  politics: RawPolitic
  politicsCount: number
}>

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>

export type RawTag = Partial<{
  id: string
  name: string
  brief: string
  state: string
  ogTitle: string
  ogDescription: string
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}>

export enum PROGRESS {
  NOT_START = 'no-progress', // 還沒開始
  IN_PROGRESS = 'in-progress', // 進行中
  IN_TROUBLE = 'in-trouble', // 卡關中
  COMPLETED = 'complete', // 已完成
}

export type RawPolitic = Partial<{
  id: string
  person: RawPersonElection
  desc: string
  source: string
  content: string
  contributer: string
  current_progress: `${PROGRESS}`
  progressCount: number
  status: StatusOptionsB
  reviewed: Boolean
  thread_parent: RawPolitic
  politicCategory: RawTag
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}>

export type Source = {
  id: string
  value: string
  error: string
}

export type ExtendedOption = Option & { sortOrder: number }

export type FormConfig = Record<'formId' | 'fieldId', string>
export type FeedbackFormConfig = Record<'emoji' | 'text', FormConfig>
// This utility is for overwriting type without extending it
// prettier-ignore
export type Override<T, U extends Partial<Record<keyof T, unknown>>> = Omit<T, keyof U> & U

export type GenericProgressType =
  | 'no-progress' // 還沒開始
  | 'in-progress' // 進行中
  | 'in-trouble' // 卡關中
  | 'complete' // 已完成

export type GenericStatus =
  | 'verified' //已確認
  | 'notverified' //未確認

export type GenericPositionChange = {
  id: string
  positionChangeSummary: string
  isChanged: string
  factcheckPartner: GenericFactCheckPartner | null
  content: string
  checkDate: string
  link: string
  politic: RawPolitic
  politicCount: number
  editingPolitic: RawPolitic
  editingPoliticCount: number
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericFactCheck = {
  id: string
  factCheckSummary: string
  checkResultType: string
  checkResultOther: string
  factcheckPartner: GenericFactCheckPartner | null
  content: string
  link: string
  politic: RawPolitic
  politicCount: number
  editingPolitic: RawPolitic
  editingPoliticCount: number
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericRepeat = {
  id: string
  repeatSummary: string
  factcheckPartner: GenericFactCheckPartner | null
  content: string
  link: string
  contributer: string
  politic: RawPolitic
  politicCount: number
  editingPolitic: RawPolitic
  editingPoliticCount: number
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericExpert = {
  id: string
  expertPointSummary: string
  expert: string
  avatar: string
  content: string
  link: string
  title: string
  contributer: string
  politic: RawPolitic
  politicCount: number
  editingPolitic: RawPolitic
  editingPoliticCount: number
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericFactCheckPartner = {
  id: string
  name: string
  type: string
  webUrl: string
  logo: GenericPhoto // for Landing Page
  slogo: GenericPhoto // for Politic Detail Page
  year: string
  postsCount: number
  positionChange: GenericPositionChange
  positionChangeCount: number
  factCheck: GenericFactCheck
  factCheckCount: number
  repeat: GenericRepeat
  repeatCount: number
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericResizedImages = {
  original: string
  w480: string
  w800: string
  w1200: string
  w1600: string
  w2400: string
}

export type GenericPersonOrganization = {
  id: string
  person_id: RawPerson
  organization_id: GenericOrganization
  election: RawPersonElection
  role: string
  start_date_year: string | null
  start_date_month: string | null
  start_date_day: string | null
  end_date_year: string | null
  end_date_month: string | null
  end_date_day: string | null
  source: string
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericPoliticCategory = {
  id: string
  name: string
  brief: string
  displayColor: string
  ogTitle: string
  ogDescription: string
  isFeatured: boolean
  politics: RawPolitic
  politicsCount: number
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericUser = {
  id: string
  name: string
  email: string
  password: { isSet: boolean }
  role: string
  isProtected: boolean
}

export type GenericOrganization = {
  id: string
  name: string
  alternative: string | null
  other_names: string | null
  identifiers: string | null
  classification: string
  abstract: string | null
  description: string | null
  founding_date_year: string
  founding_date_month: string
  founding_date_day: string
  dissolution_date_year: string
  dissolution_date_month: string
  dissolution_date_day: string
  image: string | null
  contact_details: string | null
  links: string | null
  address: string | null
  source: string | null
  status: GenericStatus
  tags: GenericPoliticCategory
  tagsCount: number
  reviewed: boolean
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericPhoto = {
  id: string
  name: string
  resized: GenericResizedImages
  urlOriginal: string
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericResponse = {
  id: string
  politic: RawPolitic
  politicCount: number
  responseName: string
  responsePic: string
  responseTitle: string
  content: string
  link: string
  editingPolitic: RawPolitic
  editingPoliticCount: number
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericTimeline = {
  id: string
  politic: RawPolitic
  politicCount: number
  eventDate: string
  sortOrder: number
  content: string
  link: string
  contributer: string
  editingPolitic: RawPolitic
  editingPoliticCount: number
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}

export type GenericControversy = {
  id: string
  politic: RawPolitic
  politicCount: number
  content: string
  factcheckPartner: GenericFactCheckPartner | null
  link: string
  editingPolitic: RawPolitic
  editingPoliticCount: number
  createdAt: string
  updatedAt: string
  createdBy: GenericUser
  updatedBy: GenericUser
}
