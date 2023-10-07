import { PROGRESS } from './common'

export type PersonOverview = {
  id: string
  name: string
  avatar: string
  party: string
  partyIcon: string
  campaign: string
  completed: number
  waiting: number
}

export type PoliticAmount = Pick<PersonOverview, 'waiting' | 'completed'>

export type Politic = {
  id?: string
  desc: string
  source: string
  content: string
  progress?: `${PROGRESS}`
  tagId: string | null
  tagName: string | null
  createdAt: string | null
  updatedAt: string | null
  error?: string
  positionChange: PositionChange[]
  factCheck: FactCheck[]
}

//立場改變
export type PositionChange = {
  positionChangeSummary: string
  isChanged: boolean
  factcheckPartner: FactCheckPartner | null
}

export type FactCheckPartner = {
  name: string
}

//事實查核
export type FactCheck = {
  factCheckSummary: string
  checkResultType: string
  factcheckPartner: FactCheckPartner | null
}

export type PersonElection = {
  electionArea: string
  electionType: string
  id: string
  party: string
  partyIcon: string
  name: string
  year: number
  month: number
  day: number
  elected: boolean
  isFinished: boolean
  source: string | null
  lastUpdate: string | null
  politics: Politic[]
  waitingPolitics: Politic[]
  hidePoliticDetail: string | null
}
