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

/** 作為政見頁資訊面板資料使用 */
export type OverviewInfo = {
  /** 人物 ID */
  id: string
  /** 人名 */
  name: string
  /** 人物頭像 */
  avatar: string
  /** 政黨 ID */
  partyId: string
  /** 政黨名稱 */
  party: string
  /** 政黨黨徽 */
  partyIcon: string
  /** 競選目的 */
  campaign: string
  /** 政見數統計 */
  completed: number
  /** 待審核政見數統計 */
  waiting: number
  /** 是否為政黨相關頁面 */
  isPartyPage: boolean
}

/** 政見數統計資訊 */
export type PoliticAmount = Pick<OverviewInfo, 'waiting' | 'completed'>

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
  shouldShowFeedbackForm?: boolean
}

export type LegislatorAtLarge = Override<
  Pick<RawPersonElection, 'id' | 'elected' | 'person_id'>,
  { person_id: Pick<RawPerson, 'id' | 'name'> | null }
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
    person_id: Pick<RawPerson, 'id' | 'name' | 'image'> | null
    election: Pick<
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
    > | null
    electoral_district: Pick<RawElectionArea, 'id' | 'name' | 'city'> | null
    party: Pick<RawOrganization, 'id' | 'name' | 'image'> | null
    mainCandidate: Override<
      Pick<RawPersonElection, 'id' | 'name' | 'person_id'>,
      {
        person_id: Pick<RawPerson, 'id'> | null
      }
    > | null
  }
>

export type ElecitonDataBase = {
  id: string
  name: string
  electionType: string
  electionArea: string
  party: string
  partyIcon: string
  year: number
  month: number
  day: number
  isFinished: boolean
  elected: boolean
  source: string
  lastUpdate: string | null
  politics: Politic[]
  waitingPolitics: Politic[]
  hidePoliticDetail: string | null
  shouldShowFeedbackForm: boolean
}

export type ElectionDataForPerson = ElecitonDataBase & {
  partyId: string
  incumbent: boolean
  mainCandidate: MainCandidate | null
  electionTerm: PersonElectionTerm
}

export type ElectionDataForParty = ElecitonDataBase & {
  isPartyPage: boolean
  legisLatorAtLarge: LegislatorAtLarge[]
}

export type ElectionData = ElectionDataForPerson | ElectionDataForParty

export type PoliticDataForPerson = Override<
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

export type PoliticDataForParty = Override<
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
    | 'organization'
    | 'politicCategory'
    | 'positionChange'
    | 'factCheck'
    | 'expertPoint'
    | 'repeat'
  >,
  {
    thread_parent: Pick<RawPolitic, 'id' | 'desc' | 'source' | 'status'> | null
    organization: Override<
      Pick<RawOrganizationElection, 'id' | 'elections'>,
      { elections: Pick<RawElection, 'id'> | null }
    > | null
    politicCategory: Pick<RawPoliticCategory, 'id' | 'name'> | null
    positionChange: PositionChange[]
    factCheck: FactCheck[]
    expertPoint: ExpertPoint[]
    repeat: Repeat[]
  }
>

export type PoliticData = PoliticDataForPerson | PoliticDataForParty

export type PersonOrgnizationData = Pick<
  RawPersonOrgnization,
  | 'start_date_year'
  | 'start_date_month'
  | 'start_date_day'
  | 'end_date_year'
  | 'end_date_month'
  | 'end_date_day'
  | 'organization_id'
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

export type PartyElectionData = Override<
  Pick<
    RawOrganizationElection,
    'id' | 'source' | 'organization_id' | 'elections' | 'seats'
  >,
  {
    organization_id: Pick<RawOrganization, 'id' | 'name' | 'image'> | null
    elections: Override<
      Pick<
        RawElection,
        | 'id'
        | 'name'
        | 'level'
        | 'type'
        | 'hidePoliticDetail'
        | 'addComments'
        | 'election_year_year'
        | 'election_year_month'
        | 'election_year_day'
        | 'electionArea'
      >,
      {
        electionArea: Pick<RawElectionArea, 'id' | 'name' | 'city'>
      }
    > | null
  }
>

export type PersonElectionRelatedToParty = Override<
  Pick<RawPersonElection, 'id' | 'elected' | 'person_id'>,
  { person_id: Pick<RawPerson, 'id' | 'name'> | null }
>
