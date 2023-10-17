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
  createdBy: string
  updatedBy: string
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
  createdBy: string
  updatedBy: string
  hidePoliticDetail: string
}>

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
  createdBy: string
  updatedBy: string
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
  createdBy: string
  updatedBy: string
}>

export type RawPersonElection = Partial<{
  id: string
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
  createdBy: string
  updatedBy: string
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
  createdBy: string
  updatedBy: string
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
  tag: RawTag
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}>

export type Source = {
  id: string
  value: string
  error: string
}
export type FormConfig = Record<'formId' | 'fieldId', string>
export type FeedbackFormConfig = Record<'emoji' | 'text', FormConfig>
