import type { PersonElection } from '~/types/politics'
import type { FactCheckPartner, PoliticDetail } from '~/types/politics-detail'

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
  postsWithPoliticsTrackerTag: allPostsWithPoliticsTrackerTag[]
}

// Readr內符合指定標籤(tag)的文章(post)資料
export type allPostsWithPoliticsTrackerTag = {
  id: string
  name: string // 文章標題
  state: string // 文章發佈狀態(Draft/Published/Scheduled/Archived)
  publishTime: string // 文章發佈時間
  heroImage: null | ImageOfPost
}

export type ImageOfPost = {
  id: string
  name: string //文章視覺圖名稱
  urlOriginal: string //文章視覺圖網址
}

//關係資料庫 Related Posts 相關文章
export type RelatedPost = {
  id: string
  name: string
  url: string
  ogIMage: string
  createdAt: string
  partner: Pick<FactCheckPartner, 'id' | 'name'>[]
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
  person_id: Pick<PersonElection, 'id' | 'name'>
  politicsCount: number
  politics: PoliticOfJson[]
}

export type PoliticOfJson = Pick<
  PoliticDetail,
  | 'id'
  | 'desc'
  | 'politicCategory'
  | 'positionChange'
  | 'expertPoint'
  | 'factCheck'
  | 'repeat'
> & {
  positionChangeCount: number
  expertPointCount: number
  factCheckCount: number
  repeatCount: number
}
