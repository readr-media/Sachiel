import { POLITIC_PROGRESS } from '~/constants/common'
import type {
  RawExpertPoint,
  RawFactCheck,
  RawPersonElection,
  RawPoliticPositionChange,
  RawPoliticRepeat,
} from '~/types/common'

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
  progress?: `${POLITIC_PROGRESS}`
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
export type PositionChange = Pick<
  RawPoliticPositionChange,
  'id' | 'positionChangeSummary' | 'isChanged' | 'factcheckPartner'
>

export type FactCheckPartner = {
  name: string
}

//事實釐清摘要
export type FactCheck = Pick<
  RawFactCheck,
  | 'id'
  | 'factCheckSummary'
  | 'checkResultType'
  | 'checkResultOther'
  | 'factcheckPartner'
>

//專家看點摘要
export type ExpertPoint = Pick<
  RawExpertPoint,
  'id' | 'expertPointSummary' | 'expert'
>

//相似政策摘要
export type Repeat = Pick<
  RawPoliticRepeat,
  'id' | 'repeatSummary' | 'factcheckPartner'
>

export type PersonElectionTerm = {
  start_date_day: number | null
  start_date_month: number | null
  start_date_year: number | null
  end_date_day: number | null
  end_date_month: number | null
  end_date_year: number | null
}

export type MainCandidate = {
  id: string | null
  name: string | null
  person_id: Person | null
}

export type Person = Pick<RawPerson, 'id'>

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
export type ElectionDataForPerson = {
  id: string
  name: string
  electionType: string
  electionArea: string
  party: string
  partyIcon: string
  partyId: string
  year: number
  month: number
  day: number
  isFinished: boolean
  elected: boolean
  incumbent: boolean
  source: string
  mainCandidate: MainCandidate | null
  lastUpdate: string | null
  politics: Politic[]
  waitingPolitics: Politic[]
  hidePoliticDetail: string | null
  electionTerm: PersonElectionTerm
  organizationId: OrganizationId
  shouldShowFeedbackForm: boolean
}

export type ElectionDataForParty = ElectionDataForPerson & {
  isPartyPage: boolean
  legisLatorAtLarge: LegislatorAtLarge[]
}

export type ElectionData = ElectionDataForPerson | ElectionDataForParty
