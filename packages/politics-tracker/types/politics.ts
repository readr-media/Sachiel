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
  RawPersonOrganization,
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

/** 政見資訊 */
export type Politic = {
  id: string
  /** 政見內容 */
  desc: string
  /** 政見資料來源 */
  source: string
  /** 政見補充內容 */
  content: string
  /** 政見進度 */
  progress: `${POLITIC_PROGRESS}`
  /** 政見所屬類別 ID */
  politicCategoryId: string | null
  /** 政見所屬類別名稱 */
  politicCategoryName: string | null
  /** 立場變化 */
  positionChange: PositionChange[]
  /** 事實查核 */
  factCheck: FactCheck[]
  /** 專家看點 */
  expertPoint: ExpertPoint[]
  /** 重複政見 */
  repeat: Repeat[]
  createdAt: string
  updatedAt: string | null
}

/** 立場改變摘要 */
export type PositionChange = Override<
  Pick<
    RawPoliticPositionChange,
    'id' | 'positionChangeSummary' | 'isChanged' | 'factcheckPartner'
  >,
  { factcheckPartner: FactCheckPartner | null }
>

/** 查核單位資訊 */
export type FactCheckPartner = Pick<RawFactCheckPartner, 'name'>

/** 事實釐清摘要 */
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

/** 專家看點摘要 */
export type ExpertPoint = Pick<
  RawExpertPoint,
  'id' | 'expertPointSummary' | 'expert'
>

/** 相似政策摘要 */
export type Repeat = Override<
  Pick<RawPoliticRepeat, 'id' | 'repeatSummary' | 'factcheckPartner'>,
  {
    factcheckPartner: FactCheckPartner | null
  }
>

/** 人物在組織的任期資訊 */
export type PersonElectionTerm = {
  start_date_day: number | null
  start_date_month: number | null
  start_date_year: number | null
  end_date_day: number | null
  end_date_month: number | null
  end_date_year: number | null
}

export type Person = Pick<RawPerson, 'id'>

/** 搭檔主手的參選紀錄 */
export type MainCandidate = {
  id: string | null
  name: string | null
  /** 人物資訊 */
  person_id: Person | null
}

/** 不分區立委資訊 */
export type LegislatorAtLarge = Override<
  Pick<RawPersonElection, 'id' | 'elected' | 'person_id'>,
  { person_id: Pick<RawPerson, 'id' | 'name'> | null }
>

/** 選舉紀錄（共通） */
export type ElecitonDataBase = {
  /** 在關聯到人物時，是 PE 的 id；在關聯到組織時，是 OE 的 id */
  id: RawPersonElection['id'] | RawOrganizationElection['id']
  /** 選舉名稱 */
  name: string
  /** 選舉目的 */
  electionType: string
  /** 選舉區域 */
  electionArea: string
  /** 政黨 */
  party: string
  /** 政黨黨徽 */
  partyIcon: string
  /** 選舉年 */
  year: number
  /** 選舉月 */
  month: number
  /** 選舉日 */
  day: number
  /** 是否結束 */
  isFinished: boolean
  /** 人物：是否當選；組織：或有所屬候選人當選 */
  elected: boolean
  /** 政見資料來源 */
  source: string
  /** 最後更新時間 */
  lastUpdate: string | null
  /** 政見清單 */
  politics: Politic[]
  /** 待確認政見清單 */
  waitingPolitics: Politic[]
  /** 隱藏政見細節 */
  hidePoliticDetail: string | null
  /** 開放留言（心情） */
  shouldShowFeedbackForm: boolean
}

/** 人物的選舉紀錄 */
export type ElectionDataForPerson = ElecitonDataBase & {
  /** 推派的政黨 ID */
  partyId: string
  /** 是否連任 */
  incumbent: boolean
  /** 搭檔主手資訊 */
  mainCandidate: MainCandidate | null
  /** 當選後的任期資訊 */
  electionTerm: PersonElectionTerm
}

/** 組織的選舉紀錄 */
export type ElectionDataForParty = ElecitonDataBase & {
  /** 是否為政黨關聯頁面 */
  isPartyPage: boolean
  /** 不分區立委名單 */
  legisLatorAtLarge: LegislatorAtLarge[]
}

/** 選舉紀錄 */
export type ElectionData = ElectionDataForPerson | ElectionDataForParty

/** type for GetPersonOverView query */
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

/** type for GetPoliticsRelatedToPersonElections and GetEditingPoliticsRelatedToPersonElections queries */
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

/** type for GetPoliticsRelatedToOrganizationsElections and GetEditingPoliticsRelatedToOrganizationElections queries */
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

/** type for GetPersonOrganization query */
export type PersonOrganizationData = Pick<
  RawPersonOrganization,
  | 'start_date_year'
  | 'start_date_month'
  | 'start_date_day'
  | 'end_date_year'
  | 'end_date_month'
  | 'end_date_day'
  | 'organization_id'
>

/** type for CreatePolitic mutation */
export type CreatedPoliticData = Override<
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

/** type for AddEditingPoliticToThread mutation */
export type CreatedEditingPoliticData = Override<
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

/** type for GetOrganizationOverView query */
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

/** type for GetPersonElectionsRelatedToParty query */
export type PersonElectionRelatedToParty = Override<
  Pick<RawPersonElection, 'id' | 'elected' | 'person_id'>,
  { person_id: Pick<RawPerson, 'id' | 'name'> | null }
>
