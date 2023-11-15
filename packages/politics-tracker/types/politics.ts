import type { RawPersonElection } from '~/types/common'

import { PROGRESS } from './common'

export type PersonOverview = {
  id: string
  name: string
  avatar: string
  party: string
  partyIcon: string
  partyId?: string
  campaign: string
  completed: number
  waiting: number
  isPartyPage?: boolean
}

export type PoliticAmount = Pick<PersonOverview, 'waiting' | 'completed'>

export type Politic = {
  id?: string
  desc: string
  source: string
  content: string
  progress?: `${PROGRESS}`
  politicCategoryId: string | null
  politicCategoryName: string | null
  createdAt: string | null
  updatedAt: string | null
  error?: string
  positionChange: PositionChange[]
  factCheck: FactCheck[]
  expertPoint: ExpertPoint[]
  repeat: Repeat[]
}

//立場改變摘要
export type PositionChange = {
  id: string
  positionChangeSummary: string
  isChanged: string
  factcheckPartner: FactCheckPartner | null
}

export type FactCheckPartner = {
  name: string
}

//事實釐清摘要
export type FactCheck = {
  id: string
  factCheckSummary: string
  checkResultType: string
  checkResultOther: string
  factcheckPartner: FactCheckPartner | null
}

//專家看點摘要
export type ExpertPoint = {
  id: string
  expertPointSummary: string
  expert: string
}

//相似政策摘要
export type Repeat = {
  id: string
  repeatSummary: string
  factcheckPartner: FactCheckPartner | null
}

export type PersonElectionTerm = {
  start_date_day: string | null
  start_date_month: string | null
  start_date_year: string | null
  end_date_day: string | null
  end_date_month: string | null
  end_date_year: string | null
}

export type MainCandidate = {
  id: string | null
  name: string | null
  person_id: Person
}

export type Person = {
  id: string | null
}

export type OrganizationId = {
  id: string | null
  name: string | null
}

export type PersonElection = {
  electionArea: string
  electionType: string
  id: string
  party: string
  partyIcon: string
  partyId?: string
  name: string
  year: number
  month: number
  day: number
  elected: boolean
  incumbent: boolean
  isFinished: boolean
  source: string | null
  lastUpdate: string | null
  politics: Politic[]
  waitingPolitics: Politic[]
  hidePoliticDetail: string | null
  electionTerm: PersonElectionTerm
  mainCandidate: MainCandidate | null
  organizationId: OrganizationId | null
  shouldShowFeedbackForm?: boolean
}

export type LegislatorAtLarge = {
  elected: boolean
  id: string
  person_id: Pick<RawPersonElection, 'id' | 'name'>
}
