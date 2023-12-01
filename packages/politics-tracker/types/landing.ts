import type {
  Override,
  RawElection,
  RawElectionArea,
  RawFactCheckPartner,
  RawPerson,
  RawPersonElection,
  RawPolitic,
  RawPoliticCategory,
} from '~/types/common'
import type {
  ExpertPoint,
  FactCheck,
  PositionChange,
  Repeat,
} from '~/types/politics'
import type { PoliticDetail } from '~/types/politics-detail'

// 候選人資料
export type Candidate = {
  id?: string
  name: string // 姓名
  year: number // 出生年
  done: number // 完成數
}

export type PersonData = Candidate & {
  type: string // 選舉類型
  areaId: string // 選舉區域 id
  areaName: string // 選舉區域名稱
  areaCity: string // 選舉區域城市
}

// 議員候選人與區域的關係
export type AreaOfCouncilorElection = {
  id?: string
  order: number // 顯示排序
  city: string // 城市名稱
  name: string // 區域名稱
  done: number // 完成數
  total: number // 總數
  candidates: Candidate[]
}

// 議員選舉區域與城市的關係
export type CityOfCouncilorElection = {
  id?: string
  name: string
  amount: number // 完成數
  total: number // 總數
  areas: AreaOfCouncilorElection[]
}

// 市長候選人與城市的關係
export type CityOfMayorElection = Pick<
  AreaOfCouncilorElection,
  'id' | 'city' | 'name' | 'done' | 'total' | 'candidates'
>

// 市長選舉城市與區域的關係
export type DistrinctOfMayorElection = {
  key: string
  name: string // 區域名稱
  amount: number // 完成數
  total: number // 總數
  areas: CityOfMayorElection[]
}

// 頁面顯示傳入的資料
export type PropsData = {
  totalCompletionOfMayor: number // 已有通過審核政見的市長候選人數
  totalCompletionOfCouncilor: number // 已有通過審核政見的議員候選人數
  mayorAndPolitics: DistrinctOfMayorElection[]
  councilorAndPolitics: CityOfCouncilorElection[]
  postsWithPoliticsTrackerTag: AllPostsWithPoliticsTrackerTagAndUrl[]
}

// Landing 2022 - READr 內符合指定標籤(tag)的文章(post)資料
export type AllPostsWithPoliticsTrackerTag = {
  id: string
  name: string // 文章標題
  state: string // 文章發佈狀態(Draft/Published/Scheduled/Archived)
  publishTime: string // 文章發佈時間
  heroImage: ImageOfPost | null
}

export type AllPostsWithPoliticsTrackerTagAndUrl =
  AllPostsWithPoliticsTrackerTag & {
    /** 文章網址 */
    url: string
  }

export type ImageOfPost = {
  id: string
  name: string //文章視覺圖名稱
  resized: { w800: string } | null // 文章視覺圖
}

type PP = Pick<RawPerson, 'id' | 'name' | 'birth_date_year'>
type PE = Pick<RawElection, 'id' | 'name' | 'election_year_year' | 'type'>
type PEA = Pick<RawElectionArea, 'id' | 'name' | 'city'>
export type PersonInElection = Override<
  Pick<
    RawPersonElection,
    'id' | 'person_id' | 'election' | 'electoral_district'
  >,
  {
    person_id: PP | null
    election: PE | null
    electoral_district: PEA | null
  }
>

type RPE = Pick<RawElection, 'type'>
type RPP = Pick<RawPerson, 'id'>
type RP = Override<
  Pick<RawPersonElection, 'id' | 'election' | 'person_id'>,
  {
    election: RPE | null
    person_id: RPP | null
  }
>
export type RelatedPolitic = Override<
  Pick<RawPolitic, 'id' | 'status' | 'person'>,
  {
    person: RP | null
  }
>

// Landing 2024：CMS - Related Posts 的文章資料
type FactCheckPartner = Pick<RawFactCheckPartner, 'id' | 'name'>

export type RelatedPost = {
  id: string
  name: string
  url: string
  ogIMage: string
  createdAt: string
  partner: FactCheckPartner[]
}

export type CategoryOfJson = {
  id: string
  name: string
  count: number
  displayColor: string
}

export type PresidentComparisonJson = {
  expertPointCount: number
  factCheckCount: number
  name: string
  number: string
  person_id: string
  politicsCount: number
  positionChangeCount: number
  repeatCount: number
  categories_count: CategoryOfJson[]
}

export type PresidentFactCheckJson = {
  id: string
  number: string
  person_id: Pick<RawPersonElection, 'id' | 'name'>
  politicsCount: number
  politics: PoliticOfJson[]
}

type PoliticCategory = Pick<RawPoliticCategory, 'id' | 'name'>

export type PoliticOfJson = Pick<PoliticDetail, 'id' | 'desc'> & {
  positionChangeCount: number
  expertPointCount: number
  factCheckCount: number
  repeatCount: number
  positionChange: PositionChange[]
  factCheck: FactCheck[]
  expertPoint: ExpertPoint[]
  repeat: Repeat[]
  politicCategory: PoliticCategory | null
}

//補坑進度：立委政見 - 區域立委
export type LegislatorOfJSON = {
  name: string
  amount: number
  total: number
  areas: LegislatorArea[]
}

//補坑進度：立委政見 - 候選人
export type LegislatorCandidate = {
  id: number
  name: string
  year: number
  done: number
}

//補坑進度：立委政見 - 區域
export type LegislatorArea = {
  id: number
  order: number
  name: string
  city: string
  candidates: LegislatorCandidate[]
  total: number
  done: number
}
