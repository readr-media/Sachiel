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
  RawPhoto,
  RawPolitic,
  RawPoliticCategory,
  RawPoliticControversy,
  RawPoliticPositionChange,
  RawPoliticRepeat,
  RawPoliticResponse,
  RawPoliticTimeline,
  RawResizedImages,
  StatusOptionsB,
} from '~/types/common'

export type PoliticDetail = {
  id: string
  /** 政見內容 */
  desc: string
  /** 政策補充說明 */
  content: string
  /** 資料來源 */
  source: string
  /** 狀態 */
  status: StatusOptionsB
  /** 政見進度 */
  current_progress: `${POLITIC_PROGRESS}`
  /** 更新時間 */
  updatedAt: string
  /** 資料提供 */
  contributer: string
  /** 類別 */
  politicCategory: Pick<RawPoliticCategory, 'id'> | null
  /** 專家看點 */
  expertPoint: PoliticExpert[]
  /** 立場變化 */
  positionChange: PoliticPositionChange[]
  /** 事實查核 */
  factCheck: PoliticFactCheck[]
  /** 重複政見 */
  repeat: PoliticRepeat[]
  /** 政見回應 */
  response: PoliticResponse[]
  /** 爭議內容 */
  controversies: PoliticControversy[]
  /** 時間軸（相關進度） */
  timeline: PoliticTimeLine[]
  organization: OrganizationElection | null
  person: PersonElection | null
}

export type OrganizationElection = Override<
  Pick<
    RawOrganizationElection,
    'id' | 'seats' | 'organization_id' | 'elections'
  >,
  {
    organization_id: Pick<RawOrganization, 'id' | 'name' | 'image'> | null
    elections: Pick<
      RawElection,
      | 'id'
      | 'name'
      | 'type'
      | 'level'
      | 'status'
      | 'election_year_year'
      | 'election_year_month'
      | 'election_year_day'
    > | null
  }
>

export type PoliticFactCheck = Override<
  Pick<
    RawFactCheck,
    | 'id'
    | 'checkResultType'
    | 'content'
    | 'factCheckSummary'
    | 'checkResultOther'
    | 'link'
    | 'factcheckPartner'
  >,
  {
    factcheckPartner: Override<
      Pick<RawFactCheckPartner, 'id' | 'name' | 'slogo'>,
      {
        slogo: Override<
          Pick<RawPhoto, 'id' | 'resized'>,
          { resized: Pick<RawResizedImages, 'original'> }
        > | null
      }
    > | null
  }
>

export type PoliticPositionChange = Override<
  Pick<
    RawPoliticPositionChange,
    | 'id'
    | 'checkDate'
    | 'content'
    | 'link'
    | 'isChanged'
    | 'positionChangeSummary'
    | 'factcheckPartner'
  >,
  {
    factcheckPartner: Pick<RawFactCheckPartner, 'id' | 'name'> | null
  }
>

export type PoliticRepeat = Override<
  Pick<
    RawPoliticRepeat,
    | 'id'
    | 'content'
    | 'link'
    | 'repeatSummary'
    | 'contributer'
    | 'factcheckPartner'
  >,
  {
    factcheckPartner: Override<
      Pick<RawFactCheckPartner, 'id' | 'name' | 'slogo'>,
      {
        slogo: Override<
          Pick<RawPhoto, 'id' | 'resized'>,
          { resized: Pick<RawResizedImages, 'original'> }
        > | null
      }
    > | null
  }
>
export type PoliticExpert = Pick<
  RawExpertPoint,
  | 'id'
  | 'expert'
  | 'avatar'
  | 'title'
  | 'content'
  | 'link'
  | 'expertPointSummary'
  | 'contributer'
>

export type PersonElection = Override<
  Pick<
    RawPersonElection,
    | 'id'
    | 'votes_obtained_number'
    | 'votes_obtained_percentage'
    | 'elected'
    | 'incumbent'
    | 'electoral_district'
    | 'party'
    | 'election'
    | 'person_id'
  >,
  {
    electoral_district: Pick<RawElectionArea, 'id' | 'name'> | null
    party: Pick<RawOrganization, 'name' | 'image'> | null
    election: Pick<
      RawElection,
      | 'name'
      | 'type'
      | 'level'
      | 'status'
      | 'election_year_year'
      | 'election_year_month'
      | 'election_year_day'
      | 'addComments'
    > | null
    person_id: Pick<RawPerson, 'id' | 'name' | 'image'> | null
  }
>

export type PoliticResponse = Pick<
  RawPoliticResponse,
  'id' | 'content' | 'responseName' | 'responsePic' | 'responseTitle' | 'link'
>

export type PoliticTimeLine = Pick<
  RawPoliticTimeline,
  'id' | 'link' | 'content' | 'eventDate'
>

export type FactCheckPartner = Pick<
  RawFactCheckPartner,
  'id' | 'logo' | 'name' | 'type' | 'webUrl'
>

export type PoliticControversy = Pick<
  RawPoliticControversy,
  'id' | 'link' | 'content'
>

export type PoliticAmount = {
  waiting: number
  passed: number
}

/** type for GetPoliticDetail query */
export type PoliticDetailData = Override<
  Pick<
    RawPolitic,
    | 'id'
    | 'desc'
    | 'content'
    | 'source'
    | 'status'
    | 'current_progress'
    | 'updatedAt'
    | 'contributer'
    | 'person'
    | 'organization'
    | 'timeline'
    | 'positionChange'
    | 'expertPoint'
    | 'factCheck'
    | 'repeat'
    | 'response'
    | 'controversies'
    | 'politicCategory'
  >,
  {
    person: PersonElection | null
    organization: OrganizationElection | null
    positionChange: PoliticPositionChange[]
    expertPoint: PoliticExpert[]
    factCheck: PoliticFactCheck[]
    repeat: PoliticRepeat[]
    response: PoliticResponse[]
    controversies: PoliticControversy[]
    politicCategory: Pick<RawPoliticCategory, 'id'> | null
  }
>
