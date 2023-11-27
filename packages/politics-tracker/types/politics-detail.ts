import { POLITIC_PROGRESS } from '~/constants/common'
import type {
  RawElection,
  RawExpertPoint,
  RawFactCheck,
  RawFactCheckPartner,
  RawOrganization,
  RawOrganizationElection,
  RawPersonElection,
  RawPoliticCategory,
  RawPoliticPositionChange,
  RawPoliticRepeat,
  RawPoliticResponse,
  RawPoliticTimeline,
  StatusOptionsB,
} from '~/types/common'

export type PoliticDetail = {
  id: string
  desc: string //政見內容
  content: string //政策補充說明
  source: string //資料來源
  status: StatusOptionsB //狀態
  current_progress: `${POLITIC_PROGRESS}` //政見進度
  updatedAt: string //更新時間
  contributer: string // 資料提供
  politicCategory: Pick<RawPoliticCategory, 'id'> | null //類別
  expertPoint: PoliticExpert[] //專家看點
  positionChange: PoliticPositionChange[] //立場變化
  factCheck: PoliticFactCheck[] //事實查核
  repeat: PoliticRepeat[] //重複政見
  response: PoliticResponse[] //政見回應
  controversies: PoliticControversy[] //爭議內容
  timeline: PoliticTimeLine[] //時間軸（相關進度）
  organization: OrganizationElection | null
  person: PersonElection | null
}

export type OrganizationElection = {
  id: Pick<RawOrganizationElection, 'id'>
  seats: Pick<RawOrganizationElection, 'seats'>
  electoral_district: string
  organization_id: Pick<RawOrganization, 'id' | 'name' | 'image'>
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
  >
}

export type PoliticFactCheck = Pick<
  RawFactCheck,
  | 'id'
  | 'factCheckSummary'
  | 'checkResultType'
  | 'checkResultOther'
  | 'factcheckPartner'
  | 'content'
  | 'link'
>

export type PoliticPositionChange = Pick<
  RawPoliticPositionChange,
  | 'id'
  | 'positionChangeSummary'
  | 'isChanged'
  | 'factcheckPartner'
  | 'content'
  | 'checkDate'
  | 'link'
>

export type PoliticRepeat = Pick<
  RawPoliticRepeat,
  | 'id'
  | 'repeatSummary'
  | 'factcheckPartner'
  | 'content'
  | 'link'
  | 'contributer'
>

export type PoliticExpert = Pick<
  RawExpertPoint,
  | 'id'
  | 'expertPointSummary'
  | 'expert'
  | 'avatar'
  | 'content'
  | 'link'
  | 'title'
  | 'contributer'
>

export type PersonElection = Pick<
  RawPersonElection,
  | 'id'
  | 'electoral_district'
  | 'party'
  | 'election'
  | 'person_id'
  | 'votes_obtained_number'
  | 'votes_obtained_percentage'
  | 'elected'
  | 'incumbent'
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

export type PoliticControversy = {
  id: string
  link: string
  content: string
}

export type PersonElectionTerm = {
  start_date_year: string | null
  start_date_month: string | null
  start_date_day: string | null
  end_date_year: string | null
  end_date_month: string | null
  end_date_day: string | null
}

export type PoliticAmount = {
  waiting: number
  passed: number
}
