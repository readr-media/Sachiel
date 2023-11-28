import { Option } from '@readr-media/react-feedback/dist/typedef'
import type { LinkProps } from 'next/link'

import { POLITIC_PROGRESS } from '~/constants/common'

export type LinkHref = LinkProps['href']

export type GenericGQLData<T, U extends string> = {
  data?: Record<U, T>
  errors: any[]
}

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>

export type StatusOptionsA = 'active' | 'deactive'

export type StatusOptionsB = 'verified' | 'notverified'

export type Source = {
  id: string
  value: string
  error: string
}

/* eslint-disable-next-line no-unused-vars */
export type OrderFunction<T> = (datas: T[]) => T[]

// This utility is for overwriting type without extending it
// prettier-ignore
export type Override<T, U extends Partial<Record<keyof T, unknown>>> = Omit<T, keyof U> & U

export type ExtendedOption = Option & { sortOrder: number }
export type FormConfig = Record<'formId' | 'fieldId', string>
export type FeedbackFormConfig = Record<'emoji' | 'text', FormConfig>

//--- Following types should be related to data sources ---//

export type RawResizedImages = {
  original: string
}

// 圖片
export type RawPhoto = {
  id: string
  name: string // 標題
  resized: RawResizedImages
  urlOriginal: string
}

// 標籤
export type RawTag = {
  id: string
  name: string // 標籤名稱
  brief: string // 前言
  ogTitle: string // FB分享標題
  ogDescription: string // FB分享說明
  isFeatured: boolean // 置頂
}

// 選區
export type RawElectionArea = {
  id: string
  name: string // 選舉區名稱
  city: string // 城市
  description: string
  status: StatusOptionsA
}

// 選舉
export type RawElection = {
  id: string
  name: string
  description: string
  election_year_year: number // 選舉年
  election_year_month: number // 選舉月
  election_year_day: number // 選舉日
  level: string // 選舉層級
  type: string // 選舉目的（種類）
  register_date: string // 登記日期
  location: string // 位置
  electionArea: RawElectionArea[]
  status: StatusOptionsA
  hidePoliticDetail: string // 隱藏政見細節
  addComments: boolean // 開放留言（心情）
  createdAt: string
  updatedAt: string
}

// 人物
export type RawPerson = {
  id: string
  name: string // 姓名
  alternative: string // 別名
  other_names: string // 舊名
  email: string
  gender: string
  birth_date_year: number // 出生年
  birth_date_month: number // 出生月
  birth_date_day: number // 出生日
  death_date_year: number // 死亡年
  death_date_month: number // 死亡月
  death_date_day: number // 死亡日
  image: string // 大頭照
  summary: string // 一句話描寫這個人
  biography: string // 詳細生平
  national_identity: string
  contact_details: string
  links: string
  source: string
  status: StatusOptionsB
  thread_parent: RawPerson | null // 補充資料
  tags: RawTag[] // 標籤
  createdAt: string
  updatedAt: string
}

// 組織
export type RawOrganization = {
  id: string
  name: string // 組織名稱
  alternative: string // 組織別名
  other_names: string // 組織舊名
  identifiers: string // 統一編號
  classification: string // 組織類型
  abstract: string // 一句話描述該組織
  description: string // 組織詳細介紹
  founding_date_year: number // 組織成立年
  founding_date_month: number // 組織成立月
  founding_date_day: number // 組織成立日
  dissolution_date_year: number // 組織解散年
  dissolution_date_month: number // 組織解散月
  dissolution_date_day: number // 組織解散日
  image: string // 圖像
  contact_details: string
  links: string
  address: string // 組織稅籍登記地址
  source: string
  status: StatusOptionsB
  tags: RawTag[] // 標籤
  reviewed: boolean
  createdAt: string
  updatedAt: string
}

// 人物 - 選舉關係
export type RawPersonElection = {
  id: string
  name: string
  person_id: RawPerson | null // 人物
  election: RawElection | null // 選舉
  mainCandidate: RawPersonElection | null // 搭配主要候選人
  party: RawOrganization | null // 推薦政黨
  legislatoratlarge_number: string // 不分區立委排序
  number: string // 號次
  electoral_district: RawElectionArea | null // 選區
  votes_obtained_number: string // 得票數
  votes_obtained_percentage: string // 得票率
  elected: boolean
  incumbent: boolean // 是否現任
  source: string // 資料來源
  politicSource: string // 政見資料來源
}

// 組織 - 選舉關係
export type RawOrganizationElection = {
  id: string
  organization_id: RawOrganization | null // 組織名稱
  elections: RawElection | null // 選舉
  number: string // 號次
  votes_obtained_number: string // 得票數
  source: string
  election_year_year: number // 選舉年
  election_year_month: number // 選舉月
  election_year_day: number // 選舉日
  seats: string // 分配席次
  politics: RawPolitic[] // 政見
}

// 政見
export type RawPolitic = {
  id: string
  person: RawPersonElection | null // 候選人 - 選舉
  organization: RawOrganizationElection | null // 政黨 - 選舉
  desc: string // 政見
  content: string // 政策補充說明
  source: string
  contributer: string // 資料提供
  current_progress: `${POLITIC_PROGRESS}` // 政見進度
  status: StatusOptionsB
  checked: boolean
  reviewed: Boolean
  thread_parent: RawPolitic | null // 修改備註
  politicCategory: RawPoliticCategory | null // 類別
  changeLog: string // 修改備註
  positionChange: RawPoliticPositionChange[] // 立場變化
  factCheck: RawFactCheck[] // 事實查核
  repeat: RawPoliticRepeat[] // 重複政見
  controversies: RawPoliticControversy[] // 爭議內容
  expertPoint: RawExpertPoint[] // 專家觀點
  response: RawPoliticResponse[] // 政見回應
  timeline: RawPoliticTimeline[] // 時間軸
  createdAt: string
  updatedAt: string
}

// 政見類別
export type RawPoliticCategory = {
  id: string
  politics: RawPolitic[]
  name: string // 標籤名稱
  brief: string // 前言
  displayColor: string // 頁面色碼
  ogTitle: string // FB分享標題
  ogDescription: string // FB分享說明
  isFeatured: boolean // 置頂
}

// 政見立場變化
export type RawPoliticPositionChange = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  positionChangeSummary: string // 立場變化（摘要）
  isChanged: string // 立場改變
  content: string // 查核內容
  checkDate: string
  link: string // 相關連結
  factcheckPartner: RawFactCheckPartner | null // 查核單位
}

// 政見事實查核
export type RawFactCheck = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  factCheckSummary: string // 事實查核（摘要）
  checkResultType: string // 查核結果
  checkResultOther: string // 查核結果（其他）
  content: string // 查核內容
  link: string // 相關連結
  factcheckPartner: RawFactCheckPartner | null // 查核單位
}

// 重複政見
export type RawPoliticRepeat = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  repeatSummary: string // 重複政見（摘要）
  content: string // 重複內容
  link: string // 相關連結
  contributer: string // 資料提供
  factcheckPartner: RawFactCheckPartner | null // 查核單位
}

// 政見爭議內容
export type RawPoliticControversy = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  content: string // 爭議內容
  link: string // 相關連結
  factcheckPartner: RawFactCheckPartner | null // 查核單位
}

// 查核單位
export type RawFactCheckPartner = {
  id: string
  name: string // 組織名稱
  type: string // 合作形式
  webUrl: string // 網站網址
  logo: RawPhoto | null // 大 Logo 網址（for landing page）
  slogo: RawPhoto | null // 小 Logo 網址（for politic page）
  year: string // 年份
  positionChange: RawPoliticPositionChange[]
  factCheck: RawFactCheck[]
  repeat: RawPoliticRepeat[]
}

// 專家觀點
export type RawExpertPoint = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic
  expertPointSummary: string // 專家觀點（摘要）
  expert: string // 專家姓名
  avatar: string // 頭像連結
  content: string // 意見內容
  link: string // 連結
  title: string // 職稱
  contributer: string // 資料提供
}

// 候選人回應
export type RawPoliticResponse = {
  id: string
  politic: RawPolitic[] // 政見
  editingPolitic: RawPolitic[]
  responseName: string // 回應者姓名
  responsePic: string // 回應者頭像
  responseTitle: string // 回應者身分
  content: string // 回應內容
  link: string // 相關連結
}

// 政見進度
export type RawPoliticTimeline = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  eventDate: string // 日期
  sortOrder: number // 排序
  content: string // 文字
  link: string // 連結
  contributer: string // 資料提供
}
