import type {
  GenericExpert,
  GenericFactCheck,
  GenericFactCheckPartner,
  GenericOrganizationElection,
  GenericPoliticCategory,
  GenericPositionChange,
  GenericProgressType,
  GenericRepeat,
  GenericResponse,
  GenericStatus,
  GenericTimeline,
  RawElection,
  RawOrganization,
  RawPersonElection,
} from '~/types/common'

export type PoliticDetail = {
  id: string
  desc: string //政見內容
  content: string //政策補充說明
  source: string //資料來源
  status: GenericStatus //狀態
  current_progress: GenericProgressType //政見進度
  updatedAt: string //更新時間
  contributer: string // 資料提供
  politicCategory: Pick<GenericPoliticCategory, 'id'> | null //類別
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
  id: Pick<GenericOrganizationElection, 'id'>
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
  electoral_district: string
}

export type PoliticFactCheck = Pick<
  GenericFactCheck,
  | 'id'
  | 'factCheckSummary'
  | 'checkResultType'
  | 'checkResultOther'
  | 'factcheckPartner'
  | 'content'
  | 'link'
>

export type PoliticPositionChange = Pick<
  GenericPositionChange,
  | 'id'
  | 'positionChangeSummary'
  | 'isChanged'
  | 'factcheckPartner'
  | 'content'
  | 'checkDate'
  | 'link'
>

export type PoliticRepeat = Pick<
  GenericRepeat,
  | 'id'
  | 'repeatSummary'
  | 'factcheckPartner'
  | 'content'
  | 'link'
  | 'contributer'
>

export type PoliticExpert = Pick<
  GenericExpert,
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

export type PoliticCategory = Pick<
  GenericPoliticCategory,
  'id' | 'name' | 'politicsCount'
>
export type PoliticResponse = Pick<
  GenericResponse,
  'id' | 'content' | 'responseName' | 'responsePic' | 'responseTitle' | 'link'
>

export type PoliticTimeLine = Pick<
  GenericTimeline,
  'id' | 'link' | 'content' | 'eventDate'
>

export type PoliticControversy = {
  id: string
  link: string
  content: string
}

export type FactCheckPartner = Pick<
  GenericFactCheckPartner,
  'id' | 'logo' | 'name' | 'type' | 'webUrl'
>

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
