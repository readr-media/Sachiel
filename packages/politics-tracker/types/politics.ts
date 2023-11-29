import { POLITIC_PROGRESS } from '~/constants/common'
import type {
  Override,
  RawElection,
  RawElectionArea,
  RawExpertPoint,
  RawFactCheck,
  RawFactCheckPartner,
  RawOrganization,
  RawOrganizationElection,
  RawPerson,
  RawPersonElection,
  RawPersonOrgnization,
  RawPolitic,
  RawPoliticCategory,
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
  id: string
  desc: string
  source: string
  content: string
  progress: `${POLITIC_PROGRESS}`
  politicCategoryId: string | null
  politicCategoryName: string | null
  createdAt: string
  updatedAt: string | null
  positionChange: PositionChange[]
  factCheck: FactCheck[]
  expertPoint: ExpertPoint[]
  repeat: Repeat[]
}

//立場改變摘要
export type PositionChange = Override<
  Pick<
    RawPoliticPositionChange,
    'id' | 'positionChangeSummary' | 'isChanged' | 'factcheckPartner'
  >,
  { factcheckPartner: FactCheckPartner | null }
>

export type FactCheckPartner = Pick<RawFactCheckPartner, 'name'>

//事實釐清摘要
export type FactCheck = Override<
  Pick<
    RawFactCheck,
    | 'id'
    | 'factCheckSummary'
    | 'checkResultType'
    | 'checkResultOther'
    | 'factcheckPartner'
  >,
  { factcheckPartner: FactCheckPartner | null }
>

//專家看點摘要
export type ExpertPoint = Pick<
  RawExpertPoint,
  'id' | 'expertPointSummary' | 'expert'
>

//相似政策摘要
export type Repeat = Override<
  Pick<RawPoliticRepeat, 'id' | 'repeatSummary' | 'factcheckPartner'>,
  {
    factcheckPartner: FactCheckPartner | null
  }
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

type PEP = Pick<RawPerson, 'id' | 'name' | 'image'>
type PEE = Pick<
  RawElection,
  | 'id'
  | 'name'
  | 'election_year_year'
  | 'election_year_month'
  | 'election_year_day'
  | 'level'
  | 'type'
  | 'hidePoliticDetail'
  | 'addComments'
>
type PEEA = Pick<RawElectionArea, 'id' | 'name' | 'city'>
type PEO = Pick<RawOrganization, 'id' | 'name' | 'image'>
type PEMC = Override<
  Pick<RawPersonElection, 'id' | 'name' | 'person_id'>,
  {
    person_id: Pick<RawPerson, 'id'> | null
  }
>
export type PersonElectionData = Override<
  Pick<
    RawPersonElection,
    | 'id'
    | 'politicSource'
    | 'elected'
    | 'incumbent'
    | 'person_id'
    | 'election'
    | 'electoral_district'
    | 'party'
    | 'mainCandidate'
  >,
  {
    person_id: PEP | null
    election: PEE | null
    electoral_district: PEEA | null
    party: PEO | null
    mainCandidate: PEMC | null
  }
>

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

export type PoliticData = Override<
  Pick<
    RawPolitic,
    | 'id'
    | 'desc'
    | 'content'
    | 'source'
    | 'status'
    | 'reviewed'
    | 'current_progress'
    | 'createdAt'
    | 'updatedAt'
    | 'thread_parent'
    | 'person'
    | 'politicCategory'
    | 'positionChange'
    | 'factCheck'
    | 'expertPoint'
    | 'repeat'
  >,
  {
    thread_parent: Pick<RawPolitic, 'id' | 'desc' | 'source' | 'status'> | null
    person: Override<
      Pick<RawPersonElection, 'id' | 'election'>,
      { election: Pick<RawElection, 'id'> | null }
    > | null
    politicCategory: Pick<RawPoliticCategory, 'id' | 'name'> | null
    positionChange: PositionChange[]
    factCheck: FactCheck[]
    expertPoint: ExpertPoint[]
    repeat: Repeat[]
  }
>

export type PersonOrgnizationData = Override<
  Pick<
    RawPersonOrgnization,
    | 'start_date_year'
    | 'start_date_month'
    | 'start_date_day'
    | 'end_date_year'
    | 'end_date_month'
    | 'end_date_day'
    | 'organization_id'
  >,
  {
    organization_id: Pick<RawOrganization, 'id' | 'name'> | null
  }
>

export type CreatedPolitic = Override<
  Pick<RawPolitic, 'desc' | 'source' | 'content' | 'person' | 'organization'>,
  {
    person: Override<
      Pick<RawPersonElection, 'id' | 'person_id' | 'election' | 'party'>,
      {
        person_id: Pick<RawPerson, 'name'> | null
        election: Pick<RawElection, 'name'> | null
        party: Pick<RawOrganization, 'name'> | null
      }
    > | null
    organization: Override<
      Pick<RawOrganizationElection, 'id' | 'organization_id'>,
      {
        organization_id: Pick<RawOrganization, 'name'> | null
      }
    > | null
  }
>

export type CreatedEditingPolitic = Override<
  Pick<
    RawPolitic,
    | 'id'
    | 'desc'
    | 'source'
    | 'content'
    | 'person'
    | 'organization'
    | 'thread_parent'
    | 'changeLog'
    | 'checked'
    | 'reviewed'
    | 'contributer'
  >,
  {
    person: Override<
      Pick<RawPersonElection, 'id' | 'person_id' | 'election' | 'party'>,
      {
        person_id: Pick<RawPerson, 'name'> | null
        election: Pick<RawElection, 'name'> | null
        party: Pick<RawOrganization, 'name'> | null
      }
    > | null
    organization: Override<
      Pick<RawOrganizationElection, 'id' | 'organization_id'>,
      {
        organization_id: Pick<RawOrganization, 'name'> | null
      }
    > | null
    thread_parent: Pick<RawPolitic, 'id' | 'desc' | 'source'> | null
  }
>
